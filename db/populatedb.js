const { Client } = require('pg');

if (process.env.NODE_ENV !== 'production') {
  const path = require('node:path');
  const dotenv = require('dotenv');
  dotenv.config({
    path: path.resolve(process.cwd(), '.env'),
  });
}

const INIT_SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  text TEXT,
  added TIMESTAMPTZ NOT NULL DEFAULT NOW() 
);
`;

const SEED_SQL = `
INSERT INTO messages (username, text)
VALUES 
  ('Amando', 'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'),
  ('Charles', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
`;

async function initDB() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl:
      process.env.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    await client.query(INIT_SQL);
    console.log('Table messages ensured');

    if (process.env.NODE_ENV !== 'production') {
      const { rows } = await client.query('SELECT COUNT(*) FROM messages;');

      const count = Number(rows[0].count);

      if (count === 0) {
        await client.query(SEED_SQL);
        console.log('Dev seed data inserted');
      } else {
        console.log('Seed skipped (data already exists)');
      }
    } else {
      console.log('Skipping seed in production');
    }
  } catch (error) {
    console.error('DB initialization failed!', error);
  } finally {
    await client.end();
    console.log('Database connection closed');
  }
}

module.exports = initDB;
