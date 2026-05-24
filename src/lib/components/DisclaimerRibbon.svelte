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
      <strong>Studentischer Prototyp</strong>
      <span>
        Diese App ist eine im Modul Prototyping (ZHAW FS 2026) entwickelte Demo —
        <strong style="color: var(--brand);">keine offizielle Abstimmungshilfe und keine Wahlempfehlung.</strong>
        Reale Vorlagen, Argumente und Ergebnisse stammen von admin.ch /
        bk.admin.ch (Stand 23. Mai 2026); die Übersicht fokussiert auf eidgenössische Vorlagen.
        <a href="/quellen" class="source-link" style="font-size: 12px;">Quellen &amp; Medienberichte</a>
      </span>
      <button
        type="button"
        on:click={dismiss}
        class="ml-auto text-xs text-ink-muted underline hover:text-ink whitespace-nowrap"
        aria-label="Hinweis ausblenden"
      >
        Verstanden
      </button>
    </div>
  </div>
{/if}
