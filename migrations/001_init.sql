-- migrations/001_init.sql  (rev 1784758439344)
CREATE TABLE accounts (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id),
  total_cents INTEGER NOT NULL DEFAULT 0
);
