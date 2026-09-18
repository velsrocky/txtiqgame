<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { game } from '$lib/game.svelte';
	import { audio } from '$lib/audio.svelte';
	import AchievementPopup from '$lib/components/AchievementPopup.svelte';
	import StartScreen from '$lib/components/StartScreen.svelte';
	import ModeSelect from '$lib/components/ModeSelect.svelte';
	import PackSelect from '$lib/components/PackSelect.svelte';
	import GameScreen from '$lib/components/GameScreen.svelte';
	import FinishedScreen from '$lib/components/FinishedScreen.svelte';
	import LeaderboardScreen from '$lib/components/LeaderboardScreen.svelte';
	import StatsScreen from '$lib/components/StatsScreen.svelte';

	onMount(() => {
		game.loadAll();

		// Freeze the countdown when the tab is hidden, resume when it's focused again
		const onVisibility = () => {
			if (document.hidden) game.pauseTimer();
			else game.resumeTimer();
		};
		document.addEventListener('visibilitychange', onVisibility);
		return () => document.removeEventListener('visibilitychange', onVisibility);
	});
	onDestroy(() => game.cleanup());
</script>

<main
	class="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 text-white"
>
	<div class="mx-auto max-w-4xl">
		<header class="mt-4 mb-8">
			<div class="flex items-start justify-between gap-4">
				<div class="flex-1 text-center">
					<h1 class="mb-2 text-6xl font-bold">🧠 TxtIQ</h1>
					<p class="text-xl opacity-80">Test Your Intelligence Quotient</p>
				</div>
				<button
					type="button"
					onclick={() => audio.toggleMute()}
					aria-pressed={audio.muted}
					aria-label={audio.muted ? 'Unmute sound' : 'Mute sound'}
					title={audio.muted ? 'Unmute sound' : 'Mute sound'}
					class="shrink-0 rounded-lg bg-white/10 px-3 py-2 text-xl transition-all hover:bg-white/20"
				>
					{audio.muted ? '🔇' : '🔊'}
				</button>
			</div>
		</header>

		<AchievementPopup />

		{#if game.gameState === 'start'}
			<StartScreen />
		{:else if game.gameState === 'selectMode'}
			<ModeSelect />
		{:else if game.gameState === 'selectPack'}
			<PackSelect />
		{:else if game.gameState === 'playing' && game.currentQuestion}
			<GameScreen />
		{:else if game.gameState === 'finished'}
			<FinishedScreen />
		{:else if game.gameState === 'leaderboard'}
			<LeaderboardScreen />
		{:else if game.gameState === 'stats'}
			<StatsScreen />
		{/if}
	</div>
</main>

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		font-family:
			system-ui,
			-apple-system,
			sans-serif;
	}
</style>
