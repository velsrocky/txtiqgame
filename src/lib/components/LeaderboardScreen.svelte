<script lang="ts">
	import { game } from '$lib/game.svelte';
	import type { Difficulty } from '$lib/types';

	type Filter = 'all' | Difficulty;
	let filter: Filter = $state('all');

	const tabs: { id: Filter; label: string }[] = [
		{ id: 'all', label: 'All' },
		{ id: 'easy', label: 'Easy' },
		{ id: 'medium', label: 'Medium' },
		{ id: 'hard', label: 'Hard' }
	];

	const filtered = $derived(
		filter === 'all' ? game.leaderboard : game.leaderboard.filter((e) => e.difficulty === filter)
	);
</script>

<div class="rounded-3xl bg-white/10 p-8 backdrop-blur-lg">
	<h2 class="mb-6 text-center text-3xl font-bold">🏆 Leaderboard</h2>

	<div class="mb-6 flex justify-center gap-2">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				onclick={() => (filter = tab.id)}
				aria-pressed={filter === tab.id}
				class="rounded-lg px-4 py-1.5 text-sm font-bold transition-all {filter === tab.id
					? 'bg-white/30'
					: 'bg-white/10 hover:bg-white/20'}"
			>
				{tab.label}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="py-8 text-center opacity-75">
			{game.leaderboard.length === 0
				? 'No entries yet. Be the first!'
				: `No ${filter} entries yet.`}
		</p>
	{:else}
		<div class="space-y-3">
			{#each filtered as entry, index (index)}
				<div class="flex items-center justify-between rounded-xl bg-white/5 p-4">
					<div class="flex items-center gap-4">
						<div class="w-8 text-2xl font-bold">
							{index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
						</div>
						<div>
							<div class="font-bold">{entry.name}</div>
							<div class="text-sm opacity-75">
								{entry.difficulty} • {entry.mode === 'daily' ? '📅 Daily' : '🎮 Normal'}
							</div>
						</div>
					</div>
					<div class="text-right">
						<div class="font-bold text-yellow-400">{entry.score} pts</div>
						<div class="text-sm opacity-75">IQ: {entry.iq}</div>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<button
		type="button"
		onclick={() => game.backToStart()}
		class="mt-6 w-full rounded-xl bg-white/10 py-3 transition-all hover:bg-white/20"
	>
		← Back to Home
	</button>
</div>
