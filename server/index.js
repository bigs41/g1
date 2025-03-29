const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'your_db_name',
  password: 'your_db_password',
  port: 5432,
});

app.get('/api/assets', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM assets');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).send('Error fetching assets');
  }
});

app.get('/api/game-info', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM game_info');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching game information:', error);
    res.status(500).send('Error fetching game information');
  }
});

app.post('/api/ai-dm', async (req, res) => {
  try {
    const response = await axios.post('https://api.openrouter.ai/ollama', req.body);
    res.json(response.data);
  } catch (error) {
    console.error('Error interacting with AI DM:', error);
    res.status(500).send('Error interacting with AI DM');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
