import type { PageServerLoad } from './$types';
import { listAbstimmungen, getAllCommunityVotes } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const [abstimmungen, community] = await Promise.all([
    listAbstimmungen(),
    getAllCommunityVotes()
  ]);
  const rows = abstimmungen
    .map((a) => ({
      slug: a.slug,
      shortTitle: a.shortTitle,
      date: a.date,
      community: community[a.slug] ?? { ja: 0, nein: 0, total: 0 }
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return { rows };
};
