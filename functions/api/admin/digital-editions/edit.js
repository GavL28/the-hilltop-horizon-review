import { requireAdmin } from '../../../lib/admin-auth.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { id, title, url } = await context.request.json();

  if (!id || !title?.trim() || !url?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'ID, title, and URL are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!/^https?:\/\/.+/.test(url.trim())) {
    return new Response(JSON.stringify({ success: false, error: 'URL must start with http:// or https://' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await context.env.DB.prepare(
    'UPDATE digital_editions SET title = ?, url = ? WHERE id = ?'
  ).bind(title.trim(), url.trim(), id).run();

  if (result.meta.changes === 0) {
    return new Response(JSON.stringify({ success: false, error: 'Digital edition not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
