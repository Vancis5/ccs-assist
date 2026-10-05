/**
 * Best-effort sliding-window rate limiter.
 *
 * State lives in the memory of a single Worker isolate, so it is NOT a global limit.
 * It stops a casual script hammering one isolate. For a real cap, also add a
 * Cloudflare WAF rate limiting rule on /api/* in the dashboard.
 */
const hits = new Map<string, number[]>();
let lastSweep = 0;

export function rateLimit(
	key: string,
	limit: number,
	windowMs: number
): { ok: boolean; retryAfterSec: number } {
	const now = Date.now();
	const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);

	if (recent.length >= limit) {
		hits.set(key, recent);
		return { ok: false, retryAfterSec: Math.max(1, Math.ceil((windowMs - (now - recent[0])) / 1000)) };
	}

	recent.push(now);
	hits.set(key, recent);

	// Sweep stale keys every minute so the map cannot grow forever
	if (now - lastSweep > 60_000) {
		lastSweep = now;
		for (const [k, v] of hits) {
			if (v.every((t) => now - t >= windowMs)) hits.delete(k);
		}
	}
	return { ok: true, retryAfterSec: 0 };
}

export function clientKey(request: Request, getClientAddress?: () => string): string {
	const cf = request.headers.get('cf-connecting-ip');
	if (cf) return cf;
	try {
		return getClientAddress?.() ?? 'unknown';
	} catch {
		return 'unknown';
	}
}

export function tooManyRequests(retryAfterSec: number): Response {
	return new Response(JSON.stringify({ error: 'Rate limit: too many requests, slow down a bit.' }), {
		status: 429,
		headers: { 'Content-Type': 'application/json', 'Retry-After': String(retryAfterSec) }
	});
}
