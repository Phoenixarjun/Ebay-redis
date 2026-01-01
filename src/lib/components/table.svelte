<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Icon from '$lib/components/icon.svelte';

	const dispatch = createEventDispatcher();

	interface ColumnConfig {
		id?: string;
		formatter?: (val: any) => string | number;
		component?: any;
		field?: string;
		label: string;
		sortable?: boolean;
		props?: (val: any) => any;
	}

	interface Sort {
		page: number;
		perPage: number;
		sortBy: string;
		direction: string;
	}

	export let columns: ColumnConfig[] = [];
	export let items: any[] = [];
	export let totalPages = 0;

	export let sort: Sort;

	const directions = ['', 'DESC', 'ASC'];
	function onHeaderClick(field: string) {
		if (sort.sortBy !== field) {
			dispatch('change', { ...sort, sortBy: field, direction: directions[1] });
			return;
		}

		let index = directions.indexOf(sort.direction) + 1;
		if (index > 2) {
			index = 0;
		}
		dispatch('change', { ...sort, sortBy: field, direction: directions[index] });
	}

	function onChangePage(index: number) {
		if (index < 0 || index >= totalPages) {
			return;
		}
		dispatch('change', { ...sort, page: index });
	}
</script>

<table class="w-full text-left border-collapse">
	<thead class="bg-gray-50 border-b border-gray-200">
		<tr>
			{#each columns as column}
				<th
					class:cursor-pointer={column.sortable}
					class="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-gray-700 transition-colors"
					on:click={() => column.sortable && onHeaderClick(column.id || column.field)}
				>
					<div class="flex items-center gap-1">
						{column.label}
						{#if (sort.sortBy === column.field || sort.sortBy === column.id) && sort.direction !== ''}
							<Icon name={sort.direction === 'ASC' ? 'arrow_upward' : 'arrow_downward'} size="14px" />
						{/if}
					</div>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody class="divide-y divide-gray-100 bg-white">
		{#each items as item}
			<tr class="hover:bg-gray-50 transition-colors">
				{#each columns as column}
					<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
						{#if column.component}
							<svelte:component
								this={column.component}
								{...column.props ? column.props(item) : {}}
							/>
						{:else if column.formatter}
							{column.formatter(item)}
						{:else}
							{item[column.field]}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<div class="px-6 py-4 border-t border-gray-200 bg-white rounded-b-xl flex items-center justify-between">
	<div class="flex items-center gap-2">
		<button
			type="button"
			class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			disabled={sort.page === 0}
			on:click={() => onChangePage(sort.page - 1)}
		>
			<Icon name="chevron_left" />
		</button>

		<div class="flex items-center gap-1">
			{#each Array(totalPages).fill(0).map((_, i) => i) as index}
				<button
					type="button"
					class="w-8 h-8 rounded-lg text-sm font-medium transition-colors {index === sort.page ? 'bg-black text-white' : 'text-gray-500 hover:bg-gray-100'}"
					on:click={() => onChangePage(index)}
				>
					{index + 1}
				</button>
			{/each}
		</div>

		<button
			type="button"
			class="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
			disabled={sort.page >= totalPages - 1}
			on:click={() => onChangePage(sort.page + 1)}
		>
			<Icon name="chevron_right" />
		</button>
	</div>
</div>
