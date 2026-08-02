-- Stores the literary magazine issues
CREATE TABLE issues (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content_html TEXT NOT NULL,
  is_current INTEGER DEFAULT 0,
  published_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores announcements for the home page
CREATE TABLE announcements (
  id TEXT PRIMARY KEY,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Stores secure login sessions for the admin
CREATE TABLE admin_sessions (
  token TEXT PRIMARY KEY,
  expires_at TIMESTAMP NOT NULL
);