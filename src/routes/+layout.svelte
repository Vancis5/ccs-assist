<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const dismiss = () => {
			const curtain = document.getElementById('loading-curtain');
			if (curtain && !curtain.classList.contains('loaded')) {
				curtain.classList.add('loaded');
				setTimeout(() => curtain.remove(), 260);
			}
		};

		if (document.documentElement.classList.contains('fonts-loaded')) {
			dismiss();
		} else {
			const interval = setInterval(() => {
				if (document.documentElement.classList.contains('fonts-loaded')) {
					clearInterval(interval);
					dismiss();
				}
			}, 30);
			setTimeout(() => {
				clearInterval(interval);
				dismiss();
			}, 1000);
		}
	});
</script>

{@render children()}

