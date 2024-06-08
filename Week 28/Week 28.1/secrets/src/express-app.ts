import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

// Function to read file contents
const readConfigFile = (filePath: string): string => {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    console.error(`Error reading file ${filePath}:`, err);
    return '';
  }
};

app.get('/', (req, res) => {
  const envVars = {
    DATABASE_URL: process.env.DATABASE_URL,
    CACHE_SIZE: process.env.CACHE_SIZE,
    PAYMENT_GATEWAY_URL: process.env.PAYMENT_GATEWAY_URL,
    MAX_CART_ITEMS: process.env.MAX_CART_ITEMS,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
  };

  const fileVars = {
    application_properties: readConfigFile(
      '/etc/config/application.properties'
    ),
    database_properties: readConfigFile('/etc/config/database.properties'),
    cache_properties: readConfigFile('/etc/config/cache.properties'),
    payment_properties: readConfigFile('/etc/config/payment.properties'),
  };

  res.send(`
    <h1>Environment Variables</h1>
    <pre>${JSON.stringify(envVars, null, 2)}</pre>
    <h1>Config Files</h1>
    <pre>${JSON.stringify(fileVars, null, 2)}</pre>
  `);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
