<script lang="ts">
	import { Chart } from 'chart.js';

	type Bid = { createdAt: string; amount: number };

	export let bidHistory: Bid[] = [];
	let canvas: HTMLCanvasElement | null = null;
	let chart: any;

	$: context = bidHistory && canvas && canvas.getContext('2d');
	$: createChart(context);

	function createChart(ctx: RenderingContext) {
		if (!ctx) {
			return;
		}

		const labels = bidHistory.map(() => '');
		const data = bidHistory.map(({ amount }) => amount);

		if (labels.length < 9) {
			labels.unshift('');
			data.unshift(0);
		}

		if (chart) {
			chart.data.labels = labels;
			chart.data.datasets[0].data = data;
			chart.update();
			return;
		}

		// Premium Chart Config
		chart = new Chart(context, {
			type: 'line',
			options: {
				responsive: true,
				aspectRatio: 3, // Make it a bit taller
				plugins: {
					legend: { display: false },
					tooltip: {
						backgroundColor: '#000',
						titleColor: '#fff',
						bodyColor: '#fff',
						padding: 10,
						cornerRadius: 8,
						displayColors: false
					}
				},
				interaction: {
					intersect: false,
					mode: 'index'
				},
				scales: {
					x: {
						grid: { display: false },
						border: { display: false }
					},
					y: {
						grid: {
							color: '#f3f4f6',
							borderDash: [5, 5] // Dashed grid lines
						},
						border: { display: false },
						ticks: {
							callback: (value) => '$' + value
						}
					}
				},
				elements: {
					line: {
						tension: 0.4, // Smooth curves
						borderWidth: 3
					},
					point: {
						radius: 0, // Hide points by default
						hoverRadius: 6,
						backgroundColor: '#FF4500' // Accent color
					}
				}
			},
			data: {
				labels: labels,
				datasets: [
					{
						label: 'Current Bid',
						data: data,
						borderColor: '#FF4500', // Accent
						backgroundColor: (context) => {
							const ctx = context.chart.ctx;
							const gradient = ctx.createLinearGradient(0, 0, 0, 400);
							gradient.addColorStop(0, 'rgba(255, 69, 0, 0.2)');
							gradient.addColorStop(1, 'rgba(255, 69, 0, 0)');
							return gradient;
						},
						fill: true
					}
				]
			}
		});
	}
</script>

<div class="relative">
	{#if !bidHistory.length}
		<div class="absolute inset-0 flex justify-center items-center text-3xl text-slate-500">
			No Bids Yet
		</div>
	{/if}
	<canvas bind:this={canvas} />
</div>
