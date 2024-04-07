import express from 'express';
import { createClient } from 'redis';

const client = createClient(); //create a new redis client
const app = express();
app.use(express.json());

app.post('/submit', async (req, res) => {
  const { problemId, code, language } = req.body;

  try {
    // Push to the 'problems' queue in the redis
    await client.lPush(
      'problems',
      JSON.stringify({ code, language, problemId })
    );

    // Store in the database

    res.status(200).send('Submission received and stored.');
  } catch (error) {
    console.error('Redis error:', error);
    res.status(500).send('Failed to store submission.');
  }
});

async function startServer() {
  try {
    await client.connect();
    console.log('Connected to Redis');

    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  } catch (error) {
    console.error('Failed to connect to Redis', error);
  }
}

client.on('error', (err) => console.log('Redis Client Error', err));

startServer();
