import { error, fail, redirect, type Actions, type PageServerLoad } from '@sveltejs/kit';
import {
  getAbstimmung,
  updateAbstimmung,
  addArgument,
  removeArgument,
  setParteiPosition
} from '$lib/server/dataLayer';
import type { Argument, Partei, ParteiKuerzel, Position } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
  const abstimmung = await getAbstimmung(params.slug);
  if (!abstimmung) throw error(404, 'Abstimmung nicht gefunden');
  return { abstimmung };
};

export const actions: Actions = {
  meta: async ({ params, request }) => {
    if (!params.slug) return fail(400, { error: 'Missing slug' });
    const data = await request.formData();
    const patch = {
      title: String(data.get('title') ?? '').trim(),
      shortTitle: String(data.get('shortTitle') ?? '').trim(),
      date: String(data.get('date') ?? '').trim(),
      category: String(data.get('category') ?? '').trim(),
      aiSummary: String(data.get('aiSummary') ?? '').trim(),
      readTime: parseInt(String(data.get('readTime') ?? '3'), 10) || 3,
      bundesratPosition: String(data.get('bundesratPosition') ?? 'JA') as Position,
      parlamentPosition: String(data.get('parlamentPosition') ?? 'JA') as Position,
      parlamentStimmen: {
        ja: parseInt(String(data.get('parlamentJa') ?? '0'), 10) || 0,
        nein: parseInt(String(data.get('parlamentNein') ?? '0'), 10) || 0
      }
    };
    const updated = await updateAbstimmung(params.slug, patch);
    if (!updated) return fail(404, { error: 'Nicht gefunden' });
    return { success: true, section: 'meta' };
  },

  addArg: async ({ params, request }) => {
    if (!params.slug) return fail(400, { error: 'Missing slug' });
    const data = await request.formData();
    const side = String(data.get('side') ?? 'pro') as 'pro' | 'contra';
    const text = String(data.get('text') ?? '').trim();
    const source = String(data.get('source') ?? '').trim();
    const sourceUrl = String(data.get('sourceUrl') ?? '').trim();
    const detail = String(data.get('detail') ?? '').trim() || undefined;
    if (!text || !source) return fail(400, { error: 'Text und Quelle sind Pflicht', section: 'arg' });
    const arg: Argument = {
      id: `${side}-${Date.now()}`,
      text,
      source,
      sourceUrl: sourceUrl || '#',
      detail
    };
    await addArgument(params.slug, side, arg);
    throw redirect(303, `/admin/abstimmungen/${params.slug}/edit#args`);
  },

  removeArg: async ({ params, request }) => {
    if (!params.slug) return fail(400, { error: 'Missing slug' });
    const data = await request.formData();
    const side = String(data.get('side') ?? 'pro') as 'pro' | 'contra';
    const argId = String(data.get('argId') ?? '');
    await removeArgument(params.slug, side, argId);
    throw redirect(303, `/admin/abstimmungen/${params.slug}/edit#args`);
  },

  parteien: async ({ params, request }) => {
    if (!params.slug) return fail(400, { error: 'Missing slug' });
    const a = await getAbstimmung(params.slug);
    if (!a) return fail(404, { error: 'Nicht gefunden' });
    const data = await request.formData();

    const next: Partei[] = a.parteien.map((p) => {
      const positionKey = `pos_${p.kuerzel}`;
      const statementKey = `stmt_${p.kuerzel}`;
      const newPos = String(data.get(positionKey) ?? p.position) as Position;
      const newStmt = String(data.get(statementKey) ?? p.statement).trim();
      return {
        ...p,
        kuerzel: p.kuerzel as ParteiKuerzel,
        position: newPos,
        statement: newStmt
      };
    });

    await setParteiPosition(params.slug, next);
    return { success: true, section: 'parteien' };
  }
};
