<script lang="ts">
	import type { Item } from '$services/types';
	import { DateTime } from 'luxon';
	import { page, session } from '$app/stores';
	import { post, del, get } from '$lib/fetch';
	import Chart from '$lib/components/chart.svelte';
	import LikeButton from '$lib/components/like-button.svelte';
	import Card from '$lib/components/card.svelte';
	import Stat from '$lib/components/stat.svelte';
	import Button from '$lib/components/button.svelte';
	import Icon from '$lib/components/icon.svelte';

	export let item: any = null;
	export let userLikes: boolean = false;
	export let history: { createdAt: string; amount: number }[] = [];
	export let similarItems: Item[] = [];
	export let userHasHighBid = false;

	let err = '';
	let amount = '';
	let loading = false;
	let message = '';

	$: err = amount && '';
	$: endingAt =
		typeof item.endingAt === 'object'
			? item.endingAt.toRelative().replace('in ', '')
			: DateTime.fromMillis(item.endingAt).toRelative().replace('in ', '');

	async function onClickLike() {
		if (!$session.userId) {
			return;
		}

		if (userLikes) {
			[{ item }] = await del(`/items/${$page.params.id}/likes`);
			userLikes = false;
		} else {
			[{ item }] = await post(`/items/${$page.params.id}/likes`, {});
			userLikes = true;
		}
	}

	async function onSubmit() {
		const parsed = parseFloat(amount);

		if (isNaN(parsed) || parsed <= 0) {
			err = 'Enter a valid amount';
			return;
		}

		message = '';
		loading = true;

		[, err] = await post(`/items/${$page.params.id}/bids`, { amount: parsed });

		if (err) {
			loading = false;
			return;
		}

		[{ item, userLikes, history, similarItems, userHasHighBid }] = await get(
			`/items/${$page.params.id}`
		);
		amount = '';
		loading = false;
		message = 'Success! You have the winning bid';
	}
</script>

{#if item}
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:items-start">
			<!-- Image Gallery -->
			<div class="flex flex-col gap-6">
				<div class="aspect-w-4 aspect-h-3 bg-gray-100 rounded-3xl overflow-hidden shadow-lg">
					<img alt={item.name} class="w-full h-full object-cover object-center" src={item.imageUrl} />
				</div>
				
				<!-- Bid History Chart -->
				<div class="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
					<h3 class="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
						<Icon name="show_chart" />
						Price History
					</h3>
					<Chart bidHistory={history} />
				</div>
			</div>

			<!-- Product Info -->
			<div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
				<div class="flex justify-between items-start mb-6">
					<h1 class="text-4xl font-black text-gray-900 tracking-tight">{item.name}</h1>
					<LikeButton numLikes={item.likes} {userLikes} on:click={onClickLike} />
				</div>

				<div class="flex items-center gap-4 mb-8">
					<div class="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
						<Icon name="person" size="16px" />
						Seller: <a href={`/users/${item.ownerId}`} class="text-accent hover:underline">@{item.ownerId}</a> <!-- Simplified seller name lookup if needed -->
					</div>
					<div class="flex items-center gap-2 text-sm font-medium text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
						<Icon name="visibility" size="16px" />
						{item.views} views
					</div>
				</div>

				<div class="prose prose-sm text-gray-500 mb-10">
					<p>{item.description}</p>
				</div>

				<div class="grid grid-cols-2 gap-4 mb-10">
					<Stat label="Current Price" value={'$' + item.price.toFixed(2)} />
					<Stat label="Time Left" value={endingAt} />
				</div>

				{#if userHasHighBid}
					<div class="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 text-green-700">
						<Icon name="emoji_events" />
						<span class="font-bold">You currently have the highest bid!</span>
					</div>
				{/if}

				<div class="bg-surface border border-gray-200 rounded-3xl p-8 shadow-sm">
					<h3 class="text-xl font-bold text-gray-900 mb-6">Place a Bid</h3>
					<form on:submit|preventDefault={onSubmit} class="space-y-4">
						<div class="relative">
							<div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
								<span class="text-gray-500 font-bold">$</span>
							</div>
							<input
								bind:value={amount}
								id="amount"
								type="number"
								step="0.01"
								class="block w-full pl-8 pr-12 py-4 text-xl border-gray-200 rounded-xl focus:ring-accent focus:border-accent bg-white shadow-sm"
								placeholder={`${(item.price + 0.01).toFixed(2)}+`}
							/>
						</div>

						{#if err}
							<p class="text-red-500 text-sm font-medium animate-pulse">{err}</p>
						{/if}

						{#if message}
							<p class="text-green-500 text-sm font-medium">{message}</p>
						{/if}

						<Button type="submit" variant="primary" size="lg" className="w-full" {loading}>
							Place Bid
						</Button>
						<p class="text-xs text-center text-gray-400 mt-2">
							By placing a bid, you agree to our Terms of Use.
						</p>
					</form>
				</div>
			</div>
		</div>

		<!-- Similar Items -->
		<div class="mt-24 border-t border-gray-100 pt-16">
			<h2 class="text-3xl font-black text-gray-900 mb-10">You May Also Like</h2>
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
				{#each similarItems as item}
					<Card {item} />
				{/each}
			</div>
		</div>
	</div>
{/if}
