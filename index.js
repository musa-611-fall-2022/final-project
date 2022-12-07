/* =====================================================

Main server-side script in Node.js

@author: Jie Li
@date: 12/07/2022

======================================================= */
const path = require('path');

// Use express as server side app
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// Initiate client to connect with online psql db
const { Pool } = require('pg');
let pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app
  .use(express.static(path.join(__dirname, 'site'))) // Render HTML
  .set('views', path.join(__dirname, 'site'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('index');
  })
  .get('/test-query/:mode', async(req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query(
        `SELECT trip_start_time, COUNT (trip_start_time) FROM trips WHERE primary_mode = ${req.params.mode} GROUP BY trip_start_time`
      );
      const results = { 'results': (result) ? result.rows : null};
      res.send(results);
    } catch(err) {
      console.error(err);
      res.send('Error ' + err);
    }
  });

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
