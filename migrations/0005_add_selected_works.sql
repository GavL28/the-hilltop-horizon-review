-- Stores selected works issues (e.g. "Issue 1")
CREATE TABLE selected_works_issues (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores pieces within a selected works issue
CREATE TABLE selected_works_pieces (
  id TEXT PRIMARY KEY,
  issue_id TEXT NOT NULL,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  genre TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
