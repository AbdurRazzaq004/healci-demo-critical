-- migrations/001_init.sql  (rev 1784758439344)
-- BUG: "orders.account_id" is a FOREIGN KEY to "accounts", but "accounts" is never created.
-- A migration must create "accounts" BEFORE "orders".
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id),
  total_cents INTEGER NOT NULL DEFAULT 0
);
