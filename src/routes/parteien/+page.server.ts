import type { PageServerLoad } from './$types';
import { PARTEIEN } from '$lib/parteiData';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();
  // Take the 2 anstehende + 2 most recent vergangene for the compare matrix
  const upcoming = all.filter((a) => a.status === 'anstehend' && a.type === 'eidgenössisch');
  const past = all
    .filter((a) => a.status === 'vergangen' && a.type === 'eidgenössisch')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 2);
  return { parteien: PARTEIEN, matrixAbstimmungen: [...upcoming, ...past] };
};
