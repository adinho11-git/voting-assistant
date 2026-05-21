import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAbstimmung } from '$lib/server/dataLayer';

export const load: PageServerLoad = async ({ params }) => {
  const abstimmung = await getAbstimmung(params.slug);
  if (!abstimmung) throw error(404, 'Abstimmung nicht gefunden');
  return { abstimmung };
};
