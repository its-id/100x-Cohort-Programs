import express from 'express';

import { PORT, commonVariable } from '@repo/common';

const app = express();

app.get('/', (req, res) => {
  res.json({
    message: `Hello from the backend. This is a common variable from @repo/common: ${commonVariable}`,
  });
});

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
