import express from 'express';
import client from 'prom-client';

import { monitor } from './middleware/monitor';
import { requestCount } from './middleware/requestCounter';
import { userCount } from './middleware/activeUserCounter';
import { responseTimeDistribution } from './middleware/responseTimeHistogram';

const app = express();

app.use(express.json());
app.use(monitor);
app.use(requestCount);
app.use(userCount);
app.use(responseTimeDistribution);

app.get('/user', (req, res) => {
  res.send({
    name: 'John Doe',
    age: 25,
  });
});

app.post('/user', (req, res) => {
  const user = req.body;
  res.send({
    ...user,
    id: 1,
  });
});

app.get('/metrics', async (req, res) => {
  const metrics = await client.register.metrics();
  res.set('Content-Type', client.register.contentType);
  res.end(metrics);
});

app.listen(3000);
