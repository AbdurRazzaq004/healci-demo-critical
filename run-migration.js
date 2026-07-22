// CI migration validator (simulated).
// Rule: a table referenced by a FOREIGN KEY must be CREATEd before the table that references it.
// Reads every migration file in order so a fix can live in this file OR a new earlier migration.
const fs = require('fs');
const path = require('path');
const dir = 'migrations';
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.sql')).sort();
const sql = files.map((f) => fs.readFileSync(path.join(dir, f), 'utf8')).join('\n');
console.log('Validating migrations: ' + files.join(', '));
const acc = sql.search(/create\s+table\s+(if\s+not\s+exists\s+)?"?accounts\b/i);
const ord = sql.search(/create\s+table\s+(if\s+not\s+exists\s+)?"?orders\b/i);
if (acc === -1) {
  console.error('ERROR: P3009 migration failed - relation "accounts" does not exist (referenced by orders.account_id)');
  process.exit(1);
}
if (ord !== -1 && acc > ord) {
  console.error('ERROR: P3009 migration failed - "accounts" is created after "orders" which references it');
  process.exit(1);
}
console.log('Migration order OK - "accounts" is created before "orders".');
