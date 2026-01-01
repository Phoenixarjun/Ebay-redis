<script lang="ts">
	import type { Item } from '$services/types';
	import Card from '$lib/components/card.svelte';
	import Carousel from '$lib/components/carousel.svelte';
	import Button from '$lib/components/button.svelte';
	import Icon from '$lib/components/icon.svelte';

	export let endingSoonest: Item[] = [];
	export let mostViews: Item[] = [];
	export let highestPrice: Item[] = [];
</script>

<div class="space-y-20 pb-20">
	<!-- Hero Section -->
	<section class="relative bg-black py-32 overflow-hidden">
		<div class="absolute inset-0 z-0">
			<div class="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-transparent z-10"></div>
			<!-- Abstract Background Pattern -->
			<div class="absolute right-0 top-0 h-full w-1/2 bg-accent opacity-20 blur-[100px] transform translate-x-1/2"></div>
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
			<div class="max-w-2xl">
				<h1 class="text-6xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-6">
					Discover <br />
					<span class="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-400">Rare Finds.</span>
				</h1>
				<p class="text-xl text-gray-400 mb-8 leading-relaxed max-w-lg">
					The world's most premium marketplace for exclusive collectibles, sneakers, and luxury items. Bid, buy, and sell with confidence.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<a href="/items/search">
						<Button variant="primary" size="lg" className="w-full sm:w-auto">Start Exploring</Button>
					</a>
					<a href="/auth/signup">
						<Button variant="outline" size="lg" className="w-full sm:w-auto">Join Community</Button>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- Features Grid -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
				<div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mb-6 text-accent">
					<Icon name="verified_user" size="24px" />
				</div>
				<h3 class="text-xl font-bold mb-3">Verified Authenticity</h3>
				<p class="text-gray-500 leading-relaxed">Every item is verified by our team of experts to ensure 100% authenticity.</p>
			</div>
			<div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
				<div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6 text-blue-600">
					<Icon name="gavel" size="24px" />
				</div>
				<h3 class="text-xl font-bold mb-3">Secure Bidding</h3>
				<p class="text-gray-500 leading-relaxed">Place bids with confidence using our secure, real-time auction system.</p>
			</div>
			<div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
				<div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-6 text-purple-600">
					<Icon name="local_shipping" size="24px" />
				</div>
				<h3 class="text-xl font-bold mb-3">Global Shipping</h3>
				<p class="text-gray-500 leading-relaxed">We ship worldwide with tracked and insured delivery partners.</p>
			</div>
		</div>
	</section>

	<!-- Main Content Sections -->
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
		<!-- Most Expensive -->
		<section>
			<div class="flex items-end justify-between mb-10">
				<div>
					<h2 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Exclusive Collection</h2>
					<p class="text-gray-500">The most sought-after items on the market right now.</p>
				</div>
				<a href="/items/search?sort=price_desc" class="hidden md:block text-accent font-bold hover:underline">View All</a>
			</div>
			<Carousel>
				{#each highestPrice as item}
					<div class="flex-none w-72 md:w-80">
						<Card {item} />
					</div>
				{/each}
			</Carousel>
		</section>

		<!-- Ending Soonest -->
		<section>
			<div class="flex items-end justify-between mb-10">
				<div>
					<h2 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Ending Soon</h2>
					<p class="text-gray-500">Don't miss out on these auctions ending shortly.</p>
				</div>
				<a href="/items/search?sort=ending_asc" class="hidden md:block text-accent font-bold hover:underline">View All</a>
			</div>
			<Carousel>
				{#each endingSoonest as item}
					<div class="flex-none w-72 md:w-80">
						<Card {item} />
					</div>
				{/each}
			</Carousel>
		</section>

		<!-- Most Views -->
		<section>
			<div class="flex items-end justify-between mb-10">
				<div>
					<h2 class="text-4xl font-black text-gray-900 tracking-tight mb-2">Trending Now</h2>
					<p class="text-gray-500">Items that are getting the most attention.</p>
				</div>
				<a href="/items/search?sort=views_desc" class="hidden md:block text-accent font-bold hover:underline">View All</a>
			</div>
			<Carousel>
				{#each mostViews as item}
					<div class="flex-none w-72 md:w-80">
						<Card {item} showViews />
					</div>
				{/each}
			</Carousel>
		</section>
	</div>

	<!-- CTA Section -->
	<section class="bg-primary text-white py-24">
		<div class="max-w-4xl mx-auto text-center px-4">
			<h2 class="text-5xl font-black tracking-tight mb-6">Ready to Start Selling?</h2>
			<p class="text-xl text-gray-400 mb-10">Join thousands of sellers and reach a global audience of collectors and enthusiasts.</p>
			<a href="/dashboard/items/new">
				<Button variant="primary" size="lg">List an Item Now</Button>
			</a>
		</div>
	</section>
</div>
