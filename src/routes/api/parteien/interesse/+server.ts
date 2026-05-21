import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { addInteresse, listInteressen } from '$lib/server/dataLayer';
import { getParteiByKuerzel } from '$lib/parteiData';

const EMAIL_RX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface IncomingPayload {
  parteiKuerzel?: unknown;
  name?: unknown;
  email?: unknown;
  nachricht?: unknown;
}

export const POST: RequestHandler = async ({ request }) => {
  let body: IncomingPayload;
  try {
    body = (await request.json()) as IncomingPayload;
  } catch {
    throw error(400, 'Invalid JSON');
  }

  const parteiKuerzel = typeof body.parteiKuerzel === 'string' ? body.parteiKuerzel.trim() : '';
  const name = typeof body.name === 'string' ? body.name.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';
  const nachricht = typeof body.nachricht === 'string' ? body.nachricht.trim() : undefined;

  if (!parteiKuerzel || !getParteiByKuerzel(parteiKuerzel)) {
    throw error(400, 'Unbekannte Partei');
  }
  if (name.length < 2) throw error(400, 'Name zu kurz');
  if (!EMAIL_RX.test(email)) throw error(400, 'E-Mail ungültig');
  if (nachricht && nachricht.length > 2000) throw error(400, 'Nachricht zu lang');

  const entry = await addInteresse({ parteiKuerzel, name, email, nachricht });
  return json({ success: true, id: entry.id });
};

export const GET: RequestHandler = async () => {
  // Convenience endpoint for the admin panel — full security gate sits at /admin layer
  const all = await listInteressen();
  return json({ count: all.length });
};
