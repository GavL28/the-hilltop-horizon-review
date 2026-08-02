export async function onRequestPost(context) {
    const { password } = await context.request.json();
    const correctPassword = context.env.ADMIN_PASSWORD;
  
    if (password !== correctPassword) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid password' }), { status: 401 });
    }
  
    // Generate a secure random token
    const token = crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
  
    // Save session to D1
    await context.env.DB.prepare('INSERT INTO admin_sessions (token, expires_at) VALUES (?, ?)')
      .bind(token, expiresAt.toISOString())
      .run();
  
    // Return the token as a secure, HTTP-only cookie
    const response = new Response(JSON.stringify({ success: true }), { status: 200 });
    response.headers.set('Set-Cookie', `admin_token=${token}; HttpOnly; Secure; Path=/; Max-Age=86400; SameSite=Strict`);
    
    return response;
  }