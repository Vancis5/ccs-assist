<script lang="ts">
	import { tick, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { Chat } from '@ai-sdk/svelte';
	import { DefaultChatTransport } from 'ai';
	import { ArrowUp, Square, AlertCircle } from 'lucide-svelte';
	import ChatHeader from '$lib/components/ChatHeader.svelte';
	import ChatMessage from '$lib/components/ChatMessage.svelte';
	import StarterPrompts from '$lib/components/StarterPrompts.svelte';
	import { extractMessageText } from '$lib/messages';
	import { getRandomGreeting } from '$lib/data/greetings';

	let currentGreetingData = $state(getRandomGreeting());
	const currentGreeting = $derived(currentGreetingData.greeting);

	const STORAGE_KEY = 'ccs_assist_messages';

	const chat = new Chat({
		transport: new DefaultChatTransport({
			api: '/api/chat'
		})
	});

	let input = $state('');
	let messagesContainer: HTMLElement | null = $state(null);
	let textareaRef: HTMLTextAreaElement | null = $state(null);
	let isBursting = $state(false);
	let burstKey = $state(0);
	let autoFollowStream = $state(true);
	let prevMessageCount = $state(0);
	let isMobile = $state(false);
	let isInputFocused = $state(false);
	let responsePaddingState = $state<'large' | 'short' | 'dock'>('dock');
	let shortPaddingPx = $state<number | null>(null);
	let isScrolledToBottom = $state(true);
	let wasStreaming = $state(false);

	const isStreaming = $derived(chat.status === 'streaming' || chat.status === 'submitted');

	function triggerVibration(duration = 25) {
		if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
			try {
				navigator.vibrate(duration);
			} catch (e) {
				console.error('Vibration failed:', e);
			}
		}
	}

	$effect(() => {
		if (wasStreaming && !isStreaming) {
			triggerVibration(25);
		}
		wasStreaming = isStreaming;
	});

	function checkScrollBottom() {
		if (!messagesContainer) return;
		const { scrollTop, scrollHeight, clientHeight } = messagesContainer;
		// Within 12px counts as at bottom
		isScrolledToBottom = scrollHeight - scrollTop - clientHeight <= 12;
	}

	function handleScroll() {
		checkScrollBottom();
	}

	function triggerBurst() {
		burstKey++;
		isBursting = true;
		setTimeout(() => {
			isBursting = false;
		}, 850);
	}

	function handleWheel(e: WheelEvent) {
		if (e.deltaY < 0) {
			autoFollowStream = false;
		}
	}

	async function putLatestUserMessageAtTop() {
		await tick();
		requestAnimationFrame(() => {
			if (!messagesContainer) return;
			const userEls = messagesContainer.querySelectorAll('.user-msg-container');
			const latestUserEl = userEls[userEls.length - 1] as HTMLElement | undefined;
			if (latestUserEl) {
				const containerRect = messagesContainer.getBoundingClientRect();
				const elRect = latestUserEl.getBoundingClientRect();
				// Position message cleanly below header
				const targetTop = messagesContainer.scrollTop + (elRect.top - containerRect.top) - 85;
				messagesContainer.scrollTo({
					top: Math.max(0, targetTop),
					behavior: 'smooth'
				});
			} else {
				messagesContainer.scrollTo({
					top: messagesContainer.scrollHeight,
					behavior: 'smooth'
				});
			}
		});
	}

	function positionUserMessage() {
		autoFollowStream = true;
		putLatestUserMessageAtTop();
		setTimeout(putLatestUserMessageAtTop, 50);
		setTimeout(putLatestUserMessageAtTop, 180);
	}

	function handleStreamScroll() {
		if (!messagesContainer || !autoFollowStream) return;
		const assistantEls = messagesContainer.querySelectorAll('.assistant-msg-container');
		const latestAssistantEl = assistantEls[assistantEls.length - 1] as HTMLElement | undefined;
		if (!latestAssistantEl) return;

		const rect = latestAssistantEl.getBoundingClientRect();
		const bottomThreshold = window.innerHeight - 150;
		if (rect.bottom > bottomThreshold) {
			const diff = rect.bottom - bottomThreshold;
			messagesContainer.scrollBy({
				top: diff,
				behavior: 'smooth'
			});
		}
	}

	function updatePaddingAfterResponse() {
		if (!messagesContainer || isStreaming || chat.messages.length === 0) {
			responsePaddingState = 'dock';
			shortPaddingPx = null;
			return;
		}

		const containerRect = messagesContainer.getBoundingClientRect();
		const clientHeight = messagesContainer.clientHeight;
		const userEls = messagesContainer.querySelectorAll('.user-msg-container');
		const latestUserEl = userEls[userEls.length - 1] as HTMLElement | undefined;
		const msgEls = messagesContainer.querySelectorAll('.user-msg-container, .assistant-msg-container');
		const lastMsgEl = msgEls[msgEls.length - 1] as HTMLElement | undefined;

		if (!latestUserEl || !lastMsgEl) {
			responsePaddingState = 'dock';
			shortPaddingPx = null;
			return;
		}

		const userRect = latestUserEl.getBoundingClientRect();
		const lastMsgRect = lastMsgEl.getBoundingClientRect();

		const userTop = messagesContainer.scrollTop + (userRect.top - containerRect.top);
		const targetTop = Math.max(0, userTop - 85);
		const marginBottom = parseFloat(window.getComputedStyle(lastMsgEl).marginBottom) || 24;
		const contentBottom = messagesContainer.scrollTop + (lastMsgRect.bottom - containerRect.top) + marginBottom;

		const targetScroll = autoFollowStream ? messagesContainer.scrollTop : targetTop;
		const dockHeight = 144;
		const requiredPadding = Math.round((targetScroll + clientHeight) - contentBottom);

		if (requiredPadding > dockHeight) {
			shortPaddingPx = requiredPadding;
			responsePaddingState = 'short';
		} else {
			shortPaddingPx = null;
			responsePaddingState = 'dock';
		}
		checkScrollBottom();
	}

	const lastMessage = $derived(chat.messages[chat.messages.length - 1]);
	const lastMessageContent = $derived(extractMessageText(lastMessage));

	$effect(() => {
		const currentCount = chat.messages.length;
		if (currentCount > prevMessageCount) {
			const last = chat.messages[currentCount - 1];
			if (last?.role === 'user') {
				positionUserMessage();
			}
			prevMessageCount = currentCount;
		}
	});

	$effect(() => {
		const _ = lastMessageContent;
		if (isStreaming && lastMessage?.role === 'assistant') {
			handleStreamScroll();
		}
	});

	$effect(() => {
		if (isStreaming) {
			responsePaddingState = 'large';
			shortPaddingPx = null;
		} else if (chat.messages.length > 0) {
			tick().then(() => {
				updatePaddingAfterResponse();
			});
		} else {
			responsePaddingState = 'dock';
			shortPaddingPx = null;
		}
	});

	onMount(() => {
		const mql = window.matchMedia('(max-width: 639px)');
		isMobile = mql.matches;
		const handler = (e: MediaQueryListEvent) => {
			isMobile = e.matches;
		};
		mql.addEventListener('change', handler);

		const handleResize = () => {
			if (!isStreaming && chat.messages.length > 0 && responsePaddingState === 'short') {
				updatePaddingAfterResponse();
			}
		};
		window.addEventListener('resize', handleResize);

		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const parsed = JSON.parse(saved);
				if (Array.isArray(parsed) && parsed.length > 0) {
					chat.messages = parsed;
					prevMessageCount = parsed.length;
					tick().then(() => {
						updatePaddingAfterResponse();
						if (messagesContainer) {
							messagesContainer.scrollTop = messagesContainer.scrollHeight;
						}
					});
				}
			}
		} catch (e) {
			console.error('Failed to load chat history from localStorage:', e);
		}

		return () => {
			mql.removeEventListener('change', handler);
			window.removeEventListener('resize', handleResize);
		};
	});

	$effect(() => {
		if (!browser) return;
		if (!isStreaming) {
			try {
				if (chat.messages.length > 0) {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(chat.messages));
				} else {
					localStorage.removeItem(STORAGE_KEY);
				}
			} catch (e) {
				console.error('Failed to save chat history to localStorage:', e);
			}
		}
	});

	async function handleSubmit(e?: Event) {
		if (e) e.preventDefault();
		const trimmed = input.trim();
		if (!trimmed || isStreaming) return;

		triggerVibration();
		responsePaddingState = 'large';
		shortPaddingPx = null;
		triggerBurst();
		input = '';
		if (textareaRef) {
			textareaRef.style.height = 'auto';
		}

		positionUserMessage();
		await chat.sendMessage({ text: trimmed });
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	}

	function handleStarterSelect(promptText: string) {
		triggerVibration();
		responsePaddingState = 'large';
		shortPaddingPx = null;
		triggerBurst();
		positionUserMessage();
		chat.sendMessage({ text: promptText });
	}

	async function handleRegenerate(messageId?: string) {
		if (isStreaming) return;
		triggerVibration();
		responsePaddingState = 'large';
		shortPaddingPx = null;
		autoFollowStream = true;

		// Ensure we target a valid message
		const targetId = messageId ?? chat.messages[chat.messages.length - 1]?.id;
		if (targetId) {
			await chat.regenerate({ messageId: targetId });
		} else {
			await chat.regenerate();
		}
	}

	function handleReset() {
		if (isStreaming) {
			chat.stop();
		}
		chat.messages = [];
		(chat as any).state.error = undefined;
		(chat as any).state.status = 'ready';
		prevMessageCount = 0;
		autoFollowStream = true;
		responsePaddingState = 'dock';
		shortPaddingPx = null;
		currentGreetingData = getRandomGreeting(currentGreetingData.index);
		if (browser) {
			localStorage.removeItem(STORAGE_KEY);
		}
	}

	function handleInputResize(e: Event) {
		const target = e.target as HTMLTextAreaElement;
		target.style.height = 'auto';
		target.style.height = `${Math.min(target.scrollHeight, 180)}px`;
	}
</script>

<div class="flex flex-col h-[100dvh] w-full bg-[#090a0d] text-zinc-100 overflow-hidden font-sans relative">
	<!-- Ambient top rotating orange glow blob -->
	<div class="ambient-top-glow pointer-events-none absolute top-0 left-1/2 -z-0"></div>

	<!-- Progressive Blur Gradient (outside header to avoid transform breaking backdrop-filter) -->
	{#if chat.messages.length > 0}
		<div class="header-blur-surface fixed inset-x-0 top-0 h-24 z-[29] pointer-events-none"></div>
	{/if}

	<!-- Top Navigation -->
	<div class="intro-fade-in-header contents">
		<ChatHeader onReset={handleReset} hasMessages={chat.messages.length > 0} />
	</div>

	<!-- Chat History Area (Edge-to-Edge) -->
	<main
		bind:this={messagesContainer}
		onscroll={handleScroll}
		onwheel={handleWheel}
		onpointerdown={(e) => {
			if (isInputFocused && textareaRef && !textareaRef.contains(e.target as Node)) {
				textareaRef.blur();
			}
		}}
		style:padding-bottom={responsePaddingState === 'short' && shortPaddingPx ? `${shortPaddingPx}px` : undefined}
		class="flex-1 overflow-y-auto [scrollbar-gutter:stable] px-5 sm:px-6 pt-16 {chat.messages.length === 0 ? (isInputFocused ? 'pb-28 sm:pb-36' : 'pb-36') : responsePaddingState === 'dock' ? 'pb-36' : 'pb-[calc(100dvh-180px)]'} flex flex-col justify-start relative z-10"
	>
		<div class="max-w-2xl w-full mx-auto flex-1 flex flex-col min-w-0">
			{#if chat.messages.length === 0}
				<div class="w-full flex-1 flex flex-col justify-center">
					<StarterPrompts onSelect={handleStarterSelect} greeting={currentGreeting} {isInputFocused} />
				</div>
			{:else}
				<div class="w-full min-w-0">
					{#each chat.messages as msg (msg.id)}
						<ChatMessage
							message={msg}
							onRegenerate={handleRegenerate}
							{isStreaming}
						/>
					{/each}
					{#if isStreaming && lastMessage?.role === 'user'}
						<div class="w-full flex justify-start assistant-msg-container group mb-6 scroll-mt-20">
							<div class="w-full flex flex-col items-start text-left">
								<div class="w-full text-zinc-200 text-[15px] leading-relaxed">
									<div class="flex items-center gap-1.5 py-2.5">
										<span class="alive-dot w-1.5 h-1.5 rounded-full bg-[#FA4615]"></span>
										<span class="alive-dot w-1.5 h-1.5 rounded-full bg-[#FA4615]" style="animation-delay:280ms"></span>
										<span class="alive-dot w-1.5 h-1.5 rounded-full bg-[#FA4615]" style="animation-delay:560ms"></span>
									</div>
								</div>
							</div>
						</div>
					{/if}
				</div>
			{/if}

			{#if chat.error && chat.messages.length > 0}
				{@const isRateLimit = chat.error.message?.toLowerCase().includes('rate limit') || chat.error.message?.includes('429')}
				<div class="my-4 p-3 rounded-xl bg-red-950/30 border border-red-800/30 text-red-200 text-xs flex items-center justify-between gap-3">
					<div class="flex items-center gap-2">
						<AlertCircle class="w-4 h-4 text-red-400 shrink-0" />
						<span>
							{#if isRateLimit}
								Groq API rate limit reached. All fallback models are currently busy. Please wait a moment and try again.
							{:else}
								{chat.error.message || 'An error occurred while generating response.'}
							{/if}
						</span>
					</div>
					<button
						type="button"
						onclick={() => handleRegenerate()}
						class="px-2.5 py-1 rounded bg-red-900/40 hover:bg-red-900/70 border border-red-700/40 text-white font-medium transition-colors cursor-pointer text-xs shrink-0"
					>
						Retry
					</button>
				</div>
			{/if}
		</div>
	</main>

	<!-- Progressive Blur Gradient (bottom dock area - fades out when scrolled all the way down) -->
	<div
		class="fixed inset-x-0 bottom-0 h-40 sm:h-44 z-[15] pointer-events-none transition-opacity duration-300 {isScrolledToBottom ? 'opacity-0' : 'opacity-100'}"
	>
		<div class="bottom-dock-blur w-full h-full"></div>
	</div>

	<!-- Edge-to-Edge Floating Input Dock -->
	<footer class="intro-fade-in-footer pointer-events-none fixed bottom-0 left-0 right-0 w-full pt-16 pb-4 sm:pb-6 px-5 sm:px-6 flex flex-col items-center justify-end z-20">
		<div class="pointer-events-auto w-full max-w-2xl mx-auto relative">
			<!-- Glow & color burst behind prompt dock on send -->
			{#if isBursting}
				{#key burstKey}
					<div class="send-burst-glow pointer-events-none absolute -inset-2 sm:-inset-3 rounded-2xl -z-10"></div>
				{/key}
			{/if}

			<form
				onsubmit={handleSubmit}
				class="relative flex flex-col bg-[#121318] rounded-2xl border border-white/[0.08] focus-within:border-[#FA4615]/50 focus-within:ring-1 focus-within:ring-[#FA4615]/20 transition-all shadow-xl shadow-black/50 p-2 sm:p-2.5"
			>
				<textarea
					bind:this={textareaRef}
					bind:value={input}
					onfocus={() => {
						isInputFocused = true;
					}}
					onblur={() => {
						isInputFocused = false;
					}}
					onkeydown={handleKeydown}
					oninput={handleInputResize}
					rows="1"
					placeholder={isMobile ? 'Ask CCS Assist anything...' : 'Ask CCS Assist about curriculum, faculty, labs...'}
					class="w-full bg-transparent text-[14.5px] text-white placeholder-zinc-500 focus:outline-none resize-none px-2 py-1.5 max-h-36 overflow-y-auto leading-relaxed placeholder:truncate"
				></textarea>

				<div class="flex items-center justify-end pt-1 px-1">
					<div class="flex items-center gap-2">
						{#if isStreaming}
							<button
								type="button"
								onclick={() => chat.stop()}
								class="w-8 h-8 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-95"
								title="Stop generating"
							>
								<Square class="w-3.5 h-3.5 fill-white" />
							</button>
						{:else}
							<button
								type="submit"
								disabled={!input.trim()}
								class="w-8 h-8 rounded-xl flex items-center justify-center transition-all shrink-0 cursor-pointer active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed {input.trim()
									? 'bg-[#C23811] text-white hover:brightness-110 shadow-sm shadow-[#FA4615]/20'
									: 'bg-white/[0.04] text-zinc-500'}"
								title="Send message"
							>
								<ArrowUp class="w-4 h-4 stroke-[2.5]" />
							</button>
						{/if}
					</div>
				</div>
			</form>

			<div class="flex items-center justify-center sm:justify-between text-[11px] text-zinc-500 px-2 mt-2 text-center sm:text-left">
				<span>Saint Joseph College • College of Computer Studies</span>
				<span class="hidden sm:inline">Enter to send, Shift+Enter for newline</span>
			</div>
		</div>
	</footer>
</div>

<style>
	.header-blur-surface {
		background: linear-gradient(
			180deg,
			rgba(9, 10, 13, 0.95) 0%,
			rgba(9, 10, 13, 0.8) 40%,
			rgba(9, 10, 13, 0.35) 75%,
			rgba(9, 10, 13, 0) 100%
		);
		backdrop-filter: blur(20px);
		-webkit-backdrop-filter: blur(20px);
		mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 100%);
		-webkit-mask-image: linear-gradient(to bottom, black 0%, black 50%, transparent 100%);
	}

	.bottom-dock-blur {
		background: linear-gradient(
			0deg,
			rgba(9, 10, 13, 0.95) 0%,
			rgba(9, 10, 13, 0.75) 45%,
			rgba(9, 10, 13, 0.3) 75%,
			rgba(9, 10, 13, 0) 100%
		);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		mask-image: linear-gradient(to top, black 0%, black 55%, transparent 100%);
		-webkit-mask-image: linear-gradient(to top, black 0%, black 55%, transparent 100%);
	}

	:global(.intro-fade-in-header header) {
		animation: visitFadeIn 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: 500ms;
	}

	.intro-fade-in-footer {
		animation: visitFadeInUp 350ms cubic-bezier(0.16, 1, 0.3, 1) both;
		animation-delay: 550ms;
		will-change: opacity, transform;
	}

	@keyframes visitFadeIn {
		from {
			opacity: 0;
			transform: translateY(-6px);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}

	@keyframes visitFadeInUp {
		from {
			opacity: 0;
			transform: translate3d(0, 10px, 0);
		}
		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		:global(.intro-fade-in-header header),
		.intro-fade-in-footer {
			animation: none !important;
		}
	}

	.ambient-top-glow {
		width: 1000px;
		height: 480px;
		background: radial-gradient(
			ellipse 60% 50% at 50% 30%,
			rgba(250, 70, 21, 0.22) 0%,
			rgba(250, 70, 21, 0.12) 35%,
			rgba(227, 205, 44, 0.04) 60%,
			transparent 75%
		);
		filter: blur(72px);
		animation: topGlowRotate 18s cubic-bezier(0.45, 0, 0.55, 1) infinite alternate;
		will-change: transform, opacity;
		transform-origin: 50% -120px;
	}

	@keyframes topGlowRotate {
		0% {
			transform: translate3d(-50%, -10%, 0) rotate(-22deg) scale(0.92);
			opacity: 0.65;
		}
		50% {
			opacity: 0.88;
		}
		100% {
			transform: translate3d(-50%, 6%, 0) rotate(22deg) scale(1.08);
			opacity: 0.72;
		}
	}

	.send-burst-glow {
		background: radial-gradient(
			ellipse 80% 65% at center,
			rgba(250, 70, 21, 0.5) 0%,
			rgba(227, 205, 44, 0.28) 35%,
			rgba(20, 122, 13, 0.12) 65%,
			transparent 75%
		);
		filter: blur(24px);
		animation: sendBurst 850ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		will-change: transform, opacity;
		transform-origin: center center;
	}

	@keyframes sendBurst {
		0% {
			opacity: 0.55;
			transform: scale3d(0.98, 0.96, 1);
		}
		8% {
			opacity: 0.65;
			transform: scale3d(1.01, 1.02, 1);
		}
		35% {
			opacity: 0.3;
			transform: scale3d(1.03, 1.04, 1);
		}
		70% {
			opacity: 0.08;
			transform: scale3d(1.05, 1.06, 1);
		}
		100% {
			opacity: 0;
			transform: scale3d(1.07, 1.08, 1);
		}
	}
</style>


