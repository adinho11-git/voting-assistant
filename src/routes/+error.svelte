<script lang="ts">
  import { page } from '$app/stores';
</script>

<svelte:head>
  <title>Seite nicht gefunden – Voting Assistant</title>
</svelte:head>

<div class="container-read py-20 text-center">
  <p class="font-mono-data text-xs uppercase tracking-wider text-brand mb-3">Fehler {$page.status}</p>
  <h1 class="font-display text-3xl md:text-4xl text-ink mb-3">
    {$page.status === 404 ? 'Seite nicht gefunden' : 'Ein Fehler ist aufgetreten'}
  </h1>
  <p class="text-ink-muted mb-8 max-w-md mx-auto">
    {$page.error?.message ?? 'Diese Seite existiert leider nicht.'}
  </p>
  <a href="/" class="btn-primary inline-flex">
    Zurück zur Startseite
  </a>
</div>
