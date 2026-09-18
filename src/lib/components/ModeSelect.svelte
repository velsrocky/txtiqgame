<script lang="ts">
	import { game } from '$lib/game.svelte';
	import type { Difficulty } from '$lib/types';

	const difficulties: { id: Difficulty; emoji: string; label: string; hint: string }[] = [
		{ id: 'easy', emoji: '😊', label: 'Easy', hint: '10 min, 5 hints' },
		{ id: 'medium', emoji: '🤔', label: 'Medium', hint: '5 min, 3 hints' },
		{ id: 'hard', emoji: '🔥', label: 'Hard', hint: '3 min, 1 hint' }
	];
</script>

<div class="rounded-3xl bg-white/10 p-8 backdrop-blur-lg">
	<h2 class="mb-6 text-center text-3xl font-bold">Choose Game Mode</h2>

	{#if game.dailyMessage}
		<div class="mb-6 rounded-xl bg-orange-500/20 px-4 py-3 text-center text-sm text-orange-200">
			{game.dailyMessage}
		</div>
	{/if}

	<div class="grid gap-6">
		<!-- Normal Mode -->
		<button
			type="button"
			onclick={() => game.startGame('normal')}
			class="transform rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-left transition-all hover:scale-105 hover:from-blue-600 hover:to-purple-700"
		>
			<div class="mb-2 flex items-center justify-between">
				<h3 class="text-2xl font-bold">🎯 Normal Mode</h3>
			</div>
			<p class="opacity-80">Choose your difficulty and question pack</p>
		</button>

		<!-- Daily Challenge -->
		<button
			type="button"
			onclick={() => game.startGame('daily')}
			class="transform rounded-xl bg-gradient-to-r from-orange-500 to-red-600 p-6 text-left transition-all hover:scale-105 hover:from-orange-600 hover:to-red-700"
		>
			<div class="mb-2 flex items-center justify-between">
				<h3 class="text-2xl font-bold">📅 Daily Challenge</h3>
				{#if game.dailyCompletedToday}
					<span class="rounded-full bg-green-500 px-3 py-1 text-sm">✓ Completed</span>
				{/if}
			</div>
			<p class="opacity-80">
				Classic pack • Medium • New challenge every day • Current streak: {game.dailyChallenge
					.streak} 🔥
			</p>
		</button>
	</div>

	<!-- Difficulty Selection for Normal Mode -->
	<div class="mt-8">
		<h3 class="mb-4 text-center text-xl font-bold">Select Difficulty</h3>
		<div class="grid grid-cols-3 gap-4">
			{#each difficulties as d (d.id)}
				<button
					type="button"
					onclick={() => (game.difficulty = d.id)}
					aria-pressed={game.difficulty === d.id}
					class="rounded-xl p-4 transition-all {game.difficulty === d.id
						? 'bg-green-500'
						: 'bg-white/10 hover:bg-white/20'}"
				>
					<div class="mb-2 text-3xl">{d.emoji}</div>
					<div class="font-bold">{d.label}</div>
					<div class="text-sm opacity-75">{d.hint}</div>
				</button>
			{/each}
		</div>
	</div>

	<button
		type="button"
		onclick={() => game.backToStart()}
		class="mt-6 w-full rounded-xl bg-white/10 py-3 transition-all hover:bg-white/20"
	>
		← Back
	</button>
</div>
