import { json } from '@sveltejs/kit';
import { ingestKnowledgeChunks } from '$lib/server/rag';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ platform }) => {
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
