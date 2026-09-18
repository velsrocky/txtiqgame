<script lang="ts">
	import { game } from '$lib/game.svelte';

	// Keyboard controls: 1-4 / A-D answer, Enter submit, H hint, Esc quit
	function handleKey(e: KeyboardEvent) {
		if (game.showExplanation) return;

		const key = e.key.toLowerCase();
		const selectIndex = '1234'.indexOf(key) >= 0 ? '1234'.indexOf(key) : 'abcd'.indexOf(key);

		if (selectIndex >= 0) {
			if (
				selectIndex < game.currentQuestion.options.length &&
				!game.eliminatedOptions.includes(selectIndex)
			) {
				e.preventDefault();
				game.selectAnswer(selectIndex);
			}
			return;
		}

		if (key === 'enter' && game.selectedAnswer !== null) {
			e.preventDefault();
			game.submitAnswer();
		} else if (key === 'h' && game.hintsRemaining > 0 && game.eliminatedOptions.length === 0) {
			e.preventDefault();
			game.useHint();
		} else if (key === 'escape') {
			e.preventDefault();
			game.backToPackSelect();
		}
	}
</script>

<svelte:window onkeydown={handleKey} />

<div class="rounded-3xl bg-white/10 p-8 backdrop-blur-lg">
	<!-- Progress Bar -->
	<div class="mb-6">
		<div class="mb-2 flex items-center justify-between">
			<span>Question {game.currentQuestionIndex + 1}/{game.questions.length}</span>
			<div class="flex items-center gap-3">
				<span>Score: {game.score}</span>
				<button
					type="button"
					onclick={() => game.backToPackSelect()}
					aria-label="Quit game"
					class="rounded-lg bg-white/10 px-3 py-1 text-xs transition-all hover:bg-white/20"
				>
					✕ Quit
				</button>
			</div>
		</div>
		<div class="h-3 w-full rounded-full bg-white/20">
			<div
				class="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500 transition-all"
				style="width: {((game.currentQuestionIndex + 1) / game.questions.length) * 100}%"
			></div>
		</div>
	</div>

	<!-- Stats Row -->
	<div class="mb-6 flex justify-between text-sm">
		<div class="rounded-lg bg-white/10 px-4 py-2">
			⏱️ {game.formatTime(game.timeRemaining)}
		</div>
		<div class="rounded-lg bg-white/10 px-4 py-2">
			🔥 Streak: {game.streak}
		</div>
		<div class="rounded-lg bg-white/10 px-4 py-2">
			💡 Hints: {game.hintsRemaining}
		</div>
	</div>

	<!-- Question -->
	<div class="mb-6 rounded-2xl bg-white/5 p-6">
		<div class="mb-4 text-center text-5xl">{game.currentQuestion.emoji}</div>
		<h3 class="mb-4 text-center text-2xl font-bold">{game.currentQuestion.question}</h3>

		<!-- Answer Options -->
		<div class="mb-4 grid gap-3">
			{#each game.currentQuestion.options as option, index (index)}
				{#if !game.eliminatedOptions.includes(index)}
					<button
						type="button"
						onclick={() => game.selectAnswer(index)}
						disabled={game.showExplanation}
						class="transform rounded-xl p-4 text-left transition-all hover:scale-102 {game.selectedAnswer ===
						index
							? 'bg-blue-500 ring-4 ring-blue-300'
							: 'bg-white/10 hover:bg-white/20'} {game.showExplanation ? 'cursor-not-allowed' : ''}"
					>
						<span class="font-semibold">{String.fromCharCode(65 + index)}.</span>
						{option}
					</button>
				{:else}
					<div class="rounded-xl bg-white/5 p-4 text-left line-through opacity-30">
						<span class="font-semibold">{String.fromCharCode(65 + index)}.</span>
						{option} <span class="text-red-400">✗ Eliminated</span>
					</div>
				{/if}
			{/each}
		</div>

		<!-- Explanation -->
		{#if game.showExplanation}
			<div
				role="status"
				aria-live="polite"
				class="mt-4 rounded-xl p-4 {game.isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'}"
			>
				<p class="mb-2 font-bold">
					{game.isCorrect ? '✅ Correct!' : '❌ Incorrect'}
				</p>
				{#if game.currentQuestion.explanation}
					<p class="text-sm">{game.currentQuestion.explanation}</p>
				{/if}
			</div>
		{/if}
	</div>

	<!-- Action Buttons -->
	<div class="flex gap-3">
		<button
			type="button"
			onclick={() => game.submitAnswer()}
			disabled={game.selectedAnswer === null || game.showExplanation}
			class="flex-1 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-3 font-bold transition-all hover:from-green-600 hover:to-emerald-700 disabled:cursor-not-allowed disabled:from-gray-500 disabled:to-gray-600"
		>
			Submit Answer
		</button>
		<button
			type="button"
			onclick={() => game.useHint()}
			disabled={game.hintsRemaining === 0 ||
				game.showExplanation ||
				game.eliminatedOptions.length > 0}
			class="rounded-xl bg-yellow-500 px-6 py-3 font-bold transition-all hover:bg-yellow-600 disabled:cursor-not-allowed disabled:bg-gray-500"
		>
			💡 Hint ({game.hintsRemaining})
		</button>
		<button
			type="button"
			onclick={() => game.skipQuestion()}
			disabled={game.showExplanation}
			class="rounded-xl bg-white/10 px-6 py-3 transition-all hover:bg-white/20 disabled:cursor-not-allowed"
		>
			Skip
		</button>
	</div>
</div>
