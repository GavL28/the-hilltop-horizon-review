import { requireAdmin } from '../lib/admin-auth.js';

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function ensureTable(db) {
  await db.prepare('CREATE TABLE IF NOT EXISTS reached_nations (nation_id TEXT PRIMARY KEY)').run();
}

export async function onRequestGet(context) {
  try {
    const db = context.env.DB;
    await ensureTable(db);
    const { results } = await db.prepare('SELECT nation_id FROM reached_nations ORDER BY nation_id').all();
    return json({ success: true, nations: results.map((row) => row.nation_id) });
  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
}

export async function onRequestPost(context) {
  const auth = await requireAdmin(context);
  if (auth.error) return auth.error;

  try {
    const { nations } = await context.request.json();
    if (!Array.isArray(nations)) {
      return json({ success: false, error: 'nations must be an array' }, 400);
    }

    const ids = [...new Set(nations.filter((id) => typeof id === 'string' && id.trim()).map((id) => id.trim()))].slice(0, 300);
    const db = context.env.DB;
    await ensureTable(db);
    await db.prepare('DELETE FROM reached_nations').run();
    for (const id of ids) {
      await db.prepare('INSERT INTO reached_nations (nation_id) VALUES (?)').bind(id).run();
    }
    return json({ success: true, nations: ids });
  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
}
