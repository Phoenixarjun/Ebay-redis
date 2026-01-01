<script>
	import { post } from '$lib/fetch';
	import { goto } from '$app/navigation';
	import { session, page } from '$app/stores';
	import { f } from '$lib/fetch';
	import Button from '$lib/components/button.svelte';
	import Search from '$lib/components/search.svelte';

	async function onClick() {
		await post('/auth/signout');
		const [data] = await f('/sessions');
		session.set(data);
		goto('/');
	}

	$: isAuthPage = $page.url.pathname.startsWith('/auth');
</script>

<header class="sticky top-0 z-50 w-full bg-primary/90 backdrop-blur-md border-b border-white/10 shadow-lg transition-all duration-300">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<div class="flex-shrink-0">
				<a href="/" class="flex items-center gap-2 group">
					<span class="text-2xl font-black text-white tracking-tight group-hover:text-accent transition-colors">
						RBay<span class="text-accent">.</span>
					</span>
				</a>
			</div>

			{#if !isAuthPage}
				<!-- Search Bar (Desktop) -->
				<div class="hidden md:block flex-1 max-w-lg mx-8">
					<Search />
				</div>

				<!-- Navigation -->
				<div class="flex items-center gap-4">
					{#if $session && $session.userId}
						<span class="text-sm font-medium text-gray-300 hidden lg:block">Welcome, <span class="text-white">{$session.username}</span></span>
						<div class="flex items-center gap-3">
							<a href="/dashboard/items/new">
								<Button variant="primary" size="sm">Add Items</Button>
							</a>
							<a href="/dashboard/items">
								<Button variant="ghost" size="sm" className="text-gray-300 hover:text-white hover:bg-white/10">Dashboard</Button>
							</a>
							<Button variant="ghost" size="sm" className="text-gray-300 hover:text-white" on:click={onClick}>Logout</Button>
						</div>
					{:else}
						<div class="flex items-center gap-3">
							<a href="/auth/signin">
								<Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">Sign In</Button>
							</a>
							<a href="/auth/signup">
								<Button variant="primary" size="sm">Get Started</Button>
							</a>
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>
</header>
