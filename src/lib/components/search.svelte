<script lang="ts">
	import { debounce } from '$lib/util/debounce';
	import { get } from '$lib/fetch';
	import { fade, fly } from 'svelte/transition';

	let term = '';
	let results = [];
	let err = '';
	let loading = false;
	let focused = false;

	const search = debounce(async (searchTerm: string) => {
		loading = true;
		const qs = new URLSearchParams({ term: searchTerm });
		try {
			const [data, error] = await get(`/items/search?${qs.toString()}`);
			if (error) {
				err = error;
				results = [];
			} else {
				results = data.results;
				err = '';
			}
		} catch (e) {
			err = 'Search failed';
		} finally {
			loading = false;
		}

		if (results.length === 0 && !err) {
			err = 'No Results';
		}
	}, 300);

	$: {
		if (term) {
			search(term);
		} else {
			results = [];
			loading = false;
			err = '';
		}
	}
</script>

<svelte:window on:click={() => (focused = false)} />

<div class="relative w-full max-w-xl mx-auto" on:click|stopPropagation={() => (focused = true)}>
	<div class="relative group">
		<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
			<span class="material-icons text-gray-400 group-focus-within:text-accent transition-colors">search</span>
		</div>
		<input
			type="search"
			name="search"
			placeholder="Search for items..."
			class="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-surface text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-200 sm:text-sm shadow-sm"
			bind:value={term}
			autocomplete="off"
		/>
		{#if loading}
			<div class="absolute inset-y-0 right-0 pr-3 flex items-center">
				<svg class="animate-spin h-4 w-4 text-accent" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
				</svg>
			</div>
		{/if}
	</div>

	{#if focused && (results.length || err || loading)}
		<div class="absolute z-50 w-full mt-2 bg-white rounded-xl shadow-2xl ring-1 ring-black ring-opacity-5 overflow-hidden" transition:fly={{ y: 10, duration: 200 }}>
			{#if err && !loading && !results.length}
				<div class="p-4 text-sm text-gray-500 text-center">{err}</div>
			{:else if results.length}
				<ul class="py-1">
					{#each results as item}
						<li>
							<a href={`/items/${item.id}`} class="block px-4 py-3 hover:bg-orange-50 transition-colors group">
								<div class="flex items-center">
									<div class="flex-1 min-w-0">
										<p class="text-sm font-medium text-gray-900 group-hover:text-accent truncate">
											{item.name}
										</p>
										<p class="text-xs text-gray-500 truncate">
											From ${item.startingPrice}
										</p>
									</div>
									<span class="material-icons text-gray-300 group-hover:text-accent transform group-hover:translate-x-1 transition-all text-sm">chevron_right</span>
								</div>
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>
