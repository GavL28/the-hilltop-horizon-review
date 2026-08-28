import { requireAdmin } from '../../lib/admin-auth.js';
import { sanitizeHtml } from '../../lib/sanitize.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { issueId, title, contentHtml } = await context.request.json();

  if (!issueId || !title?.trim() || !contentHtml?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Missing required fields' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeTitle = title.trim().substring(0, 500);
  const safeContent = sanitizeHtml(contentHtml);

  const result = await context.env.DB.prepare(
    'UPDATE issues SET title = ?, content_html = ? WHERE id = ?'
  ).bind(safeTitle, safeContent, issueId).run();

  if (result.meta.changes === 0) {
    return new Response(JSON.stringify({ success: false, error: 'Issue not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
