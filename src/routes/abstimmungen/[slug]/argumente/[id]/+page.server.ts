import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getAbstimmung } from '$lib/server/dataLayer';

export const load: PageServerLoad = async ({ params }) => {
  const abstimmung = await getAbstimmung(params.slug);
  if (!abstimmung) throw error(404, 'Abstimmung nicht gefunden');

  const allArgs = [...abstimmung.proArguments, ...abstimmung.contraArguments];
  const arg = allArgs.find((x) => x.id === params.id);
  if (!arg) throw error(404, 'Argument nicht gefunden');

  const isPro = abstimmung.proArguments.some((x) => x.id === params.id);
  const opposites = isPro ? abstimmung.contraArguments : abstimmung.proArguments;
  const opposite = opposites[0] ?? null;

  return { abstimmung, arg, isPro, opposite };
};
