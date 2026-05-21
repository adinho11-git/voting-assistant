<script lang="ts">
  import { showToast } from '$lib/stores/toast';

  export let parteiKuerzel: string;
  export let parteiName: string;
  export let parteiFarbe: string;

  let name = '';
  let email = '';
  let nachricht = '';
  let isSubmitting = false;
  let submitted = false;

  let nameError = '';
  let emailError = '';

  const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function validate(): boolean {
    nameError = '';
    emailError = '';
    if (name.trim().length < 2) {
      nameError = 'Bitte gib deinen Namen an (min. 2 Zeichen).';
    }
    if (!EMAIL_RX.test(email.trim())) {
      emailError = 'Bitte gib eine gültige E-Mail-Adresse an.';
    }
    return !nameError && !emailError;
  }

  async function submit(): Promise<void> {
    if (!validate() || isSubmitting) return;
    isSubmitting = true;
    try {
      const res = await fetch('/api/parteien/interesse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parteiKuerzel,
          name: name.trim(),
          email: email.trim().toLowerCase(),
          nachricht: nachricht.trim() || undefined
        })
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText || 'Server-Fehler');
      }
      submitted = true;
      showToast(`Danke ${name.split(' ')[0]}! Dein Interesse an der ${parteiKuerzel} wurde registriert.`, 'success');
    } catch (err) {
      console.error(err);
      showToast('Senden fehlgeschlagen. Bitte später erneut versuchen.', 'error');
    } finally {
      isSubmitting = false;
    }
  }

  function reset(): void {
    submitted = false;
    name = '';
    email = '';
    nachricht = '';
    nameError = '';
    emailError = '';
  }
</script>

<div
  class="card p-6 md:p-8"
  style="border-top: 4px solid {parteiFarbe};"
>
  {#if submitted}
    <div class="text-center py-6">
      <div class="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style="background: {parteiFarbe}15; color: {parteiFarbe};">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 class="font-display text-xl text-ink mb-2">Danke für dein Interesse!</h3>
      <p class="text-sm text-ink-muted mb-5 max-w-md mx-auto">
        Deine Anfrage an die <strong>{parteiKuerzel}</strong> wurde registriert. Du erhältst eine Bestätigung an deine E-Mail-Adresse.
      </p>
      <button type="button" on:click={reset} class="btn-ghost">
        Weitere Anfrage senden
      </button>
    </div>
  {:else}
    <p class="section-eyebrow mb-2">Mitgestalten</p>
    <h3 class="font-display text-2xl text-ink mb-2">Interesse an der {parteiKuerzel} bekunden</h3>
    <p class="text-sm text-ink-muted mb-6 max-w-xl">
      Möchtest du mehr über die {parteiName} erfahren, an einer Veranstaltung teilnehmen oder dich engagieren? Sende uns dein Interesse — deine Anfrage wird vertraulich behandelt.
    </p>

    <form on:submit|preventDefault={submit} novalidate>
      <div class="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label for="interesse-name" class="label-field">Name <span class="text-brand">*</span></label>
          <input
            id="interesse-name"
            type="text"
            bind:value={name}
            class="input-field {nameError ? 'input-error' : ''}"
            placeholder="Vorname Nachname"
            autocomplete="name"
            required
            aria-invalid={!!nameError}
            aria-describedby={nameError ? 'name-error' : undefined}
          />
          {#if nameError}<p id="name-error" class="text-error">{nameError}</p>{/if}
        </div>
        <div>
          <label for="interesse-email" class="label-field">E-Mail <span class="text-brand">*</span></label>
          <input
            id="interesse-email"
            type="email"
            bind:value={email}
            class="input-field {emailError ? 'input-error' : ''}"
            placeholder="name@example.ch"
            autocomplete="email"
            required
            aria-invalid={!!emailError}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {#if emailError}<p id="email-error" class="text-error">{emailError}</p>{/if}
        </div>
      </div>

      <div class="mb-5">
        <label for="interesse-nachricht" class="label-field">Nachricht <span class="text-ink-subtle text-xs">(optional)</span></label>
        <textarea
          id="interesse-nachricht"
          bind:value={nachricht}
          class="input-field"
          rows="4"
          placeholder="Was interessiert dich besonders? Worüber möchtest du mehr erfahren?"
        />
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <button type="submit" class="btn-primary" style="background: {parteiFarbe};" disabled={isSubmitting}>
          {#if isSubmitting}
            Wird gesendet...
          {:else}
            Interesse registrieren
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          {/if}
        </button>
        <p class="text-xs text-ink-muted">
          Deine Anfrage wird vertraulich behandelt — keine Weitergabe an Dritte.
        </p>
      </div>
    </form>
  {/if}
</div>
