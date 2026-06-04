import { fail, redirect, type Actions } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const password = data.get('password');
    const expected = env.ADMIN_PASSWORD;

    if (!expected) {
      return fail(503, {
        error: 'Admin-Login ist nicht konfiguriert. Bitte ADMIN_PASSWORD in der Umgebung setzen.',
        missingConfig: true
      });
    }

    if (typeof password !== 'string' || password !== expected) {
      return fail(401, { error: 'Falsches Passwort.', incorrect: true });
    }

    cookies.set('admin_session', expected, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 8 // 8h
    });

    throw redirect(303, '/admin');
  }
};
