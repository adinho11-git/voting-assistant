import { getAbstimmungBySlug } from '$lib/mockData';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const abstimmung = getAbstimmungBySlug(params.slug);
  if (!abstimmung) throw error(404, 'Abstimmung nicht gefunden');
  return { abstimmung };
};
