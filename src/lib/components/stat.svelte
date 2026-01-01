<script lang="ts">
	export let label = '';
	export let value: string | number = '';
	export let bg = 'bg-cyan-500';
</script>

<div class="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
	<p class="text-sm font-medium text-gray-500 mb-1">{label}</p>
	<p class="text-3xl font-black text-gray-900 tracking-tight">{value}</p>
</div>
