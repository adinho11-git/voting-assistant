import type { PageServerLoad } from './$types';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();

  return {
    abstimmungen: all.filter((a) => a.type === 'eidgenössisch')
  };
};
