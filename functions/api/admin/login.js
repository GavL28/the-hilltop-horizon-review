const MAX_FAILED = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(context) {
  const cf = context.request.headers.get('CF-Connecting-IP');
  return cf || context.request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown';
}

export async function onRequestPost(context) {
    try {
      const { password } = await context.request.json();
      const correctPassword = context.env.ADMIN_PASSWORD;
      const ip = getClientIp(context);
      const db = context.env.DB;

      // 1. Check if the environment variable even exists
      if (!correctPassword) {
        return new Response(JSON.stringify({ success: false, error: 'ADMIN_PASSWORD environment variable is missing.' }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 2. Rate limit: track failed attempts per IP
      try {
        const attempt = await db.prepare('SELECT failed, first_at, last_at FROM login_attempts WHERE ip = ?')
          .bind(ip).first();
        if (attempt) {
          const windowMs = (new Date(attempt.first_at).getTime() || Date.now());
          const now = Date.now();
          const canReset = (now - windowMs) > WINDOW_MS;
          const failedCount = canReset ? 0 : (attempt.failed || 0);
          if (failedCount >= MAX_FAILED) {
            return new Response(JSON.stringify({ success: false, error: 'Too many failed attempts. Please wait a while and try again.' }), {
              status: 429,
              headers: { 'Content-Type': 'application/json' },
            });
          }
        }
      } catch {
        // If login_attempts table is missing (migration not applied), skip rate limiting.
      }

      // 3. Validate password
      if (password !== correctPassword) {
        // record a failed attempt (best-effort)
        try {
          await db.prepare(`
            INSERT INTO login_attempts (ip, failed, first_at, last_at)
            VALUES (?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT(ip) DO UPDATE SET
              failed = CASE WHEN strftime('%s', 'now') - strftime('%s', first_at) > ${WINDOW_MS / 1000} THEN 1 ELSE failed + 1 END,
              first_at = CASE WHEN strftime('%s', 'now') - strftime('%s', first_at) > ${WINDOW_MS / 1000} THEN CURRENT_TIMESTAMP ELSE first_at END,
              last_at = CURRENT_TIMESTAMP
          `).bind(ip).run();
        } catch { /* ignore */ }
        return new Response(JSON.stringify({ success: false, error: 'Invalid password' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' },
        });
      }

      // 4. On success, clear any failed attempts for this IP
      try {
        await db.prepare('DELETE FROM login_attempts WHERE ip = ?').bind(ip).run();
      } catch { /* ignore */ }

      // 5. Generate token and save to DB
      const token = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      await db.prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)')
        .bind(token, expiresAt.toISOString())
        .run();

      // 6. Return success with cookie
      const response = new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });

      response.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Strict`);
      return response;

    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }