import { requireAdmin } from '../../../lib/admin-auth.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { id } = await context.request.json();

  if (!id) {
    return new Response(JSON.stringify({ success: false, error: 'Announcement ID is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await context.env.DB.prepare('DELETE FROM announcements WHERE id = ?')
    .bind(id)
    .run();

  if (result.meta.changes === 0) {
    return new Response(JSON.stringify({ success: false, error: 'Announcement not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
