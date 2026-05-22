<script lang="ts">
  import { engagementStore, toggleFavorite } from '$lib/stores/engagement';
  import { showToast } from '$lib/stores/toast';

  export let slug: string;
  export let title: string;
  export let compact = false;

  $: isFavorite = !!$engagementStore.favorites[slug];

  function toggle(): void {
    const next = toggleFavorite(slug, title);
    showToast(next ? 'In deiner Merkliste gespeichert.' : 'Aus deiner Merkliste entfernt.', 'success');
  }
</script>

<button
  type="button"
  class:fav-button={!compact}
  class:fav-compact={compact}
  class:is-active={isFavorite}
  aria-pressed={isFavorite}
  aria-label={isFavorite ? 'Aus Merkliste entfernen' : 'Zur Merkliste hinzufügen'}
  on:click={toggle}
>
  <svg width="18" height="18" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" stroke-width="2.25" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round" d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5z" />
  </svg>
  {#if !compact}
    <span>{isFavorite ? 'Gemerkt' : 'Merken'}</span>
  {/if}
</button>

<style>
  .fav-button,
  .fav-compact {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border: 1px solid var(--border-light);
    background: var(--surface);
    color: var(--text);
    box-shadow: var(--shadow-sm);
    transition:
      transform 180ms ease,
      border-color 180ms ease,
      background 180ms ease,
      color 180ms ease;
  }

  .fav-button {
    min-height: 42px;
    padding: 0 14px;
    border-radius: var(--radius);
    font-weight: 700;
    font-size: 14px;
  }

  .fav-compact {
    width: 38px;
    height: 38px;
    border-radius: 999px;
  }

  .fav-button:hover,
  .fav-compact:hover {
    transform: translateY(-1px);
    border-color: color-mix(in srgb, var(--brand) 45%, var(--border-light));
  }

  .is-active {
    color: var(--brand);
    background: var(--brand-soft);
    border-color: color-mix(in srgb, var(--brand) 42%, var(--border-light));
  }
</style>
