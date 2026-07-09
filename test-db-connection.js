const { query } = require('./database/db');

async function main() {
  const result = await query('SELECT current_database() AS db, current_user AS user');
  console.log('Connected to PostgreSQL:', result.rows[0]);
}

main().catch((err) => {
  console.error('Database connection failed:', err.message);
  process.exit(1);
});
