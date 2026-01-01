<script lang="ts">
	export let numLikes = 0;
	export let userLikes = false;
</script>

<button
	type="button"
	class="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-200 {userLikes ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}"
	on:click
>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		class="w-5 h-5 transition-transform duration-200 {userLikes ? 'fill-current scale-110' : 'fill-none stroke-current stroke-2'}"
		viewBox="0 0 24 24"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
		/>
	</svg>
	<span class="font-medium text-sm">{userLikes ? 'Liked' : 'Like'}</span>
	<span class="text-xs font-normal opacity-75 border-l pl-2 ml-1 border-current opacity-40">{numLikes}</span>
</button>
