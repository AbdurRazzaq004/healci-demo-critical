-- migrations/001_init.sql
-- BUG: "orders" references "accounts" before the "accounts" table is created.
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  account_id INTEGER NOT NULL REFERENCES accounts(id)
);
