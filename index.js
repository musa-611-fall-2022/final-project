const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 5000;

let pool;

if(process.env.DATABASE_URL) {
  // If on Heroku
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // If on local
  pool = new Pool({
    user: process.env.D_user,
    password: process.env.D_password,
    port: process.env.D_pport,
    host: process.env.D_host,
    database: process.env.D_database,
  });
}

app.get('/', (req, res) => {
  res.send('Hello from your server');
})
.get('/test-query', async(req, res) => {
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
