<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center justify-center min-h-screen px-6 text-center">
  <p class="text-5xl mb-4">🗳</p>
  <h1 class="font-serif text-2xl text-gray-900 mb-2">Seite nicht gefunden</h1>
  <p class="text-sm text-gray-500 mb-6">
    {$page.error?.message ?? 'Diese Seite existiert leider nicht.'}
  </p>
  <a href="/" class="btn-primary inline-block w-auto px-6">Zurück zur Startseite</a>
</div>
