/// <reference types="@cloudflare/workers-types" />
import { KNOWLEDGE_CHUNKS, type KnowledgeChunk } from './chunks';

export const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';

const CHUNKS_BY_ID = new Map<string, KnowledgeChunk>(KNOWLEDGE_CHUNKS.map((c) => [c.id, c]));

const STOP_WORDS = new Set([
	// English
	'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from', 'has', 'he',
	'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the', 'to', 'was', 'were',
	'will', 'with', 'what', 'who', 'where', 'when', 'why', 'how', 'much', 'many',
	'can', 'could', 'should', 'would', 'i', 'you', 'my', 'your', 'about', 'tell', 'me',

	// Tagalog & Cebuano particles, pronouns, and question words
	'ang', 'mga', 'sa', 'ug', 'og', 'ng', 'na', 'ba', 'po', 'opo', 'ho', 'kay', 'ko', 'ka', 'mo', 'mi',
	'si', 'ni', 'kang', 'para', 'lang', 'ra', 'man', 'din', 'rin', 'daw', 'raw', 'pala', 'kasi',
	'ung', 'yung', 'nito', 'niyan', 'niyon', 'dito', 'diyan', 'doon', 'diri', 'diha', 'didto',
	'ako', 'ikaw', 'siya', 'kami', 'tayo', 'kayo', 'sila', 'kita', 'kamo',
	'nako', 'nimo', 'niya', 'namo', 'nato', 'ninyo', 'nila',
	'kanako', 'kanimo', 'kaniya', 'kanamo', 'kanato', 'kaninyo', 'kanila',
	'kinsa', 'unsa', 'asa', 'diin', 'ngano', 'giunsa', 'unsaon', 'pila',
	'sino', 'ano', 'saan', 'bakit', 'paano', 'kailan', 'ilan', 'gaano'
]);

/**
 * Domain synonym dictionary mapping Cebuano and Tagalog academic terms
 * to the English vocabulary used in knowledge base chunks.
 */
const DOMAIN_SYNONYMS: Record<string, string[]> = {
	// Programs & curriculum
	kurso: ['program', 'degree', 'curriculum', 'course'],
	kursohon: ['program', 'degree'],
	tulunghaan: ['school', 'college', 'campus'],
	paaralan: ['school', 'college', 'campus'],

	// Faculty & leadership
	dean: ['dean', 'head', 'galdo', 'siega'],
	dekano: ['dean', 'galdo', 'office'],
	dekana: ['dean', 'galdo', 'office'],
	pamunuan: ['dean', 'leadership', 'faculty'],
	kadagkuan: ['dean', 'leadership', 'faculty'],
	magtutudlo: ['faculty', 'instructor', 'teacher'],
	guro: ['faculty', 'instructor', 'teacher'],
	maestro: ['faculty', 'instructor', 'teacher'],
	maestra: ['faculty', 'instructor', 'teacher'],
	propesor: ['faculty', 'professor', 'instructor'],
	secretary: ['secretary', 'oberez', 'office'],
	kalihim: ['secretary', 'oberez'],

	// Facilities & locations
	opisina: ['office', 'deans', 'floor'],
	buhatan: ['office', 'deans', 'floor'],
	nahimutangan: ['location', 'floor', 'office'],
	lokasyon: ['location', 'floor', 'office'],
	kwarto: ['room', 'laboratory', 'lab'],
	lawak: ['room', 'laboratory', 'lab'],
	laboratoryo: ['laboratory', 'lab', 'illc', 'computer'],
	simbahan: ['chapel', 'canticum', 'novum'],
	kapilya: ['chapel', 'canticum', 'novum'],

	// Enrollment & admission
	palista: ['enroll', 'enrollment', 'admission'],
	pagpalista: ['enroll', 'enrollment', 'admission'],
	patala: ['enroll', 'enrollment', 'admission'],
	pagpatala: ['enroll', 'enrollment', 'admission'],
	enrol: ['enroll', 'enrollment', 'admission'],
	rehistro: ['registration', 'portal', 'cor'],

	// Fees & scholarships
	matrikula: ['tuition', 'fee', 'unit'],
	bayad: ['tuition', 'fee', 'payment'],
	bayranan: ['tuition', 'fee', 'costs'],
	diskwento: ['discount', 'scholarship', 'subsidy'],
	iskolar: ['scholarship', 'grant', 'discount'],
	iskolarship: ['scholarship', 'grant', 'discount'],

	// Academic policies & rules
	balaod: ['policy', 'retention', 'rules', 'grade'],
	patakaran: ['policy', 'retention', 'rules', 'grade'],
	grado: ['grade', 'gpa', 'rating', 'scale'],
	marka: ['grade', 'gpa', 'rating'],
	puntos: ['grade', 'rating', 'gpa'],
	hagbong: ['fail', 'retention', 'failed', 'fa'],
	bagsak: ['fail', 'retention', 'failed', 'fa'],
	absent: ['absence', 'attendance', 'fa'],
	liban: ['absence', 'attendance', 'fa'],
	uniporme: ['uniform', 'dress', 'code', 'wash'],
	sinina: ['uniform', 'dress', 'code', 'wash'],
	kasuotan: ['uniform', 'dress', 'code', 'wash'],

	// Graduation & Practicum
	graduwar: ['graduation', 'graduate', 'degree'],
	gradweyt: ['graduation', 'graduate', 'degree'],
	pagtapos: ['graduation', 'graduate', 'degree'],
	ojt: ['internship', 'practicum', 'hours'],
	praktis: ['internship', 'practicum', 'hours'],
	teolohiya: ['theology', 'theo', 'curriculum']
};

/**
 * Keyword-based retrieval across bundled chunks with Cebuano/Tagalog synonym expansion.
 */
function getKeywordMatches(query: string, limit = 3): KnowledgeChunk[] {
	const rawTerms = query
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((w) => w.length > 1 && !STOP_WORDS.has(w));

	if (rawTerms.length === 0) return [];

	// Expand search terms with mapped domain concepts
	const terms = new Set<string>(rawTerms);
	for (const term of rawTerms) {
		const synonyms = DOMAIN_SYNONYMS[term];
		if (synonyms) {
			for (const s of synonyms) {
				terms.add(s);
			}
		}
	}

	const termList = Array.from(terms);

	const scored = KNOWLEDGE_CHUNKS.map((chunk) => {
		const lowerContent = chunk.content.toLowerCase();
		let score = 0;
		const firstLine = lowerContent.split('\n')[0];

		for (const term of termList) {
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
 * Expands non-English query terms with English equivalents to maximize
 * cosine similarity against English-only embedding models like bge-base-en-v1.5.
 */
export function expandQueryForEmbedding(query: string): string {
	const rawTerms = query
		.toLowerCase()
		.replace(/[^a-z0-9\s]/g, ' ')
		.split(/\s+/)
		.filter((w) => w.length > 1 && !STOP_WORDS.has(w));

	const expansions: string[] = [];
	for (const term of rawTerms) {
		const synonyms = DOMAIN_SYNONYMS[term];
		if (synonyms) {
			expansions.push(...synonyms);
		}
	}

	if (expansions.length === 0) return query;
	const uniqueExpansions = Array.from(new Set(expansions)).slice(0, 6);
	return `${query} (${uniqueExpansions.join(' ')})`;
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
			// 1. Embed user query with Workers AI (using term expansion for cross-lingual English embedding)
			const embeddingQuery = expandQueryForEmbedding(query);
			const queryVector = await getEmbedding(env.AI, embeddingQuery);

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
