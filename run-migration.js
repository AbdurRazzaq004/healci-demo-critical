// Simulated DB migration runner used by CI.
const fs = require('fs');
const sql = fs.readFileSync('migrations/001_init.sql', 'utf8');
console.log('Applying migration 001_init...');
if (/references\s+accounts/i.test(sql) && !/create\s+table\s+accounts/i.test(sql)) {
  console.error('ERROR: P3009 migration failed — relation "accounts" does not exist');
  console.error('  offending line: account_id INTEGER NOT NULL REFERENCES accounts(id)');
  process.exit(1);
}
console.log('Migration applied successfully.');
