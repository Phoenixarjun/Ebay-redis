<script>
	import Icon from '$lib/components/icon.svelte';
</script>

<footer class="bg-primary text-gray-300 mt-auto border-t border-white/10">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="space-y-4">
				<h3 class="text-2xl font-black text-white tracking-tight">RBay<span class="text-accent">.</span></h3>
				<p class="text-sm text-gray-400">
					The premium marketplace for exclusive items. Experience the future of trading.
				</p>
				<div class="flex space-x-4 pt-2">
					<a href="/" class="text-gray-400 hover:text-accent transition-colors"><Icon name="twitter" /></a>
					<a href="/" class="text-gray-400 hover:text-accent transition-colors"><Icon name="github" /></a>
					<a href="/" class="text-gray-400 hover:text-accent transition-colors"><Icon name="linkedin" /></a>
				</div>
			</div>

			<!-- Links Column 1 -->
			<div>
				<h4 class="text-white font-bold uppercase tracking-wider text-sm mb-4">Platform</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/" class="hover:text-accent transition-colors">Browse</a></li>
					<li><a href="/dashboard/items/new" class="hover:text-accent transition-colors">Sell</a></li>
					<li><a href="/dashboard" class="hover:text-accent transition-colors">Dashboard</a></li>
				</ul>
			</div>

			<!-- Links Column 2 -->
			<div>
				<h4 class="text-white font-bold uppercase tracking-wider text-sm mb-4">Support</h4>
				<ul class="space-y-2 text-sm">
					<li><a href="/privacy" class="hover:text-accent transition-colors">Privacy Policy</a></li>
					<li><a href="/terms" class="hover:text-accent transition-colors">Terms of Service</a></li>
					<li><a href="/about" class="hover:text-accent transition-colors">About Us</a></li>
				</ul>
			</div>

			<!-- Newsletter -->
			<div>
				<h4 class="text-white font-bold uppercase tracking-wider text-sm mb-4">Stay Updated</h4>
				<form class="flex flex-col gap-2">
					<input
						type="email"
						placeholder="Enter your email"
						class="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-white placeholder-gray-500 outline-none text-sm transition-all"
					/>
					<button
						type="submit"
						class="px-4 py-2 bg-accent text-white font-bold rounded-lg hover:bg-accent-hover transition-colors text-sm uppercase tracking-wide"
					>
						Subscribe
					</button>
				</form>
			</div>
		</div>
		<div class="mt-12 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
			&copy; {new Date().getFullYear()} RBay Inc. All rights reserved.
		</div>
	</div>
</footer>
