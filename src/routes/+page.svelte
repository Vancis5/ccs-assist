<script lang="ts">
	import { tick } from 'svelte';
	import { Chat } from '@ai-sdk/svelte';
	import { DefaultChatTransport } from 'ai';
	import { Send, Square, AlertCircle } from 'lucide-svelte';
	import ChatHeader from '$lib/components/ChatHeader.svelte';
	import ChatMessage from '$lib/components/ChatMessage.svelte';
	import StarterPrompts from '$lib/components/StarterPrompts.svelte';

	const chat = new Chat({
		transport: new DefaultChatTransport({
			api: '/api/chat'
		})
	});

	let input = $state('');
	let messagesContainer: HTMLElement | null = $state(null);
	let textareaRef: HTMLTextAreaElement | null = $state(null);

	const isStreaming = $derived(chat.status === 'streaming' || chat.status === 'submitted');

	async function scrollToBottom() {
		await tick();
		if (messagesContainer) {
			messagesContainer.scrollTo({
				top: messagesContainer.scrollHeight,
				behavior: 'smooth'
			});
		}
	}

	$effect(() => {
		// Auto scroll on new messages or stream chunks
		if (chat.messages.length > 0) {
			scrollToBottom();
		}
	});

	async function handleSubmit(e?: Event) {
		if (e) e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || isStreaming) return;

		input = '';
		if (textareaRef) {
			textareaRef.style.height = 'auto';
		}

		await chat.sendMessage({ text: trimmed });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleStarterSelect(promptText: string) {
		chat.sendMessage({ text: promptText });
	}

	function handleReset() {
		if (isStreaming) {
			chat.stop();
		}
		chat.messages = [];
	}

	function handleInputResize(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		target.style.height = 'auto';
		target.style.height = `${Math.min(target.scrollHeight, 160)}px`;
	}
</script>

<div class="flex flex-col h-[100dvh] bg-[#0d0e11] text-zinc-100 overflow-hidden font-sans">
	<!-- Top Navigation -->
	<ChatHeader onReset={handleReset} />

	<!-- Chat History Area -->
	<main
		bind:this={messagesContainer}
		class="flex-1 overflow-y-auto px-4 py-6 scroll-smooth flex flex-col justify-start"
	>
		<div class="max-w-3xl w-full mx-auto flex-1 flex flex-col">
			{#if chat.messages.length === 0}
				<StarterPrompts onSelect={handleStarterSelect} />
			{:else}
				<div class="space-y-1">
					{#each chat.messages as msg (msg.id)}
						<ChatMessage message={msg} />
					{/each}
				</div>
			{/if}

			{#if chat.error}
				<div class="my-4 p-3.5 rounded-xl bg-red-950/40 border border-red-800/40 text-red-200 text-xs flex items-center justify-between gap-3">
					<div class="flex items-center gap-2">
						<AlertCircle class="w-4 h-4 text-red-400 shrink-0" />
						<span>{chat.error.message || 'An error occurred while generating response.'}</span>
					</div>
					<button
						type="button"
						onclick={() => chat.regenerate()}
						class="px-2.5 py-1 rounded bg-red-900/60 hover:bg-red-800 text-white font-medium transition-colors cursor-pointer"
					>
						Retry
					</button>
				</div>
			{/if}
		</div>
	</main>

	<!-- Input Area -->
	<footer class="w-full bg-[#121317]/90 backdrop-blur-md border-t border-white/10 p-3 sm:p-4 shrink-0">
		<div class="max-w-3xl mx-auto">
			<form
				onsubmit={handleSubmit}
				class="relative flex items-end gap-2 bg-[#1b1c22] rounded-2xl border border-white/10 p-2 focus-within:border-[#FA4615]/50 focus-within:ring-1 focus-within:ring-[#FA4615]/30 transition-all shadow-lg"
			>
				<textarea
					bind:this={textareaRef}
					bind:value={input}
					onkeydown={handleKeydown}
					oninput={handleInputResize}
					rows="1"
					placeholder="Ask CCS Assist about programs, dean's office, retention..."
					class="w-full bg-transparent text-sm text-white placeholder-zinc-500 focus:outline-none resize-none px-2 py-1.5 max-h-40 overflow-y-auto leading-relaxed"
				></textarea>

				{#if isStreaming}
					<button
						type="button"
						onclick={() => chat.stop()}
						class="w-9 h-9 rounded-xl bg-zinc-700 hover:bg-zinc-600 text-white flex items-center justify-center transition-colors shrink-0 cursor-pointer"
						title="Stop generating"
					>
						<Square class="w-4 h-4 fill-white" />
					</button>
				{:else}
					<button
						type="submit"
						disabled={!input.trim()}
						style="background-color: {input.trim() ? '#C23811' : '#27272a'};"
						class="w-9 h-9 rounded-xl text-white flex items-center justify-center transition-all shrink-0 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:brightness-110 active:scale-95"
						title="Send message"
					>
						<Send class="w-4 h-4" />
					</button>
				{/if}
			</form>

			<div class="flex items-center justify-between text-[11px] text-zinc-500 px-2 mt-2">
				<span>Scoped strictly to SJC College of Computer Studies</span>
				<span class="hidden sm:inline">Press Enter to send, Shift+Enter for newline</span>
			</div>
		</div>
	</footer>
</div>
