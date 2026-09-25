/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

declare const self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const CACHE = `ccs-assist-cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);

	// Don't intercept API routes or non-http requests
	if (url.pathname.startsWith('/api') || !url.protocol.startsWith('http')) return;

	async function respond() {
		const cache = await caches.open(CACHE);

		// Serve cached build/static assets immediately (cache-first)
		if (ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) return cachedResponse;
		}

		// Network-first for pages and dynamic requests with offline cache fallback
		try {
			const response = await fetch(event.request);
			const isOk = response.status === 200;
			const isSameOrigin = url.origin === self.location.origin;

			if (isOk && isSameOrigin) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch {
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) return cachedResponse;

			// Fallback to cached root/shell if navigation
			if (event.request.mode === 'navigate') {
				const fallback = await cache.match('/');
				if (fallback) return fallback;
			}

			throw new Error('Offline and not cached');
		}
	}

	event.respondWith(respond());
});
