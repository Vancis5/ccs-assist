<script lang="ts">
	import { RotateCcw, Sparkles } from 'lucide-svelte';

	let { onReset }: { onReset: () => void } = $props();
</script>

<header class="w-full bg-[#14151a]/95 backdrop-blur-md border-b border-white/10 px-4 py-3 sticky top-0 z-20 transition-all">
	<div class="max-w-4xl mx-auto flex items-center justify-between">
		<div class="flex items-center gap-3">
			<!-- Brand Badge -->
			<div class="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#FA4615] to-[#C23811] text-white shadow-lg shadow-[#FA4615]/20 font-bold tracking-tight text-sm">
				CCS
				<span class="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
					<span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#147A0D] opacity-75"></span>
					<span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#147A0D]"></span>
				</span>
			</div>

			<div>
				<div class="flex items-center gap-2">
					<h1 class="font-bold text-white text-base tracking-wide flex items-center gap-1.5">
						CCS Assist
						<Sparkles class="w-3.5 h-3.5 text-[#FA4615]" />
					</h1>
					<span class="text-[10px] font-medium tracking-wider uppercase px-1.5 py-0.5 rounded bg-[#FA4615]/15 text-[#FA4615] border border-[#FA4615]/30">
						Official
					</span>
				</div>
				<p class="text-xs text-zinc-400">Saint Joseph College • College of Computer Studies</p>
			</div>
		</div>

		<div class="flex items-center gap-2">
			<button
				type="button"
				onclick={onReset}
				class="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-zinc-800/60 hover:bg-zinc-800 border border-white/5 transition-colors cursor-pointer"
				title="Start new conversation"
			>
				<RotateCcw class="w-3.5 h-3.5" />
				<span class="hidden sm:inline">New Chat</span>
			</button>
		</div>
	</div>
</header>
