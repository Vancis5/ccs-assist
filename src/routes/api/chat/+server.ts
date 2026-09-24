import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { env } from '$env/dynamic/private';
import { getSystemPrompt } from '$lib/server/ai/prompt';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;

		if (!apiKey) {
			return new Response(
				JSON.stringify({
					error: 'GROQ_API_KEY is not configured on the server. Please add it to your .env file.'
				}),
				{ status: 500, headers: { 'Content-Type': 'application/json' } }
			);
		}

		const groq = createGroq({ apiKey });
		const { messages } = await request.json();

		const normalizedMessages = (messages || []).map((m: any) => {
			if (!m.parts && m.content) {
				return {
					...m,
					parts: [{ type: 'text', text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
				};
			}
			return m;
		});

		const modelMessages = await convertToModelMessages(normalizedMessages);
		const modelId = env.GROQ_MODEL || process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

		const result = streamText({
			model: groq(modelId),
			system: getSystemPrompt(),
			messages: modelMessages,
			temperature: 0.6,
			maxOutputTokens: 2048
		});

		return result.toUIMessageStreamResponse();
	} catch (err: any) {
		console.error('Chat API Error:', err);
		return new Response(
			JSON.stringify({
				error: err?.message || 'An error occurred while generating a response.'
			}),
			{ status: 500, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
