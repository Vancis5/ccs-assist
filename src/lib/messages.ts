/**
 * Shared message extraction and normalization utilities.
 */

export interface MessageLike {
	role?: 'system' | 'user' | 'assistant';
	content?: string | any;
	parts?: Array<{ type: string; text?: string; [key: string]: any }>;
	[key: string]: any;
}

/**
 * Extracts plain text from AI SDK message objects whether structured as parts or raw content string.
 */
export function extractMessageText(msg?: MessageLike | null): string {
	if (!msg) return '';
	if (typeof msg.content === 'string') return msg.content;
	if (Array.isArray(msg.parts)) {
		return msg.parts
			.filter((p) => p && (p.type === 'text' || !p.type) && typeof p.text === 'string')
			.map((p) => p.text)
			.join('');
	}
	if (msg.content) {
		return typeof msg.content === 'object' ? JSON.stringify(msg.content) : String(msg.content);
	}
	return '';
}

/**
 * Normalizes message array into structured parts format expected by AI model conversion.
 */
export function normalizeMessages(messages: any[] = []): any[] {
	return messages.map((m) => {
		if (!m.parts && m.content !== undefined) {
			return {
				...m,
				parts: [{ type: 'text', text: typeof m.content === 'string' ? m.content : JSON.stringify(m.content) }]
			};
		}
		return m;
	});
}

