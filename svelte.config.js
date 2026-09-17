import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations-overview for more.
	preprocess: vitePreprocess(),

	kit: {
		// Run `npm run build` before deploying to production.
		adapter: adapter()
	}
};

export default config;
