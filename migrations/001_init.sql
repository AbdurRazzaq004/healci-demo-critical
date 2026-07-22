-- migrations/001_init.sql
-- BUG: "orders.account_id" is a FOREIGN KEY to "accounts", but the "accounts"
-- table is never created anywhere. A migration must create "accounts" BEFORE "orders".
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id),
  total_cents INTEGER NOT NULL DEFAULT 0
);
