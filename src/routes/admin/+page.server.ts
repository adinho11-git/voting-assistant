import type { PageServerLoad } from './$types';
import { listAbstimmungen, listInteressen, getAllCommunityVotes, shouldUseMock } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const [abstimmungen, interessen, community] = await Promise.all([
    listAbstimmungen(),
    listInteressen(),
    getAllCommunityVotes()
  ]);
  return {
    abstimmungenCount: abstimmungen.length,
    interessenCount: interessen.length,
    communityVotesTotal: Object.values(community).reduce((sum, c) => sum + c.total, 0),
    usingMock: shouldUseMock()
  };
};
