import type { PageServerLoad } from './$types';
import { listAbstimmungen } from '$lib/server/dataLayer';

const PUBLIC_CACHE = 'public, max-age=0, s-maxage=60, stale-while-revalidate=300';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ 'cache-control': PUBLIC_CACHE });

  const all = await listAbstimmungen();

  return {
    abstimmungen: all.filter((a) => a.type === 'eidgenössisch')
  };
};
