<script lang="ts">
	import { game } from '$lib/game.svelte';
</script>

<div class="rounded-3xl bg-white/10 p-8 text-center backdrop-blur-lg">
	<h2 class="mb-6 text-4xl font-bold">🎉 Game Complete!</h2>

	<div class="mb-8 grid grid-cols-2 gap-4">
		<div class="rounded-xl bg-white/10 p-6">
			<div class="text-4xl font-bold text-yellow-400">{game.finalScore}</div>
			<div class="text-sm opacity-75">Final Score</div>
		</div>
		<div class="rounded-xl bg-white/10 p-6">
			<div class="text-4xl font-bold text-green-400">{game.finalIQ}</div>
			<div class="text-sm opacity-75">IQ Score</div>
		</div>
	</div>

	<div class="mb-6 rounded-xl bg-white/5 p-4">
		<div class="mb-2 text-sm opacity-75">Your Performance</div>
		<div class="mb-3 text-xl">
			{game.correctCount}/{game.questions.length} Correct • Max Streak: {game.maxStreak} 🔥
		</div>
		<div class="space-y-1 text-sm">
			<div class="flex justify-between">
				<span>✅ Correct answers</span>
				<span class="font-bold">{game.basePoints} pts</span>
			</div>
			{#if game.streakBonus > 0}
				<div class="flex justify-between">
					<span>🔥 Streak bonus</span>
					<span class="font-bold">+{game.streakBonus}</span>
				</div>
			{/if}
			<div class="flex justify-between">
				<span>⏱️ Time bonus</span>
				<span class="font-bold">+{game.timeBonus}</span>
			</div>
		</div>
	</div>

	{#if game.showNameEntry}
		<div class="mb-6">
			<input
				type="text"
				bind:value={game.playerName}
				placeholder="Enter your name for leaderboard"
				class="w-full rounded-xl border-2 border-white/20 bg-white/10 p-4 outline-none focus:border-white/40"
				maxlength="20"
			/>
			<button
				type="button"
				onclick={() => game.submitToLeaderboard()}
				disabled={!game.playerName.trim()}
				class="mt-3 w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-3 font-bold transition-all hover:from-yellow-600 hover:to-orange-700 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600"
			>
				Submit to Leaderboard
			</button>
		</div>
	{/if}

	<div class="space-y-3">
		<button
			type="button"
			onclick={() => game.shareScore()}
			class="w-full rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-3 font-bold transition-all hover:from-blue-600 hover:to-purple-700"
		>
			📣 Share My Score
		</button>
		{#if game.shareStatus}
			<p class="text-sm opacity-75">{game.shareStatus}</p>
		{/if}
		<button
			type="button"
			onclick={() => game.viewLeaderboard()}
			class="w-full rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600 px-6 py-3 font-bold transition-all hover:from-yellow-600 hover:to-orange-700"
		>
			🏆 View Leaderboard
		</button>
		<button
			type="button"
			onclick={() => game.backToStart()}
			class="w-full rounded-xl bg-white/10 px-6 py-3 font-bold transition-all hover:bg-white/20"
		>
			← Back to Home
		</button>
	</div>
</div>
