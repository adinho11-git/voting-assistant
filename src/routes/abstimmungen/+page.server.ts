import { mockAbstimmungen } from '$lib/mockData';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  const sorted = [...mockAbstimmungen].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  return { abstimmungen: sorted };
};
