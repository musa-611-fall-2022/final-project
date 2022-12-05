import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from your server');
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});