<script lang="ts">
  import type { ActionData } from './$types';
  export let form: ActionData;

  function val(name: string): string {
    const v = form?.values?.[name];
    return typeof v === 'string' ? v : '';
  }
</script>

<svelte:head>
  <title>Neue Abstimmung – Admin</title>
</svelte:head>

<section class="container-read pt-8 pb-16">
  <a href="/admin/abstimmungen" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark mb-6">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Alle Abstimmungen
  </a>

  <p class="section-eyebrow mb-2">Erfassen</p>
  <h1 class="font-display text-3xl text-ink mb-2">Neue Abstimmung</h1>
  <p class="text-ink-muted mb-8">Nach dem Speichern kannst du Argumente und Parteipositionen einzeln hinzufügen.</p>

  <form method="POST" class="space-y-5">
    <div class="card p-6">
      <p class="section-eyebrow mb-4">Grunddaten</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div class="sm:col-span-2">
          <label for="title" class="label-field">Vollständiger Titel <span class="text-brand">*</span></label>
          <input id="title" name="title" type="text" required value={val('title')} class="input-field {form?.errors?.title ? 'input-error' : ''}" />
          {#if form?.errors?.title}<p class="text-error">{form.errors.title}</p>{/if}
        </div>
        <div>
          <label for="shortTitle" class="label-field">Kurztitel <span class="text-brand">*</span></label>
          <input id="shortTitle" name="shortTitle" type="text" required value={val('shortTitle')} class="input-field {form?.errors?.shortTitle ? 'input-error' : ''}" />
          {#if form?.errors?.shortTitle}<p class="text-error">{form.errors.shortTitle}</p>{/if}
        </div>
        <div>
          <label for="slug" class="label-field">URL-Slug <span class="text-ink-subtle text-xs">(optional, wird sonst auto-generiert)</span></label>
          <input id="slug" name="slug" type="text" value={val('slug')} class="input-field {form?.errors?.slug ? 'input-error' : ''}" placeholder="z.b. neue-vorlage-2026" />
          {#if form?.errors?.slug}<p class="text-error">{form.errors.slug}</p>{/if}
        </div>
        <div>
          <label for="date" class="label-field">Abstimmungsdatum <span class="text-brand">*</span></label>
          <input id="date" name="date" type="date" required value={val('date')} class="input-field {form?.errors?.date ? 'input-error' : ''}" />
          {#if form?.errors?.date}<p class="text-error">{form.errors.date}</p>{/if}
        </div>
        <div>
          <label for="category" class="label-field">Kategorie <span class="text-brand">*</span></label>
          <input id="category" name="category" type="text" required value={val('category')} placeholder="z.B. Klimaschutz · Energiepolitik" class="input-field {form?.errors?.category ? 'input-error' : ''}" />
          {#if form?.errors?.category}<p class="text-error">{form.errors.category}</p>{/if}
        </div>
        <div>
          <label for="readTime" class="label-field">Lesezeit (Minuten)</label>
          <input id="readTime" name="readTime" type="number" min="1" max="20" value={val('readTime') || '3'} class="input-field" />
        </div>
      </div>
    </div>

    <div class="card p-6">
      <p class="section-eyebrow mb-4">KI-Zusammenfassung</p>
      <textarea name="aiSummary" rows="5" required class="input-field {form?.errors?.aiSummary ? 'input-error' : ''}" placeholder="Neutrale, faktenbasierte Zusammenfassung der Vorlage in 3–5 Sätzen.">{val('aiSummary')}</textarea>
      {#if form?.errors?.aiSummary}<p class="text-error">{form.errors.aiSummary}</p>{/if}
    </div>

    <div class="card p-6">
      <p class="section-eyebrow mb-4">Empfehlungen &amp; Parlament</p>
      <div class="grid sm:grid-cols-2 gap-4">
        <div>
          <label for="bundesratPosition" class="label-field">Bundesrat</label>
          <select id="bundesratPosition" name="bundesratPosition" class="input-field">
            <option value="JA" selected={val('bundesratPosition') === 'JA'}>JA</option>
            <option value="NEIN" selected={val('bundesratPosition') === 'NEIN' || !val('bundesratPosition')}>NEIN</option>
          </select>
        </div>
        <div>
          <label for="parlamentPosition" class="label-field">Parlament</label>
          <select id="parlamentPosition" name="parlamentPosition" class="input-field">
            <option value="JA" selected={val('parlamentPosition') === 'JA'}>JA</option>
            <option value="NEIN" selected={val('parlamentPosition') === 'NEIN' || !val('parlamentPosition')}>NEIN</option>
          </select>
        </div>
        <div>
          <label for="parlamentJa" class="label-field">Parlament: JA-Stimmen</label>
          <input id="parlamentJa" name="parlamentJa" type="number" min="0" max="246" value={val('parlamentJa') || '0'} class="input-field" />
        </div>
        <div>
          <label for="parlamentNein" class="label-field">Parlament: NEIN-Stimmen</label>
          <input id="parlamentNein" name="parlamentNein" type="number" min="0" max="246" value={val('parlamentNein') || '0'} class="input-field" />
        </div>
      </div>
    </div>

    <div class="flex gap-3">
      <button type="submit" class="btn-primary">Abstimmung anlegen</button>
      <a href="/admin/abstimmungen" class="btn-ghost">Abbrechen</a>
    </div>
  </form>
</section>
