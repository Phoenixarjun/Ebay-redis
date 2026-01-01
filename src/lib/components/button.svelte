<script lang="ts">
	import c from 'classnames';

	export let variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let loading = false;
	export let icon = '';
	export let disabled = false;
	export let className = '';
	// Backward compatibility mapping
	export let role: string | undefined = undefined;
	export let type: 'button' | 'submit' | 'reset' = 'button';

	$: finalVariant = role === 'secondary' ? 'outline' : role === 'danger' ? 'danger' : variant;

	const baseClasses = 'inline-flex items-center justify-center font-bold tracking-wide transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed rounded-full';

	const variantClasses = {
		primary: 'bg-accent hover:bg-accent-hover text-white focus:ring-accent shadow-lg shadow-accent/20 hover:shadow-accent/40',
		secondary: 'bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500',
		outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary',
		ghost: 'bg-transparent text-gray-600 hover:text-primary hover:bg-gray-100 focus:ring-gray-500',
		danger: 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 shadow-lg shadow-red-500/20'
	};

	const sizeClasses = {
		sm: 'text-xs px-3 py-1.5',
		md: 'text-sm px-5 py-2.5',
		lg: 'text-base px-8 py-3'
	};
</script>

<button
	{type}
	class={c(baseClasses, variantClasses[finalVariant], sizeClasses[size], className)}
	disabled={disabled || loading}
	on:click
>
	{#if loading}
		<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
			<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	{:else if icon}
		<span class="material-icons mr-2 text-lg">{icon}</span>
	{/if}
	<slot />
</button>
