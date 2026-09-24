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

		const modelMessages = await convertToModelMessages(messages);

		const result = streamText({
			model: groq('llama-3.3-70b-versatile'),
			system: getSystemPrompt(),
			messages: modelMessages,
			temperature: 0.3,
			maxOutputTokens: 1024
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
