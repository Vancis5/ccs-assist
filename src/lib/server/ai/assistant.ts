import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages, createUIMessageStream, createUIMessageStreamResponse } from 'ai';
import { env } from '$env/dynamic/private';
import { normalizeMessages, extractMessageText } from '$lib/messages';
import { getSystemPrompt } from './prompt';

export interface AssistantStreamOptions {
	messages: any[];
	apiKey?: string;
	modelId?: string;
	ragContext?: string;
	ai?: any; // Cloudflare Workers AI binding
}

const PRIMARY_MODEL = env.GROQ_MODEL || process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
const FALLBACK_MODELS = Array.from(
	new Set([PRIMARY_MODEL, 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'])
);

const WORKERS_AI_MODEL = '@cf/meta/llama-3.1-8b-instruct';

/**
 * Return a fixed response instantly as a standard UI message stream.
 * Used for deterministic out-of-scope refusals without incurring LLM cost or latency.
 */
export function createFixedRefusalResponse(message: string): Response {
	const messageId = crypto.randomUUID();
	return createUIMessageStreamResponse({
		stream: createUIMessageStream({
			execute({ writer }) {
				writer.write({ type: 'text-start', id: messageId });
				writer.write({ type: 'text-delta', delta: message, id: messageId });
				writer.write({ type: 'text-end', id: messageId });
			}
		})
	});
}

/**
 * Streams assistant response with multi-tier failover:
 * 1. Groq primary model (llama-3.3-70b-versatile)
 * 2. Groq fallback models (llama-3.1-8b-instant [30k TPM], qwen/qwen3.8-27b)
 * 3. Cloudflare Workers AI binding (@cf/meta/llama-3.1-8b-instruct)
 */
export async function streamAssistantResponse({
	messages,
	apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY,
	modelId,
	ragContext = '',
	ai
}: AssistantStreamOptions): Promise<Response> {
	// Keep rolling context window lean (last 4 messages / 2 turns to minimize token load)
	const trimmedMessages = Array.isArray(messages) ? messages.slice(-4) : [];
	const normalizedMessages = normalizeMessages(trimmedMessages);
	const systemPrompt = getSystemPrompt(ragContext);

	const modelsToTry = modelId ? [modelId, ...FALLBACK_MODELS.filter((m) => m !== modelId)] : FALLBACK_MODELS;
	const messageId = crypto.randomUUID();

	const stream = createUIMessageStream({
		async execute({ writer }) {
			let streamedAnyChunk = false;
			let startedTextPart = false;

			const startText = () => {
				if (!startedTextPart) {
					writer.write({ type: 'text-start', id: messageId });
					startedTextPart = true;
				}
			};

			const endText = () => {
				if (startedTextPart) {
					writer.write({ type: 'text-end', id: messageId });
					startedTextPart = false;
				}
			};

			// 1. Try Groq provider models first (if API key available)
			if (apiKey) {
				const groq = createGroq({ apiKey });
				const modelMessages = await convertToModelMessages(normalizedMessages);
				let lastFailureTimestamp: number | null = null;
				let lastFailedModel: string | null = null;

				for (const currentModel of modelsToTry) {
					const modelStartTime = performance.now();
					try {
						console.log(`[ai] [${new Date().toISOString()}] Attempting model: ${currentModel}`);
						const result = streamText({
							model: groq(currentModel),
							system: systemPrompt,
							messages: modelMessages,
							temperature: 0.6,
							maxOutputTokens: 2048,
							maxRetries: 0
						});

						for await (const part of result.fullStream) {
							if (part.type === 'text-delta') {
								if (!streamedAnyChunk) {
									const now = performance.now();
									const ttft = now - modelStartTime;
									if (lastFailureTimestamp !== null) {
										const switchDuration = now - lastFailureTimestamp;
										console.log(
											`[ai timing] [${new Date().toISOString()}] Failover from ${lastFailedModel} -> ${currentModel} took ${switchDuration.toFixed(0)}ms to first token (model TTFT: ${ttft.toFixed(0)}ms)`
										);
									} else {
										console.log(
											`[ai timing] [${new Date().toISOString()}] First token from ${currentModel} in ${ttft.toFixed(0)}ms`
										);
									}
								}
								startText();
								writer.write({ type: 'text-delta', delta: part.text, id: messageId });
								streamedAnyChunk = true;
							} else if (part.type === 'error') {
								throw part.error;
							}
						}

						if (!streamedAnyChunk) {
							throw new Error(`Model ${currentModel} returned 0 output tokens.`);
						}

						console.log(`[ai] [${new Date().toISOString()}] Successfully answered using model: ${currentModel}`);
						endText();
						// Successfully finished streaming
						return;
					} catch (err: any) {
						lastFailureTimestamp = performance.now();
						lastFailedModel = currentModel;
						console.warn(
							`[ai fallback] [${new Date().toISOString()}] Groq model ${currentModel} failed after ${(performance.now() - modelStartTime).toFixed(0)}ms:`,
							err?.message || err
						);
						if (streamedAnyChunk) {
							// If already sent tokens to client, cannot switch models mid-flight
							endText();
							return;
						}
					}
				}
			}

			// 2. Cloudflare Workers AI Fallback (protects demo against 429 rate limits or key exhaustion)
			if (ai) {
				try {
					console.log(`[ai] Flipping to Workers AI backup (${WORKERS_AI_MODEL})...`);
					const cfMessages = [
						{ role: 'system', content: systemPrompt },
						...trimmedMessages.map((m: any) => ({
							role: m.role === 'assistant' ? 'assistant' : 'user',
							content: extractMessageText(m)
						}))
					];

					const aiStream = (await ai.run(WORKERS_AI_MODEL, {
						messages: cfMessages,
						stream: true
					})) as ReadableStream<Uint8Array>;

					const reader = aiStream.getReader();
					const decoder = new TextDecoder();
					let buffer = '';

					while (true) {
						const { done, value } = await reader.read();
						if (done) break;

						buffer += decoder.decode(value, { stream: true });
						const lines = buffer.split('\n');
						buffer = lines.pop() || '';

						for (const line of lines) {
							const trimmed = line.trim();
							if (trimmed.startsWith('data: ')) {
								const dataStr = trimmed.slice(6).trim();
								if (dataStr === '[DONE]') break;
								try {
									const parsed = JSON.parse(dataStr);
									if (parsed.response) {
										startText();
										writer.write({ type: 'text-delta', delta: parsed.response, id: messageId });
										streamedAnyChunk = true;
									}
								} catch {
									// Ignore non-JSON or partial keep-alive frames
								}
							}
						}
					}

					if (streamedAnyChunk) {
						console.log(`[ai] Successfully answered using Workers AI: ${WORKERS_AI_MODEL}`);
						endText();
						return;
					}
				} catch (cfErr: any) {
					console.error('[ai fallback] Workers AI backup error:', cfErr?.message || cfErr);
					if (streamedAnyChunk) {
						endText();
						return;
					}
				}
			}

			// 3. Final safety refusal if both Groq and Workers AI failed
			if (!streamedAnyChunk) {
				console.error('[ai] All AI models and fallbacks exhausted.');
				startText();
				writer.write({
					type: 'text-delta',
					delta: "I'm experiencing high server traffic at the moment. Please try again shortly or visit the CCS Dean's Office on the 1st Floor.",
					id: messageId
				});
				endText();
			}
		}
	});

	return createUIMessageStreamResponse({ stream });
}
