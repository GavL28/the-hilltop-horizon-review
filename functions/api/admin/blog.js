import { requireAdmin } from '../../lib/admin-auth.js';
import { sanitizeHtml } from '../../lib/sanitize.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function ensureTable(db) {
  await db.prepare(`
    CREATE TABLE IF NOT EXISTS blog_posts (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      subtitle TEXT,
      author TEXT NOT NULL,
      reading_time TEXT,
      category TEXT,
      content_html TEXT NOT NULL,
      cover_image TEXT,
      published_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )
  `).run();
}

function cleanText(value, max = 500) {
  return String(value ?? '').trim().slice(0, max);
}

function cleanDate(value, fallback) {
  if (!value) return fallback;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? fallback : date.toISOString();
}

function cleanImage(value) {
  const image = String(value ?? '').trim();
  if (!image) return '';
  if (/^data:image\/(png|jpeg|jpg|gif|webp);base64,/i.test(image) && image.length <= 4000000) return image;
  if (/^https?:\/\//i.test(image) && image.length <= 2000) return image;
  return null;
}

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  let body;
  try {
    body = await context.request.json();
  } catch {
    return json({ success: false, error: 'Invalid request body' }, 400);
  }

  const action = cleanText(body.action, 20);
  const db = context.env.DB;
  const now = new Date().toISOString();

  try {
    await ensureTable(db);

    if (action === 'delete') {
      const id = cleanText(body.id, 100);
      if (!id) return json({ success: false, error: 'Post id is required' }, 400);
      await db.prepare('DELETE FROM blog_posts WHERE id = ?').bind(id).run();
      return json({ success: true });
    }

    if (action !== 'add' && action !== 'edit') {
      return json({ success: false, error: 'Unknown action' }, 400);
    }

    const title = cleanText(body.title, 200);
    const author = cleanText(body.author, 160);
    const contentHtml = sanitizeHtml(body.contentHtml);
    if (!title || !author || !contentHtml.trim()) {
      return json({ success: false, error: 'Title, author, and content are required' }, 400);
    }

    const subtitle = cleanText(body.subtitle, 300);
    const readingTime = cleanText(body.readingTime, 60) || '3 min read';
    const category = cleanText(body.category, 80) || 'Blog';
    const publishedAt = cleanDate(body.publishedAt, now);
    const coverImage = cleanImage(body.coverImage);
    if (coverImage === null) {
      return json({ success: false, error: 'Cover image must be a supported image upload or http(s) URL under 4 MB' }, 400);
    }

    if (action === 'add') {
      const id = crypto.randomUUID();
      await db.prepare(`
        INSERT INTO blog_posts (id, title, subtitle, author, reading_time, category, content_html, cover_image, published_at, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).bind(id, title, subtitle, author, readingTime, category, contentHtml, coverImage, publishedAt, now, now).run();
      return json({ success: true, id });
    }

    const id = cleanText(body.id, 100);
    if (!id) return json({ success: false, error: 'Post id is required' }, 400);
    await db.prepare(`
      UPDATE blog_posts
      SET title = ?, subtitle = ?, author = ?, reading_time = ?, category = ?, content_html = ?, cover_image = ?, published_at = ?, updated_at = ?
      WHERE id = ?
    `).bind(title, subtitle, author, readingTime, category, contentHtml, coverImage, publishedAt, now, id).run();
    return json({ success: true, id });
  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
}
