import { redirect, type Actions } from '@sveltejs/kit';

export const actions: Actions = {
  default: async ({ cookies }) => {
    cookies.delete('admin_session', { path: '/' });
    throw redirect(303, '/admin/login');
  }
};

export const load = () => {
  throw redirect(302, '/admin/login');
};
