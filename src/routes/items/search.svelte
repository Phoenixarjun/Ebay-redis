<script lang="ts">
	import type { Item } from '$services/types';
	import Card from '$lib/components/card.svelte';
	import { page } from '$app/stores';

	export let results: Item[] = [];
	
	$: term = $page.url.searchParams.get('term') || 'All Items';
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex items-center justify-between mb-8">
		<h1 class="text-3xl font-black text-gray-900 tracking-tight">
			Results for "{term}"
		</h1>
		<p class="text-gray-500 font-medium">
			Found {results.length} items
		</p>
	</div>

	{#if results.length === 0}
		<div class="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
			<h2 class="text-2xl font-bold text-gray-400 mb-2">No items found</h2>
			<p class="text-gray-400">Try adjusting your search terms</p>
		</div>
	{:else}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
			{#each results as item}
				<Card {item} />
			{/each}
		</div>
	{/if}
</div>
