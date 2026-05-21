import type { PageServerLoad } from './$types';
import { PARTEIEN } from '$lib/parteiData';

export const load: PageServerLoad = async () => {
  return { parteien: PARTEIEN };
};
