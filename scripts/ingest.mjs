import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const KNOWLEDGE_DIR = path.resolve(process.cwd(), 'knowledge');
const CATEGORIES = ['academics', 'policy', 'directory', 'campus'];
const EMBEDDING_MODEL = '@cf/baai/bge-base-en-v1.5';
const VECTORIZE_INDEX = 'ccs-assist-index';
const D1_DB = 'ccs-assist-db';

export function extractChunks() {
	const chunks = [];

	for (const category of CATEGORIES) {
		const dirPath = path.join(KNOWLEDGE_DIR, category);
		if (!fs.existsSync(dirPath)) continue;

		const files = fs.readdirSync(dirPath).filter((f) => f.endsWith('.md') || f.endsWith('.txt'));

		for (const file of files) {
			const filePath = path.join(dirPath, file);
			const raw = fs.readFileSync(filePath, 'utf-8');
			const baseName = path.basename(file, path.extname(file));

			// Split by markdown headers (## )
			const sections = raw
				.split(/\n(?=## )/)
				.map((s) => s.trim())
				.filter(Boolean);

			sections.forEach((section, idx) => {
				chunks.push({
					id: `${category}-${baseName}-${idx + 1}`,
					category,
					content: section
				});
			});
		}
	}

	return chunks;
}

async function getEmbedding(text, accountId, apiToken) {
	const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${EMBEDDING_MODEL}`;
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${apiToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ text: [text] })
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`Workers AI embedding failed (${res.status}): ${errorText}`);
	}

	const data = await res.json();
	if (!data.result?.data?.[0]) {
		throw new Error(`Invalid response format from Workers AI: ${JSON.stringify(data)}`);
	}

	return data.result.data[0];
}

async function run() {
	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID || 'ae8367eef8225481b514037ca1061ade';
	const apiToken = process.env.CLOUDFLARE_API_TOKEN;

	console.log('Starting ingestion pipeline...');
	const chunks = extractChunks();
	console.log(`Found ${chunks.length} knowledge chunks.`);

	if (chunks.length === 0) {
		console.warn('No knowledge chunks found in /knowledge.');
		return;
	}

	// 1. Store in D1 (remote and local)
	console.log(`Storing chunks in D1 (${D1_DB})...`);
	const tempSqlFile = path.resolve(process.cwd(), 'scripts', '.temp_chunks.sql');
	const sqlStatements = chunks.map((c) => {
		const escapedContent = c.content.replace(/'/g, "''");
		const escapedCategory = c.category.replace(/'/g, "''");
		const escapedId = c.id.replace(/'/g, "''");
		return `INSERT OR REPLACE INTO knowledge_chunks (id, category, content) VALUES ('${escapedId}', '${escapedCategory}', '${escapedContent}');`;
	});
	fs.writeFileSync(tempSqlFile, sqlStatements.join('\n'), 'utf-8');

	try {
		console.log('Upserting to remote D1...');
		execSync(`npx wrangler d1 execute ${D1_DB} --remote --file=${tempSqlFile} -y`, { stdio: 'inherit' });
		console.log('Upserting to local D1...');
		execSync(`npx wrangler d1 execute ${D1_DB} --local --file=${tempSqlFile} -y`, { stdio: 'inherit' });
	} finally {
		if (fs.existsSync(tempSqlFile)) {
			fs.unlinkSync(tempSqlFile);
		}
	}

	// 2. Generate embeddings & Upsert to Vectorize
	if (!apiToken) {
		console.log('\nNote: CLOUDFLARE_API_TOKEN not set in environment.');
		console.log('To embed directly from CLI and upsert to Vectorize:');
		console.log('Run: CLOUDFLARE_API_TOKEN=<token> node scripts/ingest.mjs');
		console.log('Or hit the worker RAG ingestion route with Workers AI binding.');
		return;
	}

	console.log(`Embedding ${chunks.length} chunks via Workers AI (${EMBEDDING_MODEL})...`);
	const vectors = [];

	for (const chunk of chunks) {
		console.log(`Embedding [${chunk.category}] ${chunk.id}...`);
		const values = await getEmbedding(chunk.content, accountId, apiToken);
		vectors.push({
			id: chunk.id,
			values,
			metadata: { category: chunk.category }
		});
	}

	const tempNdjsonFile = path.resolve(process.cwd(), 'scripts', '.temp_vectors.ndjson');
	const ndjsonContent = vectors.map((v) => JSON.stringify(v)).join('\n');
	fs.writeFileSync(tempNdjsonFile, ndjsonContent, 'utf-8');

	try {
		console.log(`Upserting vectors into Vectorize (${VECTORIZE_INDEX})...`);
		execSync(`npx wrangler vectorize upsert ${VECTORIZE_INDEX} --file=${tempNdjsonFile}`, { stdio: 'inherit' });
		console.log('Vectorize upsert complete!');
	} finally {
		if (fs.existsSync(tempNdjsonFile)) {
			fs.unlinkSync(tempNdjsonFile);
		}
	}

	console.log('Ingestion completed successfully!');
}

run().catch((err) => {
	console.error('Ingestion failed:', err);
	process.exit(1);
});
