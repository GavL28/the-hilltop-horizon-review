export async function onRequestPost(context) {
    try {
      const { request, env } = context;
      const { id, title, contentHtml } = await request.json();
  
      if (!id || !title || !contentHtml) {
        return Response.json({ error: 'Missing required fields.' }, { status: 400 });
      }
  
      // Update the specific issue in the D1 database without changing its published date or status
      await env.DB.prepare(
        'UPDATE issues SET title = ?, content_html = ? WHERE id = ?'
      ).bind(title, contentHtml, id).run();
  
      return Response.json({ success: true });
    } catch (err) {
      return Response.json({ error: err.message }, { status: 500 });
    }
  }