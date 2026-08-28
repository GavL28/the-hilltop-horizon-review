export async function onRequestPost(context) {
    try {
      const inputData = await context.request.json();
      const { name, country, token } = inputData;
      const email = (inputData.email || '').toLowerCase().trim();

      // Basic input validation / length caps
      if (typeof name !== 'string' || name.length > 200) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid name' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (typeof country !== 'string' || country.length > 100) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid country' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 320) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid email' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
      
      // 1. Verify Turnstile Captcha token first
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
  
      // 2. Check for duplicate email in D1 Database
      const db = context.env.DB;
      const subscriberId = crypto.randomUUID();
      
      // UPSERT: If email exists, update name, country, and reactivate. If not, insert new.
      await db.prepare(`
        INSERT INTO subscribers (id, name, email, country, is_active) 
        VALUES (?, ?, ?, ?, 1)
        ON CONFLICT(email) DO UPDATE SET 
          name = excluded.name,
          country = excluded.country,
          is_active = 1
      `)
      .bind(subscriberId, name, email, country)
      .run();
  
      return new Response(JSON.stringify({ success: true, message: 'Subscribed successfully!' }), {
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