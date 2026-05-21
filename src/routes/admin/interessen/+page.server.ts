import type { PageServerLoad } from './$types';
import { listInteressen } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const interessen = await listInteressen();
  return { interessen };
};
