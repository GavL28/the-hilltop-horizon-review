-- Single-row visit counter (id is locked to 1)
CREATE TABLE IF NOT EXISTS visit_stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  total_visits INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO visit_stats (id, total_visits) VALUES (1, 0);
