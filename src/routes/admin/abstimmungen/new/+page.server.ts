import { fail, redirect, type Actions } from '@sveltejs/kit';
import { createAbstimmung } from '$lib/server/dataLayer';
import { PARTEIEN } from '$lib/parteiData';
import type { Abstimmung, Position, ParteiKuerzel } from '$lib/types';

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

export const actions: Actions = {
  default: async ({ request }) => {
    const data = await request.formData();
    const title = String(data.get('title') ?? '').trim();
    const shortTitle = String(data.get('shortTitle') ?? '').trim();
    const date = String(data.get('date') ?? '').trim();
    const category = String(data.get('category') ?? '').trim();
    const aiSummary = String(data.get('aiSummary') ?? '').trim();
    const readTimeStr = String(data.get('readTime') ?? '3').trim();
    const bundesratPosition = String(data.get('bundesratPosition') ?? 'JA') as Position;
    const parlamentPosition = String(data.get('parlamentPosition') ?? 'JA') as Position;
    const parlamentJa = parseInt(String(data.get('parlamentJa') ?? '0'), 10) || 0;
    const parlamentNein = parseInt(String(data.get('parlamentNein') ?? '0'), 10) || 0;
    const slugInput = String(data.get('slug') ?? '').trim();

    const errors: Record<string, string> = {};
    if (!title) errors.title = 'Titel fehlt';
    if (!shortTitle) errors.shortTitle = 'Kurztitel fehlt';
    if (!date) errors.date = 'Datum fehlt';
    if (!category) errors.category = 'Kategorie fehlt';
    if (!aiSummary || aiSummary.length < 20) errors.aiSummary = 'Zusammenfassung zu kurz';

    if (Object.keys(errors).length > 0) {
      return fail(400, { errors, values: Object.fromEntries(data) });
    }

    const slug = slugInput || slugify(shortTitle || title);

    // Initialize empty arguments + default party positions (all NEIN by default — editor fixes after)
    const parteien = PARTEIEN.map((p) => ({
      kuerzel: p.kuerzel as ParteiKuerzel,
      name: p.name,
      position: 'NEIN' as Position,
      statement: '',
      color: p.farbe
    }));

    const abstimmung: Abstimmung = {
      id: `manual-${Date.now()}`,
      slug,
      title,
      shortTitle,
      date,
      type: 'eidgenössisch',
      category,
      readTime: parseInt(readTimeStr, 10) || 3,
      status: 'anstehend',
      dataQuality: 'demo',
      bundesratPosition,
      parlamentPosition,
      parlamentStimmen: { ja: parlamentJa, nein: parlamentNein },
      aiSummary,
      summarySource: 'Admin-Erfassung',
      summarySourceUrl: '#',
      summaryLastChecked: new Date().toISOString().slice(0, 10),
      proArguments: [],
      contraArguments: [],
      parteien
    };

    try {
      await createAbstimmung(abstimmung);
    } catch (err) {
      return fail(400, { errors: { slug: (err as Error).message }, values: Object.fromEntries(data) });
    }

    throw redirect(303, `/admin/abstimmungen/${slug}/edit`);
  }
};
