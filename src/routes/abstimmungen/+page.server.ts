import type { PageServerLoad } from './$types';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();
  const sorted = all.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return { abstimmungen: sorted };
};
