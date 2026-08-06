import { requireAdmin } from '../../../../lib/admin-auth.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { id } = await context.request.json();

  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Delete the issue and all its pieces
  await context.env.DB.batch([
    context.env.DB.prepare('DELETE FROM selected_works_pieces WHERE issue_id = ?').bind(id),
    context.env.DB.prepare('DELETE FROM selected_works_issues WHERE id = ?').bind(id),
  ]);

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
