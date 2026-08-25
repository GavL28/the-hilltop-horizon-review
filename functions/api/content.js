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

      // 3b. Fetch all announcements (newest first) for the Announcements tabs
      const { results: announcements } = await db.prepare(
        'SELECT id, message, created_at FROM announcements ORDER BY created_at DESC'
      ).all();

      // 4. Fetch all digital magazine editions
      const { results: digitalEditions } = await db.prepare(
        'SELECT id, title, url FROM digital_editions ORDER BY created_at ASC'
      ).all();

      // 5. Fetch all selected works (issues + their pieces)
      let swIssues;
      try {
        const result = await db.prepare(
          'SELECT id, title, is_visible FROM selected_works_issues ORDER BY created_at ASC'
        ).all();
        swIssues = result.results;
      } catch {
        const result = await db.prepare(
          'SELECT id, title FROM selected_works_issues ORDER BY created_at ASC'
        ).all();
        swIssues = result.results;
      }
      const visibleIssues = swIssues.filter((issue) => issue.is_visible === undefined || issue.is_visible === 1);
      let swPieces;
      try {
        const result = await db.prepare(
          'SELECT id, issue_id, title, author, genre, content, bio, piece_font FROM selected_works_pieces'
        ).all();
        swPieces = result.results;
      } catch {
        const result = await db.prepare(
          'SELECT id, issue_id, title, author, genre, content, bio FROM selected_works_pieces'
        ).all();
        swPieces = result.results;
      }
      const selectedWorks = swIssues.map((issue) => ({
        id: issue.id,
        title: issue.title,
        is_visible: issue.is_visible !== undefined ? issue.is_visible : 1,
        pieces: swPieces.filter((piece) => piece.issue_id === issue.id),
      }));

      return new Response(JSON.stringify({ 
        success: true, 
        currentIssue, 
        pastIssues, 
        announcement,
        announcements,
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