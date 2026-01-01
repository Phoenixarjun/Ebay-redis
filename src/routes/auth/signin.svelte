<script lang="ts">
	import { goto } from '$app/navigation';
	import { post, f } from '$lib/fetch';
	import { session } from '$app/stores';
	import Button from '$lib/components/button.svelte';

	let username = '';
	let password = '';
	let err = null;
	let loading = false;

	async function onSubmit() {
		loading = true;
		let _data: any;
		[_data, err] = await post('/auth/signin', { username, password });

		if (err) {
			loading = false;
			return;
		}

		const [data] = await f('/sessions');
		session.set(data);

		goto('/dashboard/items');
	}
</script>

<div class="min-h-[calc(100vh-4rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-surface">
	<div class="max-w-md w-full space-y-8 bg-white p-10 rounded-3xl shadow-2xl border border-gray-100">
		<div class="text-center">
			<h2 class="mt-6 text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
			<p class="mt-2 text-sm text-gray-600">
				Sign in to access your dashboard
			</p>
		</div>

		<form class="mt-8 space-y-6" on:submit|preventDefault={onSubmit}>
			<input type="hidden" name="remember" value="true" />
			<div class="space-y-4">
				<div>
					<label for="username" class="sr-only">Username</label>
					<input
						id="username"
						name="username"
						type="text"
						required
						class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm bg-gray-50"
						placeholder="Username"
						bind:value={username}
					/>
				</div>
				<div>
					<label for="password" class="sr-only">Password</label>
					<input
						id="password"
						name="password"
						type="password"
						required
						class="appearance-none rounded-xl relative block w-full px-4 py-3 border border-gray-200 placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent focus:z-10 sm:text-sm bg-gray-50"
						placeholder="Password"
						bind:value={password}
					/>
				</div>
			</div>

			{#if err}
				<div class="rounded-lg bg-red-50 p-4">
					<div class="flex">
						<div class="ml-3">
							<h3 class="text-sm font-medium text-red-800">Login Failed</h3>
							<div class="mt-2 text-sm text-red-700">
								<p>{err}</p>
							</div>
						</div>
					</div>
				</div>
			{/if}

			<div>
				<Button type="submit" variant="primary" size="lg" className="w-full" {loading}>
					Sign In
				</Button>
			</div>

			<div class="text-center text-sm">
				<p class="text-gray-600">
					Don't have an account?
					<a href="/auth/signup" class="font-medium text-accent hover:text-accent-hover transition-colors">
						Sign up now
					</a>
				</p>
			</div>
		</form>
	</div>
</div>
