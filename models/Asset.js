const { Pool } = require('pg');

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

const createAssetTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS assets (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      type VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  await pool.query(query);
};

const addAsset = async (name, type, description) => {
  const query = `
    INSERT INTO assets (name, type, description)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [name, type, description];
  const result = await pool.query(query, values);
  return result.rows[0];
};

// Adding enemy assets
const addEnemyAssets = async () => {
  const enemies = [
    { name: 'Goblin', type: 'enemy', description: 'A small, green humanoid creature.' },
    { name: 'Orc', type: 'enemy', description: 'A large, brutish humanoid with green skin.' },
    { name: 'Dragon', type: 'enemy', description: 'A massive, fire-breathing reptilian creature.' },
  ];

  for (const enemy of enemies) {
    await addAsset(enemy.name, enemy.type, enemy.description);
  }
};

const getAssets = async () => {
  const query = 'SELECT * FROM assets;';
  const result = await pool.query(query);
  return result.rows;
};

const getAssetById = async (id) => {
  const query = 'SELECT * FROM assets WHERE id = $1;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const updateAsset = async (id, name, type, description) => {
  const query = `
    UPDATE assets
    SET name = $1, type = $2, description = $3
    WHERE id = $4
    RETURNING *;
  `;
  const values = [name, type, description, id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const deleteAsset = async (id) => {
  const query = 'DELETE FROM assets WHERE id = $1 RETURNING *;';
  const values = [id];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = {
  createAssetTable,
  addAsset,
  addEnemyAssets,
  getAssets,
  getAssetById,
  updateAsset,
  deleteAsset,
};
