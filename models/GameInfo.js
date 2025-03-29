const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

const createGameInfoTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS game_info (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

const addGameInfo = async (title, description) => {
  const query = `
    INSERT INTO game_info (title, description)
    VALUES ($1, $2)
    RETURNING *;
  `;
  const values = [title, description];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getGameInfo = async () => {
  const query = 'SELECT * FROM game_info;';
  const result = await pool.query(query);
  return result.rows;
};

const getGameInfoById = async (id) => {
  const query = 'SELECT * FROM game_info WHERE id = $1;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateGameInfo = async (id, title, description) => {
  const query = `
    UPDATE game_info
    SET title = $1, description = $2
    WHERE id = $3
    RETURNING *;
  `;
  const values = [title, description, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteGameInfo = async (id) => {
  const query = 'DELETE FROM game_info WHERE id = $1 RETURNING *;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createGameInfoTable,
  addGameInfo,
  getGameInfo,
  getGameInfoById,
  updateGameInfo,
  deleteGameInfo,
};
