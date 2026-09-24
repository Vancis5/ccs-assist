<script lang="ts">
	import { GraduationCap, Award, MapPin, Monitor, ArrowUpRight } from 'lucide-svelte';

	let { onSelect }: { onSelect: (prompt: string) => void } = $props();

	const prompts = [
		{
			tag: 'Academics',
			title: 'Academic Programs & Degrees',
			desc: 'BSCS, BSIT, and ACT specializations & careers',
			query: 'What programs are offered by the College of Computer Studies?',
			icon: GraduationCap
		},
		{
			tag: 'Policy',
			title: 'Retention & Grading Standards',
			desc: 'Required GPAs and major subject passing marks',
			query: 'What are the retention policies and grade requirements for CCS students?',
			icon: Award
		},
		{
			tag: 'Directory',
			title: "Dean's Office & Schedule",
			desc: 'Office hours, building floor, and consultations',
			query: "Where is the CCS Dean's office located and what are the office hours?",
			icon: MapPin
		},
		{
			tag: 'Campus',
			title: 'Computer Lab Guidelines',
			desc: 'CISCO network, software labs, and studio rules',
			query: 'What facilities and computer laboratories are available in CCS?',
			icon: Monitor
		}
	];
</script>

<div class="w-full max-w-2xl mx-auto my-auto px-4 py-8 sm:py-12 flex flex-col items-start text-left">

	<!-- Headline with Google Sans Flex -->
	<h1 class="text-3xl sm:text-4xl font-semibold text-white tracking-tight leading-[1.15]">
		How can I help you with <span class="bg-gradient-to-r from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent">CCS today?</span>
	</h1>

	<p class="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl font-normal leading-relaxed">
		Ask anything regarding the College of Computer Studies — academic programs, retention rules, faculty directory, or lab guidelines.
	</p>

	<!-- Minimal prompt grid -->
	<div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-8 w-full">
		{#each prompts as p}
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

