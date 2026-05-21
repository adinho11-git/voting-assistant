<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;
</script>

<svelte:head>
  <title>Admin Login – Voting Assistant</title>
</svelte:head>

<div class="container-read py-20">
  <div class="card p-8 md:p-10 max-w-md mx-auto">
    <div class="flex items-center gap-3 mb-6">
      <div class="w-10 h-10 rounded-full bg-brand text-white flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM5 8a7 7 0 1114 0v3a2 2 0 002 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 002-2V8z" />
        </svg>
      </div>
      <div>
        <p class="section-eyebrow mb-0.5">Geschützter Bereich</p>
        <h1 class="font-display text-2xl text-ink leading-none">Admin-Login</h1>
      </div>
    </div>

    <p class="text-sm text-ink-muted mb-6">
      Der Admin-Bereich ist für die Redaktion und Pflege der Abstimmungsdaten reserviert.
    </p>

    <form method="POST">
      <label for="password" class="label-field">Passwort</label>
      <!-- svelte-ignore a11y-autofocus -->
      <input
        id="password"
        name="password"
        type="password"
        autocomplete="current-password"
        required
        autofocus
        class="input-field {form?.incorrect ? 'input-error' : ''}"
        placeholder="••••••••••"
      />
      {#if form?.error}
        <p class="text-error">{form.error}</p>
      {/if}

      <button type="submit" class="btn-primary w-full mt-5">
        Anmelden
      </button>
    </form>

    <p class="text-xs text-ink-subtle text-center mt-6">
      <a href="/" class="source-link">← zurück zur App</a>
    </p>
  </div>
</div>
