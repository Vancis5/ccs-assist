import { streamAssistantResponse } from '$lib/server/ai/assistant';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { messages } = await request.json();
		return await streamAssistantResponse({ messages });
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

