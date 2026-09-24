<script lang="ts">
	import { marked } from 'marked';
	import { Bot, User, Copy, Check } from 'lucide-svelte';

	let { message }: { message: any } = $props();

	let copied = $state(false);

	function getMessageText(msg: any): string {
		if (msg.content && typeof msg.content === 'string') return msg.content;
		if (Array.isArray(msg.parts)) {
			return msg.parts
				.filter((p: any) => p.type === 'text')
				.map((p: any) => p.text)
				.join('');
		}
		return '';
	}

	const text = $derived(getMessageText(message));
	const isUser = $derived(message.role === 'user');

	const htmlContent = $derived.by(() => {
		if (isUser) return '';
		try {
			return marked.parse(text || '', { breaks: true, gfm: true }) as string;
		} catch {
			return text;
		}
	});

	async function copyToClipboard() {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => {
				copied = false;
			}, 2000);
		} catch (err) {
			console.error('Failed to copy message:', err);
		}
	}
</script>

<div class="w-full flex {isUser ? 'justify-end' : 'justify-start'} group mb-4">
	<div class="flex items-start gap-3 max-w-[92%] sm:max-w-[80%] {isUser ? 'flex-row-reverse' : 'flex-row'}">
		<!-- Avatar -->
		<div
			class="w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-semibold shadow-sm transition-transform {isUser
				? 'bg-zinc-800 text-zinc-300 border border-white/10'
				: 'bg-[#FA4615]/15 text-[#FA4615] border border-[#FA4615]/30'}"
		>
			{#if isUser}
				<User class="w-4 h-4" />
			{:else}
				<Bot class="w-4 h-4" />
			{/if}
		</div>

		<!-- Message Container -->
		<div class="flex flex-col {isUser ? 'items-end' : 'items-start'}">
			<div
				class="px-4 py-3 rounded-2xl text-sm leading-relaxed transition-all shadow-sm {isUser
					? 'bg-zinc-800 text-white rounded-tr-xs border border-white/5'
					: 'bg-[#18191f] text-zinc-200 rounded-tl-xs border border-white/10 prose prose-invert max-w-none text-left'}"
			>
				{#if isUser}
					<p class="whitespace-pre-wrap">{text}</p>
				{:else}
					{#if text.length === 0}
						<div class="flex items-center gap-1.5 py-1">
							<span class="w-2 h-2 rounded-full bg-[#FA4615] animate-bounce [animation-delay:-0.3s]"></span>
							<span class="w-2 h-2 rounded-full bg-[#FA4615] animate-bounce [animation-delay:-0.15s]"></span>
							<span class="w-2 h-2 rounded-full bg-[#FA4615] animate-bounce"></span>
						</div>
					{:else}
						<div class="prose-content">
							{@html htmlContent}
						</div>
					{/if}
				{/if}
			</div>

			<!-- Quick Actions (Copy) -->
			{#if !isUser && text.length > 0}
				<div class="flex items-center gap-2 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity">
					<button
						type="button"
						onclick={copyToClipboard}
						class="flex items-center gap-1 text-[11px] text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
						title="Copy response"
					>
						{#if copied}
							<Check class="w-3 h-3 text-emerald-400" />
							<span class="text-emerald-400">Copied</span>
						{:else}
							<Copy class="w-3 h-3" />
							<span>Copy</span>
						{/if}
					</button>
				</div>
			{/if}
		</div>
	</div>
</div>

<style>
	:global(.prose-content p) {
		margin-bottom: 0.5rem;
	}
	:global(.prose-content p:last-child) {
		margin-bottom: 0;
	}
	:global(.prose-content ul, .prose-content ol) {
		margin-top: 0.25rem;
		margin-bottom: 0.5rem;
		padding-left: 1.25rem;
	}
	:global(.prose-content ul) {
		list-style-type: disc;
	}
	:global(.prose-content ol) {
		list-style-type: decimal;
	}
	:global(.prose-content li) {
		margin-bottom: 0.25rem;
	}
	:global(.prose-content strong) {
		color: #ffffff;
		font-weight: 600;
	}
	:global(.prose-content code) {
		background: rgba(255, 255, 255, 0.1);
		padding: 0.15rem 0.35rem;
		border-radius: 0.25rem;
		font-size: 0.85em;
	}
</style>
