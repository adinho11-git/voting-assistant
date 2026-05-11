import { getArgumentById } from '$lib/mockData';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
  const result = getArgumentById(params.slug, params.id);
  if (!result) throw error(404, 'Argument nicht gefunden');
  return result;
};
