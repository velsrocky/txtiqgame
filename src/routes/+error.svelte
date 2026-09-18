<script lang="ts">
	import { page } from '$app/state';
	import { resolve } from '$app/paths';
</script>

<main
	class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4 text-white"
>
	<div class="max-w-md rounded-3xl bg-white/10 p-8 text-center backdrop-blur-lg">
		<div class="mb-4 text-6xl">{page.status === 404 ? '🧭' : '🤔'}</div>
		<h1 class="mb-2 text-3xl font-bold">
			{page.status === 404 ? 'Page not found' : 'Something went wrong'}
		</h1>
		<p class="mb-6 opacity-80">
			{page.status === 404
				? 'This page wandered off. Let’s get you back to the quiz.'
				: (page.error?.message ?? 'An unexpected error occurred. Please try again.')}
		</p>

		<a
			href={resolve('/')}
			class="inline-block rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-8 py-3 font-bold transition-all hover:scale-105 hover:from-green-600 hover:to-emerald-700"
		>
			← Back to TxtIQ
		</a>
	</div>
</main>
