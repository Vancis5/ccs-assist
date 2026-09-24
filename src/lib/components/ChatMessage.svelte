<script lang="ts">
	import { marked } from 'marked';
	import { Copy, Check } from 'lucide-svelte';
	import { extractMessageText } from '$lib/messages';

	let { message }: { message: any } = $props();

	let copied = $state(false);

	const text = $derived(extractMessageText(message));
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

<div class="w-full {isUser ? 'flex justify-end user-msg-container' : 'flex justify-start assistant-msg-container'} group mb-6 scroll-mt-20">
	{#if isUser}
		<!-- User Message Bubble -->
		<div class="max-w-[85%] sm:max-w-[75%] flex flex-col items-end user-bubble-wrapper">
			<div
				class="user-bubble-box px-4 py-2.5 rounded-2xl rounded-tr-sm bg-white/[0.08] text-white border border-white/[0.08] text-[14.5px] leading-relaxed break-words shadow-sm font-normal selection:bg-[#FA4615]/30"
			>
				<p class="whitespace-pre-wrap">{text}</p>
			</div>
		</div>
	{:else}
		<!-- Assistant Message: Fluid edge-to-edge editorial typography -->
		<div class="w-full flex flex-col items-start text-left">
			<!-- Message Content -->
			<div class="w-full text-zinc-200 text-[15px] leading-relaxed">
				{#if text.length === 0}
					<div class="flex items-center gap-1.5 py-2">
						<span class="w-1.5 h-1.5 rounded-full bg-[#FA4615] animate-pulse will-change-opacity"></span>
						<span class="w-1.5 h-1.5 rounded-full bg-[#FA4615] animate-pulse [animation-delay:150ms] will-change-opacity"></span>
						<span class="w-1.5 h-1.5 rounded-full bg-[#FA4615] animate-pulse [animation-delay:300ms] will-change-opacity"></span>
					</div>
				{:else}
					<div class="prose-minimal w-full">
						{@html htmlContent}
					</div>
				{/if}
			</div>

			<!-- Action bar -->
			{#if text.length > 0}
				<div class="flex items-center gap-3 mt-2 text-xs text-zinc-400">
					<button
						type="button"
						onclick={copyToClipboard}
						class="inline-flex items-center gap-1.5 text-[11px] text-zinc-400 hover:text-white hover:animate-pulse transition-colors cursor-pointer active:scale-95 py-1"
						title="Copy response"
					>
						{#if copied}
							<Check class="w-3.5 h-3.5 text-emerald-400" />
							<span class="text-emerald-400 font-medium">Copied</span>
						{:else}
							<Copy class="w-3.5 h-3.5" />
							<span>Copy</span>
						{/if}
					</button>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* User message: flies up from dock & snaps cleanly into bubble shape without bounce */
	.user-bubble-wrapper {
		animation: flyUp 0.26s cubic-bezier(0.22, 1, 0.36, 1) both;
		transform-origin: bottom right;
		will-change: transform, opacity;
	}

	.user-bubble-box {
		animation: compressBubble 0.26s cubic-bezier(0.22, 1, 0.36, 1) both;
		transform-origin: bottom right;
		will-change: transform, border-radius, box-shadow;
	}

	@keyframes flyUp {
		0% {
			opacity: 0.15;
			transform: translate3d(0, 36px, 0);
		}
		100% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@keyframes compressBubble {
		0% {
			transform: scale3d(1.08, 0.88, 1);
			border-radius: 12px;
			box-shadow: 0 4px 18px -2px rgba(250, 70, 21, 0.25);
		}
		100% {
			transform: scale3d(1, 1, 1);
			border-radius: 1rem 1rem 0.25rem 1rem;
			box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		}
	}

	.assistant-msg-container {
		animation: assistantFadeUp 0.32s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes assistantFadeUp {
		0% {
			opacity: 0;
			transform: translate3d(0, 12px, 0);
		}
		100% {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.user-bubble-wrapper,
		.user-bubble-box,
		.assistant-msg-container {
			animation: none !important;
			transform: none !important;
		}
	}

	:global(.prose-minimal) {
		color: #e4e4e7;
		font-size: 0.9375rem;
		line-height: 1.65;
	}
	:global(.prose-minimal p) {
		margin-bottom: 0.75rem;
	}
	:global(.prose-minimal p:last-child) {
		margin-bottom: 0;
	}
	:global(.prose-minimal h1, .prose-minimal h2, .prose-minimal h3, .prose-minimal h4) {
		color: #ffffff;
		font-weight: 600;
		margin-top: 1.25rem;
		margin-bottom: 0.5rem;
		letter-spacing: -0.015em;
	}
	:global(.prose-minimal h1) {
		font-size: 1.25rem;
	}
	:global(.prose-minimal h2) {
		font-size: 1.125rem;
	}
	:global(.prose-minimal h3) {
		font-size: 1rem;
	}
	:global(.prose-minimal ul, .prose-minimal ol) {
		margin-top: 0.5rem;
		margin-bottom: 0.75rem;
		padding-left: 1.25rem;
	}
	:global(.prose-minimal ul) {
		list-style-type: disc;
	}
	:global(.prose-minimal ol) {
		list-style-type: decimal;
	}
	:global(.prose-minimal li) {
		margin-bottom: 0.35rem;
		padding-left: 0.2rem;
	}
	:global(.prose-minimal li::marker) {
		color: #a1a1aa;
	}
	:global(.prose-minimal strong) {
		color: #ffffff;
		font-weight: 600;
	}
	:global(.prose-minimal code) {
		background: rgba(255, 255, 255, 0.08);
		color: #f43f5e;
		padding: 0.15rem 0.35rem;
		border-radius: 0.35rem;
		font-size: 0.85em;
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
	}
	:global(.prose-minimal pre) {
		background: rgba(18, 19, 24, 0.8);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: 0.75rem;
		padding: 0.875rem 1rem;
		overflow-x: auto;
		margin: 0.75rem 0;
	}
	:global(.prose-minimal pre code) {
		background: transparent;
		color: #e4e4e7;
		padding: 0;
		font-size: 0.85rem;
	}
	:global(.prose-minimal blockquote) {
		border-left: 2px solid #FA4615;
		padding-left: 0.875rem;
		margin: 0.75rem 0;
		color: #a1a1aa;
		font-style: italic;
	}
	:global(.prose-minimal table) {
		width: 100%;
		border-collapse: collapse;
		margin: 0.875rem 0;
		font-size: 0.875rem;
	}
	:global(.prose-minimal th) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.15);
		text-align: left;
		padding: 0.5rem 0.75rem;
		color: #ffffff;
		font-weight: 600;
	}
	:global(.prose-minimal td) {
		border-bottom: 1px solid rgba(255, 255, 255, 0.06);
		padding: 0.5rem 0.75rem;
		color: #d4d4d8;
	}
</style>

