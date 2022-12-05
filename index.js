const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.get('/', (req, res) => {
  res.send('Hello from your server');
})
.get('/db', async(req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM trips LIMIT 5');
    const results = { 'results': (result) ? result.rows : null };
    res.send(results);
  } catch(err) {
    console.error(err);
    res.send('Error ' + err);
  }
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
