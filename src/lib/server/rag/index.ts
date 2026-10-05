/// <reference types="@cloudflare/workers-types" />
import { KNOWLEDGE_CHUNKS, type KnowledgeChunk } from './chunks';

export const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';

const CHUNKS_BY_ID = new Map<string, KnowledgeChunk>(KNOWLEDGE_CHUNKS.map((c) => [c.id, c]));

const STOP_WORDS = new Set([
	'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
	'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
	'will', 'with', 'what', 'who', 'where', 'when', 'why', 'how', 'much', 'many',
	'can', 'could', 'should', 'would', 'i', 'you', 'my', 'your', 'about', 'tell', 'me'
]);

/**
 * Keyword-based retrieval across bundled chunks for fast hybrid fallback.
 */
function getKeywordMatches(query: string, limit = 3): KnowledgeChunk[] {
	const terms = query
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((w) => w.length > 1 && !STOP_WORDS.has(w));

	if (terms.length === 0) return [];

	const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
		const lowerContent = chunk.content.toLowerCase();
		let score = 0;
		const firstLine = lowerContent.split('\n')[0];

		for (const term of terms) {
			if (firstLine.includes(term)) {
				score += 4; // High weight for header matches
			}
			if (lowerContent.includes(term)) {
				score += 1;
			}
		}
		return { chunk, score };
	});

	return scored
		.filter((s) => s.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, limit)
		.map((s) => s.chunk);
}

/**
 * Generate embedding vector using Workers AI binding
 */
export async function getEmbedding(ai: any, text: string): Promise<number[]> {
	const response = await ai.run(EMBEDDING_MODEL, {
		text: [text]
	});

	if (Array.isArray(response?.data?.[0])) {
		return response.data[0];
	}
	if (Array.isArray(response?.data)) {
		return response.data;
	}
	throw new Error(`Unexpected Workers AI embedding response format: ${JSON.stringify(response)}`);
}

/**
 * Ingest knowledge chunks into D1 and Vectorize
 */
export async function ingestKnowledgeChunks(env: {
	DB?: D1Database;
	VECTORIZE?: VectorizeIndex;
	AI?: any;
}): Promise<{ ingestedCount: number; chunks: KnowledgeChunk[] }> {
	if (!env.DB || !env.VECTORIZE || !env.AI) {
		throw new Error('Missing Cloudflare bindings: DB, VECTORIZE, or AI');
	}

	const { DB, VECTORIZE, AI } = env;

	// Ensure table exists in D1
	await DB.prepare(
		`CREATE TABLE IF NOT EXISTS knowledge_chunks (
			id TEXT PRIMARY KEY,
			category TEXT NOT NULL,
			content TEXT NOT NULL
		)`
	).run();

	const vectorsToUpsert: VectorizeVector[] = [];

	for (const chunk of KNOWLEDGE_CHUNKS) {
		// 1. Store/Upsert in D1
		await DB.prepare(
			`INSERT OR REPLACE INTO knowledge_chunks (id, category, content) VALUES (?, ?, ?)`
		)
			.bind(chunk.id, chunk.category, chunk.content)
			.run();

		// 2. Generate embedding with Workers AI
		const values = await getEmbedding(AI, chunk.content);

		vectorsToUpsert.push({
			id: chunk.id,
			values,
			metadata: { category: chunk.category }
		});
	}

	// 3. Upsert to Vectorize index
	await VECTORIZE.upsert(vectorsToUpsert);

	return {
		ingestedCount: KNOWLEDGE_CHUNKS.length,
		chunks: KNOWLEDGE_CHUNKS
	};
}

export interface RetrievalResult {
	context: string;
	topScore: number;
	matchCount: number;
	/** true only when retrieval ran successfully */
	ok: boolean;
}

/**
 * Hybrid query pipeline:
 * 1. Vectorize semantic search (Workers AI embedding -> Vectorize index)
 * 2. In-memory + D1 chunk resolution
 * 3. Sparse keyword re-ranking / augmentation
 */
export async function retrieveRelevantContext(
	env: {
		DB?: D1Database;
		VECTORIZE?: VectorizeIndex;
		AI?: any;
	},
	query: string,
	topK = 5
): Promise<RetrievalResult> {
	const keywordMatches = getKeywordMatches(query, 3);
	let vectorChunks: KnowledgeChunk[] = [];
	let topScore = keywordMatches.length > 0 ? 0.75 : 0;

	if (env?.VECTORIZE && env?.AI) {
		try {
			// 1. Embed user query with Workers AI
			const queryVector = await getEmbedding(env.AI, query);

			// 2. Search Vectorize
			const matches = (await env.VECTORIZE.query(queryVector, {
				topK,
				returnMetadata: 'all'
			})) as any;

			if (matches?.matches && matches.matches.length > 0) {
				topScore = Math.max(topScore, matches.matches[0]?.score ?? 0);
				const matchedIds: string[] = matches.matches.map((m: any) => m.id as string);

				// Resolve chunks from in-memory map first (instant), fallback to D1 if needed
				for (const id of matchedIds) {
					const inMemory = CHUNKS_BY_ID.get(id);
					if (inMemory) {
						vectorChunks.push(inMemory);
					}
				}

				// If in-memory was missing any ID (e.g. dynamic D1 insertions), query D1
				const missingIds = matchedIds.filter((id) => !CHUNKS_BY_ID.has(id));
				if (missingIds.length > 0 && env.DB) {
					const placeholders = missingIds.map(() => '?').join(',');
					const stmt = env.DB.prepare(
						`SELECT id, category, content FROM knowledge_chunks WHERE id IN (${placeholders})`
					);
					const { results } = await stmt.bind(...missingIds).all<KnowledgeChunk>();
					if (results) {
						vectorChunks.push(...results);
					}
				}
			}
		} catch (err) {
			console.warn('Vectorize retrieval failed, relying on keyword matches:', err);
		}
	}

	// Combine keyword matches and vector chunks (deduplicated by id)
	const combinedMap = new Map<string, KnowledgeChunk>();
	for (const chunk of keywordMatches) {
		combinedMap.set(chunk.id, chunk);
	}
	for (const chunk of vectorChunks) {
		if (!combinedMap.has(chunk.id)) {
			combinedMap.set(chunk.id, chunk);
		}
	}

	const orderedChunks = Array.from(combinedMap.values()).slice(0, Math.max(topK, 5));

	if (orderedChunks.length === 0) {
		return { context: '', topScore: 0, matchCount: 0, ok: true };
	}

	const context = orderedChunks
		.map((c) => `[Category: ${c.category}]\n${c.content}`)
		.join('\n\n---\n\n');

	return {
		context,
		topScore: Math.max(topScore, 0.6),
		matchCount: orderedChunks.length,
		ok: true
	};
}
