export async function onRequestPost(context) {
    try {
      const { password } = await context.request.json();
      const correctPassword = context.env.ADMIN_PASSWORD;
  
      // 1. Check if the environment variable even exists
      if (!correctPassword) {
        return new Response(JSON.stringify({ success: false, error: 'ADMIN_PASSWORD environment variable is missing.' }), { 
          status: 500, 
          headers: { 'Content-Type': 'application/json' } 
        });
      }
  
      // 2. Validate password
      if (password !== correctPassword) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid password' }), { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        });
      }
  
      // 3. Generate token and save to DB
      const token = crypto.randomUUID();
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
      await context.env.DB.prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)')
        .bind(token, expiresAt.toISOString())
        .run();
  
      // 4. Return success with cookie
      const response = new Response(JSON.stringify({ success: true }), { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
      
      response.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Strict`);
      return response;
  
    } catch (err) {
      // 5. Catch any fatal crashes and return them as JSON
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }