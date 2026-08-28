import { requireAdmin } from '../../../lib/admin-auth.js';
import { sanitizeHtml } from '../../../lib/sanitize.js';

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { message } = await context.request.json();

  if (!message?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Message is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const safeMessage = sanitizeHtml(message.trim()).substring(0, 10000);

  const id = crypto.randomUUID();
  await context.env.DB.prepare('INSERT INTO announcements (id, message) VALUES (?, ?)')
    .bind(id, safeMessage)
    .run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
