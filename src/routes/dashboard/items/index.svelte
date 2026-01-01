<script lang="ts">
	import { DateTime } from 'luxon';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { browser } from '$app/env';
	import Table from '$lib/components/table.svelte';
	import Link from '$lib/components/link.svelte';
	import Button from '$lib/components/button.svelte';
	import Icon from '$lib/components/icon.svelte';

	interface ItemSummary {
		id: string;
		name: string;
		endingAt: number;
		imageUrl: string;
		price: number;
		bids: number;
		views: number;
		likes: number;
	}

	interface Sort {
		page: number;
		perPage: number;
		sortBy: string;
		direction: string;
		tag: string;
	}

	const parse = (val: string, def: number) => {
		const parsed = parseInt(val);
		if (isNaN(parsed)) {
			return def;
		} else {
			return parsed;
		}
	};

	export let totalPages = 0;
	export let items: ItemSummary[] = [];
	let err = '';
	$: sort = {
		page: parse($page.url.searchParams.get('page'), 0),
		perPage: parse($page.url.searchParams.get('perPage'), 10),
		direction: $page.url.searchParams.get('direction') ?? '',
		sortBy: $page.url.searchParams.get('sortBy') ?? '',
		tag: $page.url.searchParams.get('tag') ?? ''
	};

	function timeLeft(t: number) {
		let _t = typeof t === 'object' ? (t as any).toMillis() : t;
		const endingAt = DateTime.fromMillis(_t);

		if (endingAt < DateTime.now()) {
			return 'Ended';
		} else {
			return endingAt.toRelative().replace('in ', '');
		}
	}

	const columns = [
		{ label: 'Name', field: 'name', sortable: true },
		{ label: 'Price', field: 'price', sortable: true, formatter: (item: any) => '$' + item.price.toFixed(2) },
		{
			field: 'endingAt',
			label: 'Status',
			formatter: (item: ItemSummary) => timeLeft(item.endingAt),
			sortable: true
		},
		{ label: 'Bids', field: 'bids', sortable: true },
		{ label: 'Views', field: 'views', sortable: true },
		{
			label: '',
			component: Link,
			props: (item: ItemSummary) => {
				return { href: `/items/${item.id}`, child: 'View' };
			}
		}
	];

	function updateParams(update: Partial<Sort>) {
		if (!browser) {
			return;
		}

		const params = new URLSearchParams({ ...sort, ...update } as any);
		goto(`/dashboard/items?${params.toString()}`, {
			replaceState: true,
			noscroll: true,
			keepfocus: true
		});
	}

	function onChange(e: any) {
		updateParams(e.detail);
	}
</script>

<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="flex items-center justify-between mb-8">
		<div>
			<h1 class="text-3xl font-black text-gray-900 tracking-tight">Your Listings</h1>
			<p class="text-gray-500 mt-1">Manage all your active and past auctions.</p>
		</div>
		<a href="/dashboard/items/new">
			<Button variant="primary">
				<div class="flex items-center gap-2">
					<Icon name="add" size="20px" />
					<span>Create New Listing</span>
				</div>
			</Button>
		</a>
	</div>

	{#if err}
		<div class="bg-red-50 p-4 rounded-xl text-red-700 font-bold mb-6">{err}</div>
	{/if}

	<Table on:change={onChange} {totalPages} {sort} {items} {columns} />
</div>
