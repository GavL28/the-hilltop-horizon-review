async function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

// GET /api/stats  -> current visit count (no increment)
export async function onRequestGet(context) {
  try {
    const row = await context.env.DB.prepare('SELECT total_visits FROM visit_stats WHERE id = 1').first();
    return json({ success: true, totalVisits: row ? row.total_visits : 0 });
  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
}

// POST /api/stats -> increment the visit count and return the new value
export async function onRequestPost(context) {
  try {
    await context.env.DB.prepare('UPDATE visit_stats SET total_visits = total_visits + 1 WHERE id = 1').run();
    const row = await context.env.DB.prepare('SELECT total_visits FROM visit_stats WHERE id = 1').first();
    return json({ success: true, totalVisits: row.total_visits });
  } catch (err) {
    return json({ success: false, error: err.message }, 500);
  }
}
