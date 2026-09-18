<script lang="ts">
	import { game } from '$lib/game.svelte';
</script>

{#if game.showAchievementPopup && game.newAchievements.length > 0}
	<div
		role="status"
		aria-live="polite"
		class="fixed top-4 right-4 z-50 animate-bounce rounded-lg bg-yellow-500 p-4 text-black shadow-lg"
	>
		<p class="font-bold">🎉 Achievement Unlocked!</p>
		{#each game.newAchievements as achievement (achievement.id)}
			<p>{achievement.emoji} {achievement.title}</p>
		{/each}
	</div>
{/if}
