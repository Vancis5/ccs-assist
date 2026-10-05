import { env } from '$env/dynamic/private';
import { rateLimit, clientKey, tooManyRequests } from '$lib/server/rateLimit';
import type { RequestHandler } from './$types';

const MAX_AUDIO_BYTES = 3 * 1024 * 1024; // ~3 MB, far above a normal voice question
const RATE_LIMIT = 10; // requests
const RATE_WINDOW_MS = 60_000; // per minute, per client

export const POST: RequestHandler = async ({ request, platform, getClientAddress }) => {
	const limited = rateLimit(`transcribe:${clientKey(request, getClientAddress)}`, RATE_LIMIT, RATE_WINDOW_MS);
	if (!limited.ok) return tooManyRequests(limited.retryAfterSec);

	const declaredSize = Number(request.headers.get('content-length') ?? 0);
	if (declaredSize > MAX_AUDIO_BYTES + 64 * 1024) {
		return new Response(JSON.stringify({ error: 'Audio file is too large.' }), {
			status: 413,
			headers: { 'Content-Type': 'application/json' }
		});
	}

	try {
		const apiKey = platform?.env?.GROQ_API_KEY || env.GROQ_API_KEY || process.env.GROQ_API_KEY;
		if (!apiKey) {
			return new Response(JSON.stringify({ error: 'GROQ_API_KEY not configured' }), {
				status: 500,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const formData = await request.formData();
		const audioFile = formData.get('file');

		if (!audioFile || !(audioFile instanceof Blob)) {
			return new Response(JSON.stringify({ error: 'Audio file is required' }), {
				status: 400,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		if (audioFile.size > MAX_AUDIO_BYTES) {
			return new Response(JSON.stringify({ error: 'Audio file is too large.' }), {
				status: 413,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const groqFormData = new FormData();
		groqFormData.append('file', audioFile, 'recording.webm');
		groqFormData.append('model', 'whisper-large-v3-turbo');
		groqFormData.append('response_format', 'json');
		groqFormData.append('temperature', '0');
		groqFormData.append('language', 'en');
		groqFormData.append('prompt', 'Student asking about College of Computer Studies, BSCS, BSIT, ACT, teachers, curriculum.');

		const response = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${apiKey}`
			},
			body: groqFormData
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error('Groq Whisper error:', response.status, errorText);
			return new Response(JSON.stringify({ error: `Transcription failed: ${response.statusText}` }), {
				status: response.status,
				headers: { 'Content-Type': 'application/json' }
			});
		}

		const result = (await response.json()) as { text?: string };
		const rawText = (result.text || '').trim();
		const normalized = rawText.toLowerCase().replace(/[.,!?'"]/g, '').trim();

		const SILENCE_HALLUCINATIONS = new Set([
			'thank you',
			'thank you so much',
			'thank you very much',
			'thanks for watching',
			'thank you for watching',
			'subtitles by',
			'you',
			'bye',
			'silence'
		]);

		const cleanText = SILENCE_HALLUCINATIONS.has(normalized) ? '' : rawText;

		return new Response(JSON.stringify({ text: cleanText }), {
			status: 200,
			headers: { 'Content-Type': 'application/json' }
		});
	} catch (err: any) {
		console.error('Transcribe error:', err);
		return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
			status: 500,
			headers: { 'Content-Type': 'application/json' }
		});
	}
};
