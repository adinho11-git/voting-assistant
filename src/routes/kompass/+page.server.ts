import type { PageServerLoad } from './$types';
import { FRAGEN } from '$lib/kompass';

const PUBLIC_CACHE = 'public, max-age=0, s-maxage=60, stale-while-revalidate=300';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ 'cache-control': PUBLIC_CACHE });

  return { fragen: FRAGEN };
};
