/// <reference types="@cloudflare/workers-types" />
import { KNOWLEDGE_CHUNKS, type KnowledgeChunk } from './chunks';

export const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';

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

/**
 * Query pipeline: embed query -> search Vectorize -> fetch matches from D1
 */
export async function retrieveRelevantContext(
	env: {
		DB?: D1Database;
		VECTORIZE?: VectorizeIndex;
		AI?: any;
	},
	query: string,
	topK = 3
): Promise<string> {
	if (!env?.DB || !env?.VECTORIZE || !env?.AI) {
		// Fallback when running without Cloudflare bindings
		return '';
	}

	try {
		// 1. Embed user query with Workers AI
		const queryVector = await getEmbedding(env.AI, query);

		// 2. Search Vectorize
		const matches = (await env.VECTORIZE.query(queryVector, {
			topK,
			returnMetadata: 'all'
		})) as any;

		if (!matches?.matches || matches.matches.length === 0) {
			return '';
		}

		const ids: string[] = matches.matches.map((m: any) => m.id as string);

		// 3. Fetch matched rows from D1
		const placeholders = ids.map(() => '?').join(',');
		const stmt = env.DB.prepare(
			`SELECT id, category, content FROM knowledge_chunks WHERE id IN (${placeholders})`
		);
		const { results } = await stmt.bind(...ids).all<{ id: string; category: string; content: string }>();

		if (!results || results.length === 0) {
			return '';
		}

		// Keep order aligned with Vectorize ranking score
		const chunkMap = new Map<string, { id: string; category: string; content: string }>(
			results.map((r: { id: string; category: string; content: string }) => [r.id, r])
		);
		const orderedChunks = ids
			.map((id: string) => chunkMap.get(id))
			.filter((c): c is { id: string; category: string; content: string } => Boolean(c));

		return orderedChunks
			.map((c: { id: string; category: string; content: string }) => `[Category: ${c.category}]\n${c.content}`)
			.join('\n\n---\n\n');
	} catch (err) {
		console.warn('RAG retrieval failed, continuing with default prompt context:', err);
		return '';
	}
}
