import { requireAdmin } from '../../../lib/admin-auth.js';
import { sanitizeHtml } from '../../../lib/sanitize.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { id, message } = await context.request.json();

  if (!id || !message?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Announcement ID and message are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeMessage = sanitizeHtml(message.trim()).substring(0, 10000);

  const result = await context.env.DB.prepare('UPDATE announcements SET message = ? WHERE id = ?')
    .bind(safeMessage, id)
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
