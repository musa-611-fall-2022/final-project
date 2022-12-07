const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

let pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

app
  .use(express.static(path.join(__dirname, 'site')))
  .set('views', path.join(__dirname, 'site'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => {
    res.render('index');
  })
  .get('/test-query', async(req, res) => {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT trip_start_time, COUNT (trip_start_time) FROM trips WHERE primary_mode = 3 GROUP BY trip_start_time');
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
