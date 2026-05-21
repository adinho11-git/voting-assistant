import type { PageServerLoad } from './$types';
import { getDaysUntil } from '$lib/mockData';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();
  const upcoming = all
    .filter((a) => a.status === 'anstehend' && a.type === 'eidgenössisch')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const past = all
    .filter((a) => a.status === 'vergangen' && a.type === 'eidgenössisch')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return {
    upcoming,
    past,
    daysUntil: upcoming[0] ? getDaysUntil(upcoming[0].date) : 0
  };
};
