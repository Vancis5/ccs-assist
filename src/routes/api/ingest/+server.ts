import { json } from '@sveltejs/kit';
import { ingestKnowledgeChunks } from '$lib/server/rag';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, platform }) => {
	// Fail closed: with no secret configured, ingestion is disabled instead of open to everyone
	const authHeader = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
	const secretHeader = request.headers.get('x-ingest-secret');
	const providedKey = secretHeader || authHeader;
	const requiredKey = env.INGEST_SECRET || (platform?.env as any)?.INGEST_SECRET;

	if (!requiredKey) {
		return json(
			{ error: 'Ingestion is disabled: INGEST_SECRET is not configured on this deployment.' },
			{ status: 503 }
		);
	}

	if (providedKey !== requiredKey) {
		return json({ error: 'Unauthorized: Invalid ingestion secret' }, { status: 401 });
	}

	if (!platform?.env?.DB || !platform?.env?.VECTORIZE || !platform?.env?.AI) {
		return json(
			{
				error: 'Cloudflare platform bindings (DB, VECTORIZE, AI) are not available in current environment.'
			},
			{ status: 500 }
		);
	}

	try {
		const result = await ingestKnowledgeChunks(platform.env);
		return json({
			success: true,
			message: `Successfully ingested ${result.ingestedCount} chunks into D1 and Vectorize.`,
			chunks: result.chunks.map((c) => ({ id: c.id, category: c.category }))
		});
	} catch (err: any) {
		console.error('Ingest route error:', err);
		return json({ error: err?.message || 'Ingestion failed' }, { status: 500 });
	}
};
