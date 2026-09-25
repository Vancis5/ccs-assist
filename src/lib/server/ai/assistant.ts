import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { env } from '$env/dynamic/private';
import { normalizeMessages } from '$lib/messages';
import { getSystemPrompt } from './prompt';

export interface AssistantStreamOptions {
	messages: any[];
	apiKey?: string;
	modelId?: string;
	ragContext?: string;
}

/**
 * Deep module encapsulating dialogue normalization, system prompt generation,
 * knowledge context injection, Groq configuration, and streaming.
 */
const PRIMARY_MODEL = env.GROQ_MODEL || process.env.GROQ_MODEL || 'qwen/qwen3.8-27b';
const FALLBACK_MODELS = Array.from(
	new Set([PRIMARY_MODEL, 'openai/gpt-oss-20b', 'openai/gpt-oss-120b'])
);

export async function streamAssistantResponse({
	messages,
	apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY,
	modelId,
	ragContext
}: AssistantStreamOptions): Promise<Response> {
	if (!apiKey) {
		throw new Error('GROQ_API_KEY is not configured on the server. Please add it to your .env file.');
	}

	const groq = createGroq({ apiKey });

	// Keep a rolling context window (last 6 messages / 3 turns) to prevent token accumulation
	const trimmedMessages = Array.isArray(messages) ? messages.slice(-6) : [];
	const normalizedMessages = normalizeMessages(trimmedMessages);
	const modelMessages = await convertToModelMessages(normalizedMessages);

	const modelsToTry = modelId ? [modelId, ...FALLBACK_MODELS.filter((m) => m !== modelId)] : FALLBACK_MODELS;

	let lastError: any = null;
	for (const currentModel of modelsToTry) {
		try {
			const result = streamText({
				model: groq(currentModel),
				system: getSystemPrompt(ragContext),
				messages: modelMessages,
				temperature: 0.6,
				maxOutputTokens: 2048,
				onError({ error }) {
					console.warn(`Groq stream error on model ${currentModel}:`, error);
				}
			});

			return result.toUIMessageStreamResponse();
		} catch (err: any) {
			console.warn(`Groq model ${currentModel} failed:`, err?.message || err);
			lastError = err;
		}
	}

	throw lastError || new Error('Rate limit reached on Groq API (429).');
}
