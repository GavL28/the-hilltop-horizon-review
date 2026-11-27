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

export async function onRequestGet(context) {
  try {
    const db = context.env.DB;
    await ensureTable(db);
    const { results } = await db.prepare(`
      SELECT id, title, subtitle, author, reading_time, category, content_html, cover_image, published_at, created_at, updated_at
      FROM blog_posts
      ORDER BY published_at DESC, created_at DESC
    `).all();
    return json({ success: true, posts: results });
  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
}
