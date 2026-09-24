<script lang="ts">
	import { GraduationCap, Award, MapPin, Monitor } from 'lucide-svelte';

	let { onSelect }: { onSelect: (prompt: string) => void } = $props();

	const prompts = [
		{
			title: 'Academic Programs',
			description: 'Learn about BSCS, BSIT, and ACT specializations.',
			query: 'What programs are offered by the College of Computer Studies?',
			icon: GraduationCap
		},
		{
			title: 'Retention & Grades',
			description: 'Check required GPAs and major subject passing marks.',
			query: 'What are the retention policies and grade requirements for CCS students?',
			icon: Award
		},
		{
			title: "Dean's Office & Contacts",
			description: 'Office hours, building floor, and consultation schedule.',
			query: "Where is the CCS Dean's office located and what are the office hours?",
			icon: MapPin
		},
		{
			title: 'Laboratory Facilities',
			description: 'CISCO networking, software lab, and multimedia studio guidelines.',
			query: 'What facilities and computer laboratories are available in CCS?',
			icon: Monitor
		}
	];
</script>

<div class="w-full max-w-2xl mx-auto my-auto px-4 py-8 flex flex-col items-center text-center">
	<div class="w-14 h-14 rounded-2xl bg-[#FA4615]/10 border border-[#FA4615]/20 flex items-center justify-center mb-4 text-[#FA4615]">
		<GraduationCap class="w-7 h-7" />
	</div>

	<h2 class="text-2xl font-bold text-white tracking-tight">
		Welcome to <span class="text-[#FA4615]">CCS Assist</span>
	</h2>
	<p class="mt-2 text-sm text-zinc-400 max-w-md">
		Your verified interactive guide for the College of Computer Studies at Saint Joseph College. Ask anything about courses, faculty, or department guidelines!
	</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8 w-full text-left">
		{#each prompts as p}
			<button
				type="button"
				onclick={() => onSelect(p.query)}
				class="group flex items-start gap-3 p-3.5 rounded-xl bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/5 hover:border-[#FA4615]/40 transition-all cursor-pointer text-left shadow-sm hover:shadow-md hover:shadow-[#FA4615]/5"
			>
				<div class="p-2 rounded-lg bg-zinc-800 text-zinc-300 group-hover:text-[#FA4615] group-hover:bg-[#FA4615]/10 transition-colors shrink-0">
					<p.icon class="w-4 h-4" />
				</div>
				<div>
					<h3 class="text-sm font-semibold text-zinc-200 group-hover:text-white transition-colors">
						{p.title}
					</h3>
					<p class="text-xs text-zinc-400 mt-0.5 line-clamp-2">
						{p.description}
					</p>
				</div>
			</button>
		{/each}
	</div>
</div>
