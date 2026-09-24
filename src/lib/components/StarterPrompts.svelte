<script lang="ts">
	import { onMount } from 'svelte';
	import { ArrowUpRight, Shuffle } from 'lucide-svelte';
	import { getRandomStarterSuggestions, getStarterSuggestions, type StarterPrompt } from '$lib/data/ccsKnowledge';

	let { onSelect }: { onSelect: (prompt: string) => void } = $props();

	let prompts = $state<StarterPrompt[]>(getStarterSuggestions().slice(0, 4));

	function shuffle() {
		prompts = getRandomStarterSuggestions(4);
	}

	onMount(() => {
		shuffle();
	});
</script>

<div class="w-full max-w-2xl mx-auto my-auto px-4 py-8 sm:py-12 flex flex-col items-start text-left">
	<!-- Headline with Google Sans Flex -->
	<h1 class="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
		How can I help you with <span class="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">CCS today?</span>
	</h1>

	<p class="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
		Ask anything regarding the College of Computer Studies — academic programs, retention rules, faculty directory, or lab guidelines.
	</p>

	<!-- Suggestions header with shuffle button -->
	<div class="flex items-center justify-between w-full mt-8 mb-2.5">
		<span class="text-[11px] font-medium uppercase tracking-wider text-zinc-500">
			Suggested prompts
		</span>
		<button
			type="button"
			onclick={shuffle}
			class="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer group px-2 py-1 rounded-md hover:bg-white/[0.04]"
			title="Get different suggestions"
		>
			<Shuffle class="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#FA4615] transition-all group-active:rotate-180" />
			<span>Shuffle</span>
		</button>
	</div>

	<!-- Minimal prompt grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
		{#each prompts as p (p.query)}
			<button
				type="button"
				onclick={() => onSelect(p.query)}
				class="group relative flex flex-col justify-between p-3.5 sm:p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.07] hover:border-[#FA4615]/40 transition-all duration-200 cursor-pointer text-left active:scale-[0.99]"
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

