import type { PageServerLoad } from './$types';
import { PARTEIEN } from '$lib/parteiData';
import { listAbstimmungen } from '$lib/server/dataLayer';

const PUBLIC_CACHE = 'public, max-age=0, s-maxage=60, stale-while-revalidate=300';

export const load: PageServerLoad = async ({ setHeaders }) => {
  setHeaders({ 'cache-control': PUBLIC_CACHE });

  const all = await listAbstimmungen();
  // Take the 2 anstehende + 2 most recent vergangene for the compare matrix
  const upcoming = all.filter((a) => a.status === 'anstehend' && a.type === 'eidgenössisch');
  const past = all
    .filter((a) => a.status === 'vergangen' && a.type === 'eidgenössisch')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);
  return { parteien: PARTEIEN, matrixAbstimmungen: [...upcoming, ...past] };
};
