export async function onRequestGet(context) {
    try {
      const db = context.env.DB;
  
      // 1. Fetch the active current issue
      const currentIssue = await db.prepare(
        'SELECT id, title, content_html, published_at FROM issues WHERE is_current = 1 ORDER BY published_at DESC LIMIT 1'
      ).first();
  
      // 2. Fetch all past issues
      const { results: pastIssues } = await db.prepare(
        'SELECT id, title, published_at FROM issues WHERE is_current = 0 ORDER BY published_at DESC'
      ).all();
  
      // 3. Fetch the most recent announcement
      const announcement = await db.prepare(
        'SELECT message, created_at FROM announcements ORDER BY created_at DESC LIMIT 1'
      ).first();
  
      return new Response(JSON.stringify({ 
        success: true, 
        currentIssue, 
        pastIssues, 
        announcement 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
  
    } catch (err) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }
  }