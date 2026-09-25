import { streamAssistantResponse } from '$lib/server/ai/assistant';
import { retrieveRelevantContext } from '$lib/server/rag';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const { messages } = (await request.json()) as { messages: any[] };

		// Extract latest user message for RAG embedding & retrieval
		let ragContext = '';
		if (Array.isArray(messages) && messages.length > 0 && platform?.env) {
			const lastUserMessage = [...messages].reverse().find((m: any) => m.role === 'user');
			const queryText =
				typeof lastUserMessage?.content === 'string'
					? lastUserMessage.content
					: Array.isArray(lastUserMessage?.content)
						? lastUserMessage.content
								.filter((part: any) => part.type === 'text')
								.map((part: any) => part.text)
								.join(' ')
						: '';

			if (queryText.trim()) {
				ragContext = await retrieveRelevantContext(platform.env, queryText.trim());
			}
		}

		return await streamAssistantResponse({ messages, ragContext });
	} catch (err: any) {
		console.error('Chat API Error:', err);
		const status = err?.status || err?.statusCode || (err?.message?.includes('429') || err?.message?.toLowerCase().includes('rate limit') ? 429 : 500);
		return new Response(
			JSON.stringify({
				error: err?.message || 'An error occurred while generating a response.'
			}),
			{ status, headers: { 'Content-Type': 'application/json' } }
		);
	}
};

