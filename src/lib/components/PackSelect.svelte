<script lang="ts">
	import { game } from '$lib/game.svelte';
	import { packs } from '$lib/packs';
</script>

<div class="rounded-3xl bg-white/10 p-8 backdrop-blur-lg">
	<h2 class="mb-6 text-center text-3xl font-bold">Choose Question Pack</h2>

	<div class="grid gap-4">
		{#each packs as pack (pack.id)}
			{@const isLocked = !game.progress.unlockedPacks.includes(pack.id)}
			<button
				type="button"
				onclick={() => !isLocked && game.selectPack(pack.id)}
				disabled={isLocked}
				aria-disabled={isLocked}
				class="transform rounded-xl p-6 text-left transition-all {isLocked
					? 'cursor-not-allowed bg-white/5 opacity-50'
					: 'bg-gradient-to-r from-purple-500 to-pink-600 hover:scale-105 hover:from-purple-600 hover:to-pink-700'}"
			>
				<div class="mb-2 flex items-center justify-between">
					<h3 class="text-2xl font-bold">{pack.emoji} {pack.name}</h3>
					{#if isLocked}
						<span class="rounded-full bg-red-500 px-3 py-1 text-sm">🔒 Locked</span>
					{/if}
				</div>
				<p class="opacity-80">{pack.description}</p>
				{#if isLocked}
					<p class="mt-2 text-sm text-yellow-300">
						Unlock after {pack.unlockRequirement} games ({game.progress.gamesPlayed}/
						{pack.unlockRequirement})
					</p>
				{/if}
			</button>
		{/each}
	</div>

	<button
		type="button"
		onclick={() => game.backToModeSelect()}
		class="mt-6 w-full rounded-xl bg-white/10 py-3 transition-all hover:bg-white/20"
	>
		← Back
	</button>
</div>
