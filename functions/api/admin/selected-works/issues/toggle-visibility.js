import { requireAdmin } from '../../../../lib/admin-auth.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { id } = await context.request.json();

  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'Issue ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let currentVisibility;
  try {
    const row = await context.env.DB.prepare(
      'SELECT is_visible FROM selected_works_issues WHERE id = ?'
    ).bind(id).first();
    if (!row) {
      return new Response(JSON.stringify({ success: false, error: 'Issue not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    currentVisibility = row.is_visible ?? 1;
  } catch {
    return new Response(JSON.stringify({ success: false, error: 'Visibility column not yet available. Run migration 0010.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const newVisibility = currentVisibility === 1 ? 0 : 1;
  await context.env.DB.prepare(
    'UPDATE selected_works_issues SET is_visible = ? WHERE id = ?'
  ).bind(newVisibility, id).run();

  return new Response(JSON.stringify({ success: true, is_visible: newVisibility }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
