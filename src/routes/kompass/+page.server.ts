import type { PageServerLoad } from './$types';
import { listAbstimmungen } from '$lib/server/dataLayer';
import { buildKompassFragen } from '$lib/kompass';

export const load: PageServerLoad = async () => {
  const all = await listAbstimmungen();
  const fragen = buildKompassFragen(all);
  return { abstimmungen: all, fragen };
};
