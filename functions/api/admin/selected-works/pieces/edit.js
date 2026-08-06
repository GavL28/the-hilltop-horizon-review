import { requireAdmin } from '../../../../lib/admin-auth.js';

const GENRES = ['Poetry', 'Fiction', 'Nonfiction', 'Art', 'Photography'];

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { id, issueId, title, author, genre, content } = await context.request.json();

  if (!id || !issueId || !title?.trim() || !author?.trim() || !content?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'ID, issue, title, author, and content are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!GENRES.includes(genre)) {
    return new Response(JSON.stringify({ success: false, error: 'Invalid genre' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const issue = await context.env.DB.prepare('SELECT id FROM selected_works_issues WHERE id = ?')
    .bind(issueId)
    .first();
  if (!issue) {
    return new Response(JSON.stringify({ success: false, error: 'Issue not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const result = await context.env.DB.prepare(
    'UPDATE selected_works_pieces SET issue_id = ?, title = ?, author = ?, genre = ?, content = ? WHERE id = ?'
  ).bind(issueId, title.trim(), author.trim(), genre, content, id).run();

  if (result.meta.changes === 0) {
    return new Response(JSON.stringify({ success: false, error: 'Piece not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
