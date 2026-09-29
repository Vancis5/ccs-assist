import { streamAssistantResponse, createFixedRefusalResponse } from '$lib/server/ai/assistant';
import { retrieveRelevantContext } from '$lib/server/rag';
import { extractMessageText } from '$lib/messages';
import type { RequestHandler } from './$types';

const MAX_MESSAGE_LENGTH = 1000;
const SIMILARITY_THRESHOLD = 0.35;

const CASUAL_GREETINGS = new Set([
	'hi', 'hello', 'hey', 'sup', 'yo', 'good morning', 'good afternoon', 'good evening',
	'kumusta', 'musta', 'hmmm', 'who are you', 'what can you do', 'help', 'test'
]);

function isGreeting(text: string): boolean {
	const cleaned = text.toLowerCase().trim().replace(/[?!.,]/g, '');
	return CASUAL_GREETINGS.has(cleaned) || cleaned.length <= 4;
}

export const POST: RequestHandler = async ({ request, platform }) => {
	try {
		const body = (await request.json()) as any;
		const messages = body?.messages;

		// 1. Input validation
		if (!Array.isArray(messages) || messages.length === 0) {
			return new Response(JSON.stringify({ error: 'Invalid or missing messages array.' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		for (const m of messages) {
			const text = extractMessageText(m);
			if (text.length > MAX_MESSAGE_LENGTH) {
				return new Response(
					JSON.stringify({
						error: `Message content exceeds the allowed limit of ${MAX_MESSAGE_LENGTH} characters.`
					}),
					{ status: 400, headers: { 'Content-Type': 'application/json' } }
				);
			}
		}

		// 2. Build conversation-aware retrieval query for multi-turn follow-ups
		const userMessages = messages.filter((m: any) => m.role === 'user');
		const lastUserMessage = userMessages[userMessages.length - 1];
		const queryText = extractMessageText(lastUserMessage).trim();

		let ragContext = '';
		let topScore = 0;

		if (queryText && platform?.env) {
			// Include immediate prior user turn to resolve conversational pronouns (e.g. "what about the second one?")
			const prevUserMessage = userMessages.length > 1 ? userMessages[userMessages.length - 2] : null;
			const contextAwareQuery = prevUserMessage
				? `${extractMessageText(prevUserMessage).slice(-100)} ${queryText}`
				: queryText;

			const result = await retrieveRelevantContext(platform.env, contextAwareQuery, 5);
			ragContext = result.context;
			topScore = result.topScore;

			// 3. Strict deterministic scope enforcement via Vectorize similarity score
			// If not a brief casual greeting and top similarity score is below threshold, reject immediately without calling LLM
			if (!isGreeting(queryText) && result.matchCount > 0 && topScore < SIMILARITY_THRESHOLD) {
				return createFixedRefusalResponse(
					"I only answer questions regarding the College of Computer Studies at Saint Joseph College, including our BSCS, BSIT, and ACT programs, faculty, curriculum, enrollment, lab policies, and student organizations."
				);
			}
		}

		// 4. Stream response with failover
		return await streamAssistantResponse({
			messages,
			ragContext,
			ai: platform?.env?.AI
		});
	} catch (err: any) {
		console.error('Chat API Error:', err);
		const status =
			err?.status ||
			err?.statusCode ||
			(err?.message?.includes('429') || err?.message?.toLowerCase().includes('rate limit') ? 429 : 500);

		return new Response(
			JSON.stringify({
				error: err?.message || 'An error occurred while generating a response.'
			}),
			{ status, headers: { 'Content-Type': 'application/json' } }
		);
	}
};
