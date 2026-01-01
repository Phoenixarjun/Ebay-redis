<script lang="ts">
	import { DateTime } from 'luxon';
	import Button from '$lib/components/button.svelte';

	export let showViews = false;
	export let item: any;

	$: endingAt =
		typeof item.endingAt === 'number'
			? DateTime.fromMillis(item.endingAt).toRelative()
			: item.endingAt.toRelative();
</script>

<div class="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
	<!-- Image Container -->
	<div class="aspect-w-4 aspect-h-3 bg-gray-200 overflow-hidden relative">
		<img
			src={item.imageUrl}
			alt={item.name}
			class="w-full h-48 object-cover object-center transform group-hover:scale-110 transition-transform duration-500"
		/>
		<div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
			<a href={`/items/${item.id}`} class="w-full">
				<Button variant="primary" className="w-full">View Details</Button>
			</a>
		</div>
	</div>

	<!-- Content -->
	<div class="p-5 space-y-3">
		<div class="flex justify-between items-start">
			<h3 class="text-lg font-bold text-gray-900 group-hover:text-accent transition-colors line-clamp-1">
				<a href={`/items/${item.id}`}>
					{item.name}
				</a>
			</h3>
		</div>
		
		<div class="flex items-baseline justify-between">
			<span class="text-xl font-black text-gray-900">${item.price.toFixed(2)}</span>
			<span class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{endingAt}</span>
		</div>

		{#if showViews}
			<div class="pt-2 border-t border-gray-50 flex items-center text-xs text-gray-500">
				<span class="material-icons text-base mr-1">visibility</span>
				{item.views} views
			</div>
		{/if}
	</div>
</div>
