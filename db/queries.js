const pool = require('./pool');

async function getMessageDataById({ messageId }) {
  const result = await pool.query('SELECT * FROM messages WHERE id = $1', [
    messageId,
  ]);

  return result.rows[0];
}

async function getAllMessages() {
  const { rows } = await pool.query('SELECT * FROM messages');

  return rows;
}

async function addNewMessageToDatabase({ username, text }) {
  if (!username || !text) {
    throw new Error('username and text are required.');
  }

  await pool.query('INSERT INTO messages (username, text) VALUES ($1, $2)', [
    username,
    text,
  ]);
}

async function databaseHealthCheck() {
  try {
    const result = await pool.query('SELECT NOW()');

    return {
      status: 'ok',
      time: new Date().toISOString(),
      result: result.rows[0],
    };
  } catch (error) {
    console.error('DB health check FAILED', error);
    throw error;
  }
}

module.exports = {
  getMessageDataById,
  getAllMessages,
  addNewMessageToDatabase,
  databaseHealthCheck,
};
