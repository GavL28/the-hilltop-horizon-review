import { requireAdmin } from '../../../lib/admin-auth.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { title, url } = await context.request.json();

  if (!title?.trim() || !url?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Title and URL are required' }), {
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

  const id = crypto.randomUUID();
  await context.env.DB.prepare('INSERT INTO digital_editions (id, title, url) VALUES (?, ?, ?)')
    .bind(id, title.trim(), url.trim())
    .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
