import { mockAbstimmungen, getDaysUntil } from '$lib/mockData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const sorted = [...mockAbstimmungen].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const next = sorted[0];
  const rest = sorted.slice(1);

  return {
    next,
    rest,
    daysUntil: next ? getDaysUntil(next.date) : 0
  };
};
