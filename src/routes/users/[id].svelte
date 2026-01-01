<script lang="ts">
	import Card from '$lib/components/card.svelte';
	import Icon from '$lib/components/icon.svelte';
	
	export let username = '';
	export let sharedItems: any[] = [];
	export let likedItems: any[] = [];
</script>

<div class="bg-black py-20 text-white mb-12">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
		<div class="w-24 h-24 bg-gray-800 rounded-full mx-auto flex items-center justify-center mb-6 text-4xl font-bold border-4 border-gray-700">
			{username.charAt(0).toUpperCase()}
		</div>
		<h1 class="text-4xl font-black tracking-tight mb-2">@{username}</h1>
		<div class="text-gray-400 flex items-center justify-center gap-2">
			<Icon name="verified" size="20px" klass="text-accent" />
			<span>Verified Member</span>
		</div>
	</div>
</div>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 space-y-20">
	{#if sharedItems.length > 0}
		<section>
			<div class="flex items-center gap-2 mb-8">
				<Icon name="favorite" klass="text-red-500" />
				<h2 class="text-2xl font-bold text-gray-900">Items You Both Like</h2>
			</div>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each sharedItems as item}
					<Card {item} />
				{/each}
			</div>
		</section>
	{/if}

	<section>
		<div class="flex items-center gap-2 mb-8">
			<Icon name="collections_bookmark" klass="text-gray-400" />
			<h2 class="text-2xl font-bold text-gray-900">{username}'s Favorites</h2>
		</div>
		{#if likedItems.length === 0}
			<p class="text-gray-500 italic">This user hasn't liked any items yet.</p>
		{:else}
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each likedItems as item}
					<Card {item} />
				{/each}
			</div>
		{/if}
	</section>
</div>
