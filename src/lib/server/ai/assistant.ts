import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { env } from '$env/dynamic/private';
import { normalizeMessages } from '$lib/messages';
import { getSystemPrompt } from './prompt';

export interface AssistantStreamOptions {
	messages: any[];
	apiKey?: string;
	modelId?: string;
}

/**
 * Deep module encapsulating dialogue normalization, system prompt generation,
 * knowledge context injection, Groq configuration, and streaming.
 */
export async function streamAssistantResponse({
	messages,
	apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY,
	modelId = env.GROQ_MODEL || process.env.GROQ_MODEL || 'openai/gpt-oss-20b'
}: AssistantStreamOptions): Promise<Response> {
	if (!apiKey) {
		throw new Error('GROQ_API_KEY is not configured on the server. Please add it to your .env file.');
	}

	const groq = createGroq({ apiKey });
	const normalizedMessages = normalizeMessages(messages);
	const modelMessages = await convertToModelMessages(normalizedMessages);

	const result = streamText({
		model: groq(modelId),
		system: getSystemPrompt(),
		messages: modelMessages,
		temperature: 0.6,
		maxOutputTokens: 2048
	});

	return result.toUIMessageStreamResponse();
}
