<script lang="ts">
	import { goto } from '$app/navigation';
	import { post } from '$lib/fetch';
	import Button from '$lib/components/button.svelte';

	let name = 'Chair';
	let duration = 60;
	let desc = 'This is a fantastic chair that you would be quite happy with!';
	let data = null;
	let err = null;
	let loading = false;

	async function onSubmit() {
		loading = true;
		[data, err] = await post('/dashboard/items/new', {
			name,
			description: desc,
			duration
		});

		loading = false;
		if (!err) {
			goto(`/items/${data.id}`);
		}
	}
</script>

<div class="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
	<div class="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
		<div class="bg-black px-6 py-8 sm:px-10">
			<h2 class="text-3xl font-black text-white tracking-tight">List New Item</h2>
			<p class="mt-2 text-gray-400">Share your item with the world and start an auction.</p>
		</div>
		
		<div class="px-6 py-8 sm:px-10">
			<form on:submit|preventDefault={onSubmit} class="space-y-6">
				<div>
					<label for="name" class="block text-sm font-bold text-gray-900 mb-2">Item Name</label>
					<input
						bind:value={name}
						id="name"
						required
						minlength="3"
						maxlength="60"
						type="text"
						class="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-accent focus:border-accent bg-gray-50 focus:bg-white transition-colors"
						placeholder="e.g. Vintage Camera"
					/>
				</div>

				<div>
					<label for="desc" class="block text-sm font-bold text-gray-900 mb-2">Description</label>
					<textarea
						bind:value={desc}
						id="desc"
						required
						minlength="3"
						maxlength="600"
						rows="4"
						class="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-accent focus:border-accent bg-gray-50 focus:bg-white transition-colors"
						placeholder="Describe your item in detail..."
					/>
				</div>

				<div>
					<label for="duration" class="block text-sm font-bold text-gray-900 mb-2">Auction Duration</label>
					<div class="relative">
						<select
							bind:value={duration}
							id="duration"
							class="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-accent focus:border-accent bg-gray-50 focus:bg-white appearance-none transition-colors"
						>
							<option value={60}>One Minute (Demo)</option>
							<option value={60 * 10}>Ten Minutes</option>
							<option value={60 * 60 * 24}>One Day</option>
							<option value={60 * 60 * 24 * 7}>One Week</option>
						</select>
						<div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
							<svg class="h-4 w-4 fill-current" viewBox="0 0 20 20">
								<path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
							</svg>
						</div>
					</div>
				</div>

				{#if err}
					<div class="rounded-xl bg-red-50 p-4 border border-red-100">
						<p class="text-sm text-red-700 font-medium text-center">{err}</p>
					</div>
				{/if}

				<div class="pt-4">
					<Button type="submit" variant="primary" size="lg" className="w-full" {loading}>
						Create Listing
					</Button>
				</div>
			</form>
		</div>
	</div>
</div>
