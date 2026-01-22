const { Pool } = require('pg');

if (process.env.NODE_ENV !== 'production') {
  const path = require('node:path');
  const dotenv = require('dotenv');
  dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
  });
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 3000,
});

pool.on('error', (err) => {
  console.error('Unexpected PG error', err);
  process.exit(1);
});

module.exports = pool;
