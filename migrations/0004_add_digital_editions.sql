-- Stores digital magazine edition buttons (external links to PDF/flipbook editions)
CREATE TABLE digital_editions (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
