import express from 'express';
import { Pool } from 'pg';

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
    connectionString: 'postgres://wirkarnsvpjngv:e991ee89cbd9822ac73be40d270229c72a3040fa094a9bbbdb452ef1074fb7ee@ec2-3-234-131-8.compute-1.amazonaws.com:5432/d3rh3ac7evu96k',
    user: 'wirkarnsvpjngv',
    password: 'e991ee89cbd9822ac73be40d270229c72a3040fa094a9bbbdb452ef1074fb7ee',
    port:'5432',
    host: 'ec2-3-234-131-8.compute-1.amazonaws.com',
    database: 'd3rh3ac7evu96k',
    sslmode: 'require',
  });
}

app.get('/', (req, res) => {
  res.send('Hello from your server');
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
