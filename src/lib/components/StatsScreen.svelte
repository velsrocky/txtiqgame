<script lang="ts">
	import { game } from '$lib/game.svelte';
	import { packs } from '$lib/packs';
</script>

<div class="rounded-3xl bg-white/10 p-8 backdrop-blur-lg">
	<h2 class="mb-6 text-center text-3xl font-bold">📊 Your Statistics</h2>

	<!-- Summary Stats -->
	<div class="mb-6 grid grid-cols-3 gap-4">
		<div class="rounded-xl bg-white/10 p-4 text-center">
			<div class="text-3xl font-bold text-blue-400">{game.progress.gamesPlayed}</div>
			<div class="text-sm opacity-75">Games Played</div>
		</div>
		<div class="rounded-xl bg-white/10 p-4 text-center">
			<div class="text-3xl font-bold text-green-400">{game.getAverageIQ()}</div>
			<div class="text-sm opacity-75">Avg IQ</div>
		</div>
		<div class="rounded-xl bg-white/10 p-4 text-center">
			<div class="text-3xl font-bold text-yellow-400">{game.getAccuracy()}%</div>
			<div class="text-sm opacity-75">Accuracy</div>
		</div>
	</div>

	<!-- IQ Trend -->
	<div class="mb-6 rounded-xl bg-white/5 p-4 text-center">
		<div class="mb-1 text-sm opacity-75">IQ Trend</div>
		<div class="text-4xl">{game.getIQTrend()}</div>
	</div>

	<!-- Best Scores -->
	<div class="mb-6">
		<h3 class="mb-3 text-xl font-bold">🏅 Best Scores</h3>
		<div class="grid grid-cols-3 gap-3">
			<div class="rounded-xl bg-green-500/20 p-3 text-center">
				<div class="text-sm opacity-75">Easy</div>
				<div class="text-2xl font-bold">{game.progress.bestScores.easy}</div>
			</div>
			<div class="rounded-xl bg-yellow-500/20 p-3 text-center">
				<div class="text-sm opacity-75">Medium</div>
				<div class="text-2xl font-bold">{game.progress.bestScores.medium}</div>
			</div>
			<div class="rounded-xl bg-red-500/20 p-3 text-center">
				<div class="text-sm opacity-75">Hard</div>
				<div class="text-2xl font-bold">{game.progress.bestScores.hard}</div>
			</div>
		</div>
	</div>

	<!-- Pack Breakdown -->
	<div class="mb-6">
		<h3 class="mb-3 text-xl font-bold">📦 Pack Breakdown</h3>
		<div class="space-y-2">
			{#each packs as pack (pack.id)}
				{@const count = game.getPackCount(pack.id)}
				{@const percentage =
					game.progress.gamesPlayed > 0 ? (count / game.progress.gamesPlayed) * 100 : 0}
				<div class="rounded-xl bg-white/5 p-3">
					<div class="mb-1 flex justify-between">
						<span>{pack.emoji} {pack.name}</span>
						<span class="font-bold">{count} games</span>
					</div>
					<div class="h-2 w-full rounded-full bg-white/10">
						<div
							class="h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 transition-all"
							style="width: {percentage}%"
						></div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Recent Games -->
	<div class="mb-6">
		<h3 class="mb-3 text-xl font-bold">🕐 Recent Games</h3>
		<div class="max-h-64 space-y-2 overflow-y-auto">
			{#each game.progress.gameHistory.slice(0, 10) as gameEntry, i (i)}
				<div class="flex items-center justify-between rounded-xl bg-white/5 p-3">
					<div>
						<div class="font-bold">
							{packs.find((p) => p.id === gameEntry.pack)?.emoji}
							{gameEntry.difficulty.charAt(0).toUpperCase() + gameEntry.difficulty.slice(1)}
						</div>
						<div class="text-xs opacity-75">{new Date(gameEntry.date).toLocaleDateString()}</div>
					</div>
					<div class="text-right">
						<div class="font-bold text-yellow-400">{gameEntry.score} pts</div>
						<div class="text-sm">IQ: {gameEntry.iq}</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<!-- Achievements -->
	<div class="mb-6">
		<h3 class="mb-3 text-xl font-bold">
			🏆 Achievements ({game.achievements.filter((a) => a.unlocked).length}/{game.achievements
				.length})
		</h3>
		<div class="grid grid-cols-2 gap-3">
			{#each game.achievements as achievement (achievement.id)}
				<div class="rounded-xl bg-white/5 p-3 {achievement.unlocked ? '' : 'opacity-30'}">
					<div class="mb-1 text-center text-3xl">{achievement.emoji}</div>
					<div class="text-center text-sm font-bold">{achievement.title}</div>
					<div class="text-center text-xs opacity-75">{achievement.description}</div>
				</div>
			{/each}
		</div>
	</div>

	<button
		type="button"
		onclick={() => game.backToStart()}
		class="w-full rounded-xl bg-white/10 py-3 transition-all hover:bg-white/20"
	>
		← Back to Home
	</button>
</div>
