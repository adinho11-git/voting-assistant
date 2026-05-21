import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { listAbstimmungen, deleteAbstimmung } from '$lib/server/dataLayer';

export const load: PageServerLoad = async () => {
  const abstimmungen = await listAbstimmungen();
  abstimmungen.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  return { abstimmungen };
};

export const actions: Actions = {
  delete: async ({ request }) => {
    const data = await request.formData();
    const slug = data.get('slug');
    if (typeof slug !== 'string') return fail(400, { error: 'Missing slug' });
    await deleteAbstimmung(slug);
    throw redirect(303, '/admin/abstimmungen');
  }
};
