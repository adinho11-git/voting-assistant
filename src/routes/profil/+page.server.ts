import type { PageServerLoad } from './$types';
import { listAbstimmungen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const abstimmungen = await listAbstimmungen();
  return { abstimmungen };
};
