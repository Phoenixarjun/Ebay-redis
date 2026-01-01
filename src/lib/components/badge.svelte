<script lang="ts">
	export let role: 'success' | 'secondary' | 'danger' | 'warning' | 'info' = 'success';

	const colorClasses = {
		success: 'bg-green-100 text-green-800 border-green-200',
		secondary: 'bg-gray-100 text-gray-800 border-gray-200',
		danger: 'bg-red-100 text-red-800 border-red-200',
		warning: 'bg-orange-100 text-orange-800 border-orange-200',
		info: 'bg-blue-100 text-blue-800 border-blue-200'
	};
</script>

<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border {colorClasses[role]}">
	<slot />
</span>
