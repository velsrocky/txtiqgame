<script lang="ts">
	import { onMount } from 'svelte';
	import { browser, dev } from '$app/environment';
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	onMount(() => {
		// Register the service worker in production only, so dev never serves a
		// stale cached bundle
		if (browser && !dev && 'serviceWorker' in navigator) {
			navigator.serviceWorker.register('/service-worker.js').catch(() => {
				// Registration failed – the app still works online
			});
		}
	});
</script>

<svelte:head>
	<title>TxtIQ – Test Your Intelligence Quotient</title>
	<meta
		name="description"
		content="TxtIQ is a free IQ quiz game: logic, verbal and math puzzles across themed packs, a daily challenge, achievements and personal stats."
	/>
	<meta name="theme-color" content="#4c1d95" />
	<meta property="og:title" content="TxtIQ – Test Your Intelligence Quotient" />
	<meta
		property="og:description"
		content="Answer 10 logic, verbal and math puzzles and discover your IQ score. Daily challenges, achievements and stats!"
	/>
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://games.velstech.net/" />
	<meta name="twitter:card" content="summary" />
	<link rel="icon" href={favicon} />
	<link rel="manifest" href="/manifest.webmanifest" />
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-title" content="TxtIQ" />
	<link rel="apple-touch-icon" href="/icon.svg" />
</svelte:head>
{@render children()}
