import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { listInteressen } from '$lib/server/dataLayer';

function csvCell(v: string | undefined): string {
  if (v === undefined || v === null) return '';
  const s = String(v).replace(/"/g, '""');
  return /[",\n;]/.test(s) ? `"${s}"` : s;
}

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.adminAuthed) throw error(401, 'Unauthorized');

  const rows = await listInteressen();
  const header = ['Datum', 'Partei', 'Name', 'E-Mail', 'Nachricht'].join(';');
  const body = rows
    .map((r) => [r.createdAt, r.parteiKuerzel, r.name, r.email, r.nachricht ?? ''].map(csvCell).join(';'))
    .join('\n');
  const csv = `${header}\n${body}\n`;

  return new Response(`﻿${csv}`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="interessen-${new Date().toISOString().slice(0, 10)}.csv"`
    }
  });
};
