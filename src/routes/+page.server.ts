import type { PageServerLoad } from './$types';
import { getDaysUntil } from '$lib/mockData';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();
  const sorted = all.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const next = sorted[0];
  const rest = sorted.slice(1);

  return {
    next,
    rest,
    daysUntil: next ? getDaysUntil(next.date) : 0
  };
};
