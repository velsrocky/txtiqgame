/// <reference types="@sveltejs/kit" />
import { build, files, version } from '$service-worker';

const CACHE = `txtiq-cache-${version}`;
const ASSETS = [...build, ...files];

self.addEventListener('install', (event) => {
	event.waitUntil(
		(async () => {
			const cache = await caches.open(CACHE);
			// Precache the hashed build assets and static files
			await cache.addAll(ASSETS);
		})()
	);
});

self.addEventListener('activate', (event) => {
	event.waitUntil(
		(async () => {
			// Drop caches from previous builds
			for (const key of await caches.keys()) {
				if (key !== CACHE) await caches.delete(key);
			}
			await self.clients.claim();
		})()
	);
});

self.addEventListener('fetch', (event) => {
	if (event.request.method !== 'GET') return;

	const url = new URL(event.request.url);
	if (url.origin !== self.location.origin) return;

	event.respondWith(
		(async () => {
			const cache = await caches.open(CACHE);

			// Precached assets (hashed bundles, static files): cache-first
			if (ASSETS.includes(url.pathname)) {
				return (await cache.match(url.pathname)) ?? (await fetch(event.request));
			}

			// Pages: network-first so content stays fresh, fall back to cache offline
			try {
				const response = await fetch(event.request);
				cache.put(event.request, response.clone());
				return response;
			} catch {
				const cached = await cache.match(event.request);
				if (cached) return cached;
				const root = await cache.match('/');
				if (root) return root;
				return new Response('Offline', { status: 503, statusText: 'Offline' });
			}
		})()
	);
});
