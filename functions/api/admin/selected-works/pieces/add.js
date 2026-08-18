import { requireAdmin } from '../../../../lib/admin-auth.js';

const GENRES = ['Poetry', 'Fiction', 'Nonfiction', 'Art', 'Photography'];

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  const { issueId, title, author, genre, content, bio, pieceFont } = await context.request.json();

  if (!issueId || !title?.trim() || !author?.trim() || !content?.trim()) {
    return new Response(JSON.stringify({ success: false, error: 'Issue, title, author, and content are required' }), {
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

  // Make sure the issue exists
  const issue = await context.env.DB.prepare('SELECT id FROM selected_works_issues WHERE id = ?')
    .bind(issueId)
    .first();
  if (!issue) {
    return new Response(JSON.stringify({ success: false, error: 'Issue not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const id = crypto.randomUUID();
  const font = pieceFont || 'times';
  await context.env.DB.prepare(
    'INSERT INTO selected_works_pieces (id, issue_id, title, author, genre, content, bio, piece_font) VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(id, issueId, title.trim(), author.trim(), genre, content, bio?.trim() || '', font).run();

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
