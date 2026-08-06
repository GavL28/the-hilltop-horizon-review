export async function onRequestGet(context) {
    try {
      const db = context.env.DB;
  
      // 1. Fetch the active current issue
      const currentIssue = await db.prepare(
        'SELECT id, title, content_html, published_at FROM issues WHERE is_current = 1 ORDER BY published_at DESC LIMIT 1'
      ).first();
  
      // 2. Fetch all past issues
      const { results: pastIssues } = await db.prepare(
        'SELECT id, title, content_html, published_at FROM issues WHERE is_current = 0 ORDER BY published_at DESC'
      ).all();
  
      // 3. Fetch the most recent announcement
      const announcement = await db.prepare(
        'SELECT message, created_at FROM announcements ORDER BY created_at DESC LIMIT 1'
      ).first();

      // 4. Fetch all digital magazine editions
      const { results: digitalEditions } = await db.prepare(
        'SELECT id, title, url FROM digital_editions ORDER BY created_at ASC'
      ).all();

      // 5. Fetch all selected works (issues + their pieces)
      const { results: swIssues } = await db.prepare(
        'SELECT id, title FROM selected_works_issues ORDER BY created_at ASC'
      ).all();
      const { results: swPieces } = await db.prepare(
        'SELECT id, issue_id, title, author, genre, content FROM selected_works_pieces'
      ).all();
      const selectedWorks = swIssues.map((issue) => ({
        id: issue.id,
        title: issue.title,
        pieces: swPieces.filter((piece) => piece.issue_id === issue.id),
      }));

      return new Response(JSON.stringify({ 
        success: true, 
        currentIssue, 
        pastIssues, 
        announcement,
        digitalEditions,
        selectedWorks
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