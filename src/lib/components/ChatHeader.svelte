<script lang="ts">
	import { RotateCcw } from 'lucide-svelte';

	let { onReset, hasMessages = false }: { onReset: () => void; hasMessages?: boolean } = $props();
</script>

<header class="fixed top-0 left-0 right-0 z-30 pointer-events-none w-full px-5 sm:px-6">
	<!-- Header Content -->
	<div class="w-full max-w-2xl mx-auto h-14 relative flex items-center justify-between pointer-events-auto">
		<div
			class="absolute top-1/2 -translate-y-1/2 flex items-center transition-all {hasMessages
				? 'left-0 sm:-left-0.5 translate-x-0 duration-350 ease-[cubic-bezier(0.16,1,0.3,1)]'
				: 'left-1/2 -translate-x-1/2 duration-700 ease-[cubic-bezier(0.87,0,0.13,1)]'}"
		>
			<span class="font-medium text-white text-sm tracking-tight select-none">CCS Assist</span>
		</div>

		<div
			class="absolute top-1/2 right-0 -translate-y-1/2 flex items-center gap-2 transition-all duration-300 {hasMessages
				? 'opacity-100 scale-100 delay-250 pointer-events-auto'
				: 'opacity-0 scale-95 pointer-events-none'}"
		>
			<button
				type="button"
				onclick={onReset}
				class="flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/20 transition-all cursor-pointer active:scale-95"
				title="Start new conversation"
				tabindex={hasMessages ? 0 : -1}
			>
				<RotateCcw class="w-3.5 h-3.5" />
				<span class="font-medium text-[11px]">New Chat</span>
			</button>
		</div>
	</div>
</header>



