<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import type { Argument } from '$lib/types';

  export let data: PageData;
  export let form: ActionData;

  $: a = data.abstimmung;

  interface ArgBucket {
    key: 'pro' | 'contra';
    label: string;
    items: Argument[];
    color: string;
  }

  $: buckets = [
    { key: 'pro', label: 'PRO', items: a.proArguments, color: 'var(--pro)' },
    { key: 'contra', label: 'CONTRA', items: a.contraArguments, color: 'var(--contra)' }
  ] as ArgBucket[];
</script>

<svelte:head>
  <title>Bearbeiten: {a.shortTitle} – Admin</title>
</svelte:head>

<section class="container-read pt-8 pb-20">
  <a href="/admin/abstimmungen" class="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-dark mb-6">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
    Alle Abstimmungen
  </a>

  <p class="section-eyebrow mb-2">Bearbeiten · Slug: {a.slug}</p>
  <h1 class="font-display text-3xl text-ink mb-2">{a.shortTitle}</h1>
  <a href="/abstimmungen/{a.slug}" target="_blank" rel="noopener" class="text-sm text-brand hover:underline mb-8 inline-block">
    Live-Ansicht öffnen ↗
  </a>

  {#if form?.success}
    <div class="card p-4 mb-6 bg-pro-light border-pro/40 text-pro font-semibold">
      ✓ Änderungen gespeichert ({form.section}).
    </div>
  {/if}

  <!-- META FORM -->
  <form method="POST" action="?/meta" class="card p-6 mb-6">
    <div class="flex items-center justify-between mb-4 border-b border-border-light pb-2">
      <p class="section-eyebrow">Grunddaten</p>
      <button type="submit" class="btn-primary text-sm">Speichern</button>
    </div>
    <div class="grid sm:grid-cols-2 gap-4">
      <div class="sm:col-span-2">
        <label for="m-title" class="label-field">Titel</label>
        <input id="m-title" name="title" type="text" value={a.title} class="input-field" required />
      </div>
      <div>
        <label for="m-short" class="label-field">Kurztitel</label>
        <input id="m-short" name="shortTitle" type="text" value={a.shortTitle} class="input-field" required />
      </div>
      <div>
        <label for="m-date" class="label-field">Datum</label>
        <input id="m-date" name="date" type="date" value={a.date} class="input-field" required />
      </div>
      <div>
        <label for="m-cat" class="label-field">Kategorie</label>
        <input id="m-cat" name="category" type="text" value={a.category} class="input-field" required />
      </div>
      <div>
        <label for="m-rt" class="label-field">Lesezeit (Min)</label>
        <input id="m-rt" name="readTime" type="number" min="1" max="20" value={a.readTime} class="input-field" />
      </div>
      <div class="sm:col-span-2">
        <label for="m-sum" class="label-field">KI-Zusammenfassung</label>
        <textarea id="m-sum" name="aiSummary" rows="4" class="input-field" required>{a.aiSummary}</textarea>
      </div>
      <div>
        <label for="m-br" class="label-field">Bundesrat</label>
        <select id="m-br" name="bundesratPosition" class="input-field">
          <option value="JA" selected={a.bundesratPosition === 'JA'}>JA</option>
          <option value="NEIN" selected={a.bundesratPosition === 'NEIN'}>NEIN</option>
        </select>
      </div>
      <div>
        <label for="m-pa" class="label-field">Parlament</label>
        <select id="m-pa" name="parlamentPosition" class="input-field">
          <option value="JA" selected={a.parlamentPosition === 'JA'}>JA</option>
          <option value="NEIN" selected={a.parlamentPosition === 'NEIN'}>NEIN</option>
        </select>
      </div>
      <div>
        <label for="m-pj" class="label-field">Parlament JA</label>
        <input id="m-pj" name="parlamentJa" type="number" min="0" value={a.parlamentStimmen.ja} class="input-field" />
      </div>
      <div>
        <label for="m-pn" class="label-field">Parlament NEIN</label>
        <input id="m-pn" name="parlamentNein" type="number" min="0" value={a.parlamentStimmen.nein} class="input-field" />
      </div>
    </div>
  </form>

  <!-- ARGUMENTS -->
  <div id="args" class="card p-6 mb-6">
    <div class="flex items-center justify-between mb-4 border-b border-border-light pb-2">
      <p class="section-eyebrow">Argumente</p>
      <span class="text-xs text-ink-muted">{a.proArguments.length} PRO · {a.contraArguments.length} CONTRA</span>
    </div>

    <div class="grid md:grid-cols-2 gap-6">
      {#each buckets as bucket}
        <div>
          <h3 class="font-display text-lg mb-3" style="color: {bucket.color};">{bucket.label}</h3>
          <div class="space-y-2 mb-4">
            {#each bucket.items as arg}
              <div class="border border-border-light rounded-lg p-3 text-sm">
                <p class="font-semibold text-ink mb-1">{arg.text}</p>
                <p class="text-xs text-ink-muted">Quelle: {arg.source}</p>
                <form method="POST" action="?/removeArg" class="mt-2">
                  <input type="hidden" name="side" value={bucket.key} />
                  <input type="hidden" name="argId" value={arg.id} />
                  <button type="submit" class="text-xs text-contra hover:underline">Entfernen</button>
                </form>
              </div>
            {/each}
            {#if bucket.items.length === 0}
              <p class="text-xs text-ink-muted italic">Noch keine Argumente.</p>
            {/if}
          </div>

          <details class="border border-border-light rounded-lg p-3">
            <summary class="text-sm font-semibold text-brand cursor-pointer">+ Argument hinzufügen</summary>
            <form method="POST" action="?/addArg" class="mt-3 space-y-2">
              <input type="hidden" name="side" value={bucket.key} />
              <input type="text" name="text" placeholder="Argument (1 Satz)" required class="input-field text-sm" />
              <div class="grid grid-cols-2 gap-2">
                <input type="text" name="source" placeholder="Quelle (z.B. BFE)" required class="input-field text-sm" />
                <input type="url" name="sourceUrl" placeholder="https://..." class="input-field text-sm" />
              </div>
              <textarea name="detail" rows="3" placeholder="Detail-Begründung (optional, mehrere Sätze)" class="input-field text-sm"></textarea>
              <button type="submit" class="btn-primary text-sm" style="background: {bucket.color};">Hinzufügen</button>
            </form>
          </details>
        </div>
      {/each}
    </div>
  </div>

  <!-- PARTEIEN -->
  <form method="POST" action="?/parteien" class="card p-6 mb-6">
    <div class="flex items-center justify-between mb-4 border-b border-border-light pb-2">
      <p class="section-eyebrow">Parteipositionen</p>
      <button type="submit" class="btn-primary text-sm">Speichern</button>
    </div>

    <div class="space-y-3">
      {#each a.parteien as p}
        <div class="border border-border-light rounded-lg p-3 grid md:grid-cols-[auto_1fr_auto] gap-3 items-center" style="border-left: 4px solid {p.color};">
          <div class="flex items-center gap-2 min-w-[80px]">
            <div class="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold" style="background: {p.color};">{p.kuerzel.slice(0, 4)}</div>
          </div>
          <input type="text" name="stmt_{p.kuerzel}" value={p.statement} placeholder="Statement der {p.kuerzel} ..." class="input-field text-sm" />
          <select name="pos_{p.kuerzel}" class="input-field text-sm w-28">
            <option value="JA" selected={p.position === 'JA'}>JA</option>
            <option value="NEIN" selected={p.position === 'NEIN'}>NEIN</option>
          </select>
        </div>
      {/each}
    </div>
  </form>
</section>
