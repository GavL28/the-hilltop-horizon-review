export async function onRequestPost(context) {
    try {
      const inputData = await context.request.json();
      const { email, token } = inputData;
  
      // 1. Verify Turnstile Captcha token
      if (!token) {
        return new Response(JSON.stringify({ success: false, error: 'Captcha token missing' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      const secretKey = context.env.TURNSTILE_SECRET_KEY;
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
      const formData = new URLSearchParams();
      formData.append('secret', secretKey);
      formData.append('response', token);
  
      const captchaResult = await fetch(verifyUrl, { body: formData, method: 'POST' });
      const captchaOutcome = await captchaResult.json();
  
      if (!captchaOutcome.success) {
        return new Response(JSON.stringify({ success: false, error: 'Captcha verification failed' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // 2. Perform Soft Deletion
      const db = context.env.DB;
      
      // Check if user exists first
      const existing = await db.prepare('SELECT id FROM subscribers WHERE email = ?')
                               .bind(email)
                               .first();
  
      if (!existing) {
        return new Response(JSON.stringify({ success: false, error: 'Email not found in our database.' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // Set is_active to 0
      await db.prepare('UPDATE subscribers SET is_active = 0 WHERE email = ?')
              .bind(email)
              .run();
  
      return new Response(JSON.stringify({ success: true, message: 'Unsubscribed successfully.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
  
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }