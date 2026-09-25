/// <reference types="@cloudflare/workers-types" />
// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			env?: {
				DB?: D1Database;
				VECTORIZE?: VectorizeIndex;
				AI?: Ai;
				GROQ_API_KEY?: string;
				GROQ_MODEL?: string;
			};
			context?: {
				waitUntil(promise: Promise<any>): void;
			};
			caches?: CacheStorage;
		}
	}
}

export {};
