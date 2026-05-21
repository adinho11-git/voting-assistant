import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { recordCommunityVote, getCommunityVotes } from '$lib/server/dataLayer';
import type { Position } from '$lib/types';

function isPosition(value: unknown): value is Position {
  return value === 'JA' || value === 'NEIN';
}

export const POST: RequestHandler = async ({ params, request, cookies }) => {
  const slug = params.slug;
  if (!slug) throw error(400, 'Missing slug');

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    throw error(400, 'Invalid JSON');
  }

  const position = (body as { position?: unknown })?.position;
  if (!isPosition(position)) {
    throw error(400, 'Position must be "JA" or "NEIN"');
  }

  let clientId = cookies.get('voter_id');
  if (!clientId) {
    clientId = `c-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    cookies.set('voter_id', clientId, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365
    });
  }

  const result = await recordCommunityVote(slug, position, clientId);
  return json(result);
};

export const GET: RequestHandler = async ({ params }) => {
  const slug = params.slug;
  if (!slug) throw error(400, 'Missing slug');
  const result = await getCommunityVotes(slug);
  return json(result);
};
