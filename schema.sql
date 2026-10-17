CREATE TABLE IF NOT EXISTS saved_prompts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  style TEXT NOT NULL,
  content TEXT NOT NULL,
  page_name TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
