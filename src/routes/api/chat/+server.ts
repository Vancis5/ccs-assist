import { streamAssistantResponse, createFixedRefusalResponse } from '$lib/server/ai/assistant';
import { retrieveRelevantContext } from '$lib/server/rag';
import { extractMessageText } from '$lib/messages';
import { env } from '$env/dynamic/private';
import { rateLimit, clientKey, tooManyRequests } from '$lib/server/rateLimit';
import type { RequestHandler } from './$types';

const MAX_MESSAGE_LENGTH = 1000;
const MAX_MESSAGES = 30;
const RATE_LIMIT = Number(env.CHAT_RATE_LIMIT || process.env.CHAT_RATE_LIMIT || 60); // requests
const RATE_WINDOW_MS = 60_000; // per minute, per client

// Standalone questions must clear this bar. Tune with scripts/scope-test.mjs
const SIMILARITY_THRESHOLD = 0.35;
// Short follow-ups ("what about the second one?") borrow the previous question for retrieval,
// so they must clear a HIGHER bar. Otherwise "write me a poem" rides on the previous topic.
const FOLLOWUP_THRESHOLD = 0.5;
const FOLLOWUP_MAX_WORDS = 6;

const CASUAL_GREETINGS = new Set([
	'hi', 'hello', 'hey', 'sup', 'yo', 'good morning', 'good afternoon', 'good evening',
	'kumusta', 'musta', 'hmmm', 'who are you', 'what can you do', 'help', 'test',
	'thanks', 'thank you', 'ok', 'okay'
]);

// Exact-match only. The old "length <= 4" shortcut let any 4-char message skip the scope gate.
function isGreeting(text: string): boolean {
	const cleaned = text.toLowerCase().trim().replace(/[?!.,]/g, '');
	return CASUAL_GREETINGS.has(cleaned);
}

export const POST: RequestHandler = async ({ request, platform, getClientAddress }) => {
	const limited = rateLimit(`chat:${clientKey(request, getClientAddress)}`, RATE_LIMIT, RATE_WINDOW_MS);
	if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

	try {
		const body = (await request.json()) as any;
		// Only user/assistant turns are accepted, so a client cannot inject its own "system" message
		const messages = Array.isArray(body?.messages)
			? body.messages
					.filter((m: any) => m?.role === 'user' || m?.role === 'assistant')
					.slice(-MAX_MESSAGES)
			: body?.messages;

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

		if (queryText && platform?.env && !isGreeting(queryText)) {
			// 3. For short follow-ups (<= 6 words like "3rd year?"), include previous turn for semantic clarity
			const prevUserMessage = userMessages.length > 1 ? userMessages[userMessages.length - 2] : null;
			const wordCount = queryText.split(/\s+/).length;
			const retrievalQuery =
				prevUserMessage && wordCount <= FOLLOWUP_MAX_WORDS
					? `${extractMessageText(prevUserMessage).slice(-150)} ${queryText}`
					: queryText;

			let result = await retrieveRelevantContext(platform.env, retrievalQuery, 3);

			// If contextualized search didn't clear threshold, try standalone query as fallback
			if (result.ok && result.topScore < SIMILARITY_THRESHOLD && retrievalQuery !== queryText) {
				const standaloneResult = await retrieveRelevantContext(platform.env, queryText, 3);
				if (standaloneResult.ok && standaloneResult.topScore > result.topScore) {
					result = standaloneResult;
				}
			}

			ragContext = result.context;
			topScore = result.topScore;
			console.log(`[scope] score=${topScore.toFixed(3)} ok=${result.ok} q="${queryText.slice(0, 60)}"`);

			// 3c. Strict deterministic scope enforcement via Vectorize similarity score.
			// result.ok is false when retrieval errored, in which case we fall through to the
			// prompt guardrails instead of refusing everything. Zero matches on a healthy query IS a refusal.
			if (result.ok && topScore < SIMILARITY_THRESHOLD) {
				return createFixedRefusalResponse(
					"I only answer questions regarding the College of Computer Studies at Saint Joseph College, including our BSCS, BSIT, and ACT programs, faculty, curriculum, enrollment, lab policies, and student organizations."
				);
			}
		}

		// 4. Stream response with failover
		return await streamAssistantResponse({
			messages,
			apiKey: platform?.env?.GROQ_API_KEY || env.GROQ_API_KEY || process.env.GROQ_API_KEY,
			modelId: platform?.env?.GROQ_MODEL || env.GROQ_MODEL || process.env.GROQ_MODEL,
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
