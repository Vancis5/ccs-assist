import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const apiKey = env.GROQ_API_KEY || process.env.GROQ_API_KEY;
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
