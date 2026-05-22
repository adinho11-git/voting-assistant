<script lang="ts">
  import { goto } from '$app/navigation';
  import { createEventDispatcher } from 'svelte';

  export let title: string = '';
  export let backHref: string = '';
  export let showBookmark: boolean = false;
  export let bookmarked: boolean = false;

  const dispatch = createEventDispatcher<{ bookmark: void }>();

  function goBack(): void {
    if (backHref) {
      goto(backHref);
    } else if (typeof history !== 'undefined') {
      history.back();
    }
  }
</script>

<header class="md:hidden sticky top-0 z-30 bg-paper/95 backdrop-blur border-b border-border-light">
  <div class="flex items-center justify-between px-4 h-14">
    <button
      type="button"
      on:click={goBack}
      class="flex items-center gap-1.5 text-brand font-semibold text-sm -ml-1 px-1 py-1 rounded-lg active:bg-surface-alt"
      aria-label="Zurück"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Zurück
    </button>

    {#if title}
      <span class="font-medium text-sm text-ink-muted truncate max-w-[160px]">{title}</span>
    {/if}

    {#if showBookmark}
      <button
        type="button"
        class="p-1.5 rounded-lg active:bg-surface-alt"
        aria-label={bookmarked ? 'Aus Merkliste entfernen' : 'Zur Merkliste hinzufügen'}
        aria-pressed={bookmarked}
        on:click={() => dispatch('bookmark')}
      >
        <svg class="w-5 h-5 {bookmarked ? 'text-brand fill-brand' : 'text-ink-subtle'}"
          fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
      </button>
    {:else}
      <div class="w-16" aria-hidden="true" />
    {/if}
  </div>
</header>
