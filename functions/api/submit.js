export async function onRequestPost(context) {
    try {
      const inputData = await context.request.json();
      const { token, name, email, message } = inputData;
  
      // 1. Ensure token is provided
      if (!token) {
        return new Response(JSON.stringify({ success: false, error: 'Captcha token missing' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // 2. Prepare payload for Cloudflare siteverify API
      const secretKey = context.env.TURNSTILE_SECRET_KEY; // Stored securely in Cloudflare Environment Variables
      const verifyUrl = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
  
      const formData = new URLSearchParams();
      formData.append('secret', secretKey);
      formData.append('response', token);
  
      // 3. Call Cloudflare's siteverify endpoint
      const result = await fetch(verifyUrl, {
        body: formData,
        method: 'POST',
      });
  
      const outcome = await result.json();
  
      // 4. Check if verification succeeded
      if (!outcome.success) {
        return new Response(JSON.stringify({ success: false, error: 'Captcha verification failed' }), {
          status: 403,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      // 5. Captcha passed! Proceed to save data to database or send email
      // TODO: Insert your database saving logic here (e.g., Cloudflare D1)
  
      return new Response(JSON.stringify({ success: true, message: 'Form submitted successfully!' }), {
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