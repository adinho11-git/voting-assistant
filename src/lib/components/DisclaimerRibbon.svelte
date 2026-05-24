<script lang="ts">
  import { browser } from '$app/environment';
  import { onMount } from 'svelte';

  const STORAGE_KEY = 'disclaimer_dismissed_v1';
  let visible = false;

  function dismiss(): void {
    visible = false;
    if (browser) {
      try {
        localStorage.setItem(STORAGE_KEY, '1');
      } catch {
        // ignore
      }
    }
  }

  onMount(() => {
    if (!browser) return;
    try {
      visible = localStorage.getItem(STORAGE_KEY) !== '1';
    } catch {
      visible = true;
    }
  });
</script>

{#if visible}
  <div class="disclaimer-ribbon" role="note">
    <div class="container-app">
      <div class="disclaimer-content">
        <strong>Studentischer Prototyp</strong>
        <span class="disclaimer-copy">
          Demo aus ZHAW Prototyping (FS 2026) - keine offizielle Abstimmungshilfe und keine Wahlempfehlung.
          Quellen: admin.ch / bk.admin.ch.
          <a href="/quellen" class="source-link" style="font-size: inherit;">Quellen</a>
        </span>
      </div>
      <button
        type="button"
        on:click={dismiss}
        class="disclaimer-dismiss"
        aria-label="Hinweis ausblenden"
      >
        Verstanden
      </button>
    </div>
  </div>
{/if}
