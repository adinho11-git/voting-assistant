<script lang="ts">
  import { goto } from '$app/navigation';

  export let title: string = '';
  export let backHref: string = '';
  export let showBookmark: boolean = false;
  export let bookmarked: boolean = false;

  function goBack() {
    if (backHref) goto(backHref);
    else history.back();
  }
</script>

<header class="sticky top-0 z-30 bg-paper border-b border-gray-200">
  <div class="flex items-center justify-between px-4 h-14">
    <button
      on:click={goBack}
      class="flex items-center gap-1.5 text-brand-blue font-medium text-sm -ml-1 px-1 py-1 rounded-lg active:bg-gray-100"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Zurück
    </button>

    {#if title}
      <span class="font-medium text-sm text-gray-700 truncate max-w-[160px]">{title}</span>
    {/if}

    {#if showBookmark}
      <button class="p-1 rounded-lg active:bg-gray-100" aria-label="Merkliste">
        <svg class="w-5 h-5 {bookmarked ? 'text-brand-blue fill-brand-blue' : 'text-gray-400'}"
          fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    {:else}
      <div class="w-16" />
    {/if}
  </div>
</header>
