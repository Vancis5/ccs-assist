<script lang="ts">
	import { ArrowUpRight, Shuffle } from 'lucide-svelte';
	import { getRandomStarterSuggestions, getStarterSuggestions, type StarterPrompt } from '$lib/data/ccsKnowledge';
	import type { Greeting } from '$lib/data/greetings';

	let {
		onSelect,
		greeting,
		isInputFocused = false
	}: {
		onSelect: (prompt: string) => void;
		greeting: Greeting;
		isInputFocused?: boolean;
	} = $props();

	let prompts = $state<StarterPrompt[]>(getStarterSuggestions().slice(0, 4));
	let isShuffling = $state(false);
	let generation = $state(0);

	function shuffle() {
		if (isShuffling) return;
		isShuffling = true;

		// Staggered exit completes in ~280ms (4 cards * 40ms + 160ms exit duration)
		setTimeout(() => {
			prompts = getRandomStarterSuggestions(4);
			generation++;
			isShuffling = false;
		}, 280);
	}
</script>

<div class="intro-container w-full max-w-2xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-start text-left">
	<!-- Headline with Google Sans Flex -->
	<h1 class="intro-title text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
		{greeting.title} <span class="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">{greeting.highlight}</span>
	</h1>

	<p class="intro-subtitle mt-3 text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
		{greeting.subtitle}
	</p>

	<!-- Suggestions Section (animated collapse on mobile keyboard focus) -->
	<div class="prompts-collapse-wrapper w-full overflow-hidden {isInputFocused ? 'prompts-collapsed' : ''}">
		<!-- Suggestions header with shuffle button -->
		<div class="intro-header flex items-center justify-between w-full mt-8 mb-2.5">
			<span class="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
				Suggested prompts
			</span>
			<button
				type="button"
				onclick={shuffle}
				disabled={isShuffling}
				class="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer group px-2 py-1 rounded-md hover:bg-white/[0.04] disabled:opacity-50"
				title="Get different suggestions"
			>
				<Shuffle class="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FA4615] transition-all group-active:rotate-180 {isShuffling ? 'rotate-180' : ''}" />
				<span>Shuffle</span>
			</button>
		</div>

		<!-- Minimal prompt grid -->
		<div class="intro-grid grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
			{#each prompts as p, i (`${generation}-${p.query}`)}
				<button
					type="button"
					onclick={() => onSelect(p.query)}
					style="--enter-delay: {140 + i * 55}ms; --exit-delay: {i * 45}ms;"
					class="intro-card group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-[#FA4615]/40 transition-all duration-200 cursor-pointer text-left active:scale-[0.99] {isShuffling ? 'is-exiting' : 'is-entering'} {i >= 2 ? 'hidden sm:flex' : ''}"
				>
					<div class="flex items-center justify-between w-full mb-3">
						<span class="text-[10px] font-medium uppercase tracking-wider text-zinc-400 group-hover:text-[#FA4615] transition-colors">
							{p.tag}
						</span>
						<ArrowUpRight class="w-3.5 h-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
					</div>

					<div>
						<h2 class="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors leading-snug">
							{p.title}
						</h2>
						<p class="text-xs text-zinc-400 mt-1 line-clamp-1">
							{p.desc}
						</p>
					</div>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	@keyframes welcomeSlideUp {
		from {
			opacity: 0;
			transform: translate3d(0, 16px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes cardStaggerEnter {
		from {
			opacity: 0;
			transform: translate3d(0, 14px, 0) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0) scale(1);
		}
	}

	@keyframes cardStaggerExit {
		from {
			opacity: 1;
			transform: translate3d(0, 0, 0) scale(1);
		}
		to {
			opacity: 0;
			transform: translate3d(0, -10px, 0) scale(0.97);
		}
	}

	.intro-title {
		animation: welcomeSlideUp 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: 80ms;
		will-change: transform, opacity;
	}

	.intro-subtitle {
		animation: welcomeSlideUp 650ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: 160ms;
		will-change: transform, opacity;
	}

	.intro-header {
		animation: welcomeSlideUp 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: 240ms;
		will-change: transform, opacity;
	}

	.intro-card {
		will-change: transform, opacity;
	}

	.intro-card.is-entering {
		animation: cardStaggerEnter 500ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: var(--enter-delay, 0ms);
	}

	.intro-card.is-exiting {
		animation: cardStaggerExit 200ms cubic-bezier(0.4, 0, 1, 1) both;
		animation-delay: var(--exit-delay, 0ms);
		pointer-events: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.intro-title,
		.intro-subtitle,
		.intro-header,
		.intro-card,
		.intro-card.is-entering,
		.intro-card.is-exiting,
		.prompts-collapse-wrapper {
			animation: none !important;
			transition: none !important;
		}
	}

	.prompts-collapse-wrapper {
		display: grid;
		grid-template-rows: 1fr;
		opacity: 1;
		transition:
			grid-template-rows 300ms cubic-bezier(0.16, 1, 0.3, 1),
			opacity 220ms ease,
			transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
		will-change: grid-template-rows, opacity, transform;
	}

	.prompts-collapse-wrapper > * {
		min-height: 0;
	}

	@media (max-width: 639px) {
		.prompts-collapse-wrapper.prompts-collapsed {
			grid-template-rows: 0fr;
			opacity: 0;
			transform: translateY(-8px);
			pointer-events: none;
		}
	}
</style>

