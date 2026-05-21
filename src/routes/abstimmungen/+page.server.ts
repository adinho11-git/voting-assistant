import type { PageServerLoad } from './$types';
import { listAbstimmungen } from '$lib/server/dataLayer';
import { cantonalDemoAbstimmungen } from '$lib/realData';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();
  return {
    abstimmungen: all,
    cantonal: cantonalDemoAbstimmungen
  };
};
