import { app } from './index';
import { appWithZod } from './indexWithZod';

//we have seperated the code of running the server from the actual logic
app.listen(3000, () => {
  console.log('Server (app) is running on PORT 3000');
});

app.listen(3001, () => {
  console.log('Server (appWithZod) is running on PORT 3001');
});

//To run the server, now we can run the following command:
// tsc -b && node dist/bin.js
