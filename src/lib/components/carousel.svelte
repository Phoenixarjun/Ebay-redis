<script lang="ts">
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';
	import { browser } from '$app/env';
	import Icon from '$lib/components/icon.svelte';

	let container: HTMLDivElement = null;
	let scroller: HTMLDivElement = null;

	let scrollBy = 300;
	if (browser) {
		scrollBy = window.innerWidth / 2;
	}

	const offset = tweened(0, {
		duration: 400,
		easing: cubicOut
	});

	function goLeft() {
		if ($offset - scrollBy > 0) {
			offset.set($offset - scrollBy);
		} else {
			offset.set(0);
		}
	}

	function goRight() {
		const { width } = container.getBoundingClientRect();
		const { scrollWidth: scrollerWidth } = scroller;

		if ($offset + scrollBy > scrollerWidth - width) {
			offset.set(scrollerWidth - width);
		} else {
			offset.set($offset + scrollBy);
		}
	}
</script>

<div class="relative w-full group">
	<div class="absolute inset-y-0 left-0 z-10 flex items-center">
		<button
			on:click={goLeft}
			class="ml-2 p-3 bg-white/80 hover:bg-white backdrop-blur-md shadow-lg rounded-full text-primary hover:text-accent focus:outline-none transform transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
		>
			<Icon name="arrow_back" size="24px" />
		</button>
	</div>
	
	<div class="overflow-hidden relative rounded-2xl" bind:this={container}>
		<div class="flex relative min-h-[200px] gap-6 px-4 py-6" style:right={$offset + 'px'} bind:this={scroller}>
			<slot />
		</div>
	</div>

	<div class="absolute inset-y-0 right-0 z-10 flex items-center">
		<button
			on:click={goRight}
			class="mr-2 p-3 bg-white/80 hover:bg-white backdrop-blur-md shadow-lg rounded-full text-primary hover:text-accent focus:outline-none transform transition-all duration-200 hover:scale-110 opacity-0 group-hover:opacity-100"
		>
			<Icon name="arrow_forward" size="24px" />
		</button>
	</div>
</div>
