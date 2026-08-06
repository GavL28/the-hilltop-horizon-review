import { requireAdmin } from '../../../lib/admin-auth.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { title } = await context.request.json();

  if (!title?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Title is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = crypto.randomUUID();
  await context.env.DB.prepare('INSERT INTO selected_works_issues (id, title) VALUES (?, ?)')
    .bind(id, title.trim())
    .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
