<script lang="ts">
	import { game } from '$lib/game.svelte';
</script>

<div class="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-lg">
	<div class="mb-8">
		<p class="mb-4 text-lg">Challenge your mind with logic, verbal, and math puzzles!</p>
		<p class="text-sm opacity-75">Answer 10 questions and discover your IQ score</p>
	</div>

	<div class="space-y-4">
		<button
			type="button"
			onclick={() => (game.gameState = 'selectMode')}
			class="w-full transform rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:from-green-600 hover:to-emerald-700"
		>
			🎮 Start New Game
		</button>

		<button
			type="button"
			onclick={() => game.viewLeaderboard()}
			class="w-full transform rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 px-8 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:from-yellow-600 hover:to-orange-700"
		>
			🏆 Leaderboard
		</button>

		<button
			type="button"
			onclick={() => game.viewStats()}
			class="w-full transform rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-4 text-xl font-bold text-white transition-all hover:scale-105 hover:from-blue-600 hover:to-purple-700"
		>
			📊 View Stats
		</button>
	</div>

	<!-- Achievements Preview -->
	<div class="mt-8 border-t border-white/20 pt-8">
		<h3 class="mb-4 text-xl font-bold">
			🏅 Achievements ({game.achievements.filter((a) => a.unlocked).length}/{game.achievements
				.length})
		</h3>
		<div class="grid grid-cols-3 gap-2">
			{#each game.achievements as achievement (achievement.id)}
				<div
					class="rounded-lg bg-white/5 p-2 text-center {achievement.unlocked ? '' : 'opacity-30'}"
				>
					<div class="mb-1 text-3xl">{achievement.emoji}</div>
					<div class="text-xs">{achievement.title}</div>
				</div>
			{/each}
		</div>
	</div>
</div>
