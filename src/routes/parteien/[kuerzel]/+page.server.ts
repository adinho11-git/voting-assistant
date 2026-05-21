import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getParteiByKuerzel } from '$lib/parteiData';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async ({ params }) => {
  const partei = getParteiByKuerzel(params.kuerzel);
  if (!partei) throw error(404, 'Partei nicht gefunden');

  const all = await listAbstimmungen();
  const positionen = all
    .map((a) => {
      const p = a.parteien.find((x) => x.kuerzel === partei.kuerzel);
      return p ? { abstimmung: a, position: p.position, statement: p.statement } : null;
    })
    .filter(<T>(x: T | null): x is T => x !== null)
    .sort((a, b) => new Date(a.abstimmung.date).getTime() - new Date(b.abstimmung.date).getTime());

  return { partei, positionen };
};
