import type { PageServerLoad } from './$types';
import { FRAGEN } from '$lib/kompass';

export const load: PageServerLoad = async () => {
  return { fragen: FRAGEN };
};
