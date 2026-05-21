import { redirect, type Handle } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

const ADMIN_COOKIE = 'admin_session';

export const handle: Handle = async ({ event, resolve }) => {
  const { url, cookies } = event;
  const expectedPwd = env.ADMIN_PASSWORD ?? 'zhaw2026admin';
  const sessionCookie = cookies.get(ADMIN_COOKIE);
  const isAuthed = sessionCookie === expectedPwd;
  event.locals.adminAuthed = isAuthed;

  const path = url.pathname;
  if (path.startsWith('/admin') && path !== '/admin/login' && !isAuthed) {
    throw redirect(302, '/admin/login');
  }
  if (path === '/admin/login' && isAuthed) {
    throw redirect(302, '/admin');
  }

  return resolve(event);
};
