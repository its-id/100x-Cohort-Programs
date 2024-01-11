## Steps to run the Backend
1. Replace `process.end.DB_URL` with your MongoDB connection url. 
2. `npm i`
3. `npm run build`
4. `npm run dev`

### Some Issues you can encounter
If get the **`punnycode`** error when running the backend. Simply:
1. Go to `node_modules` of backend.
2. Look for the folder **tr46**.
3. Go to index.js and
	```
	// Replace this:
	const punycode = require('punycode');
	// With this:
	const punycode = require('punycode/');
	```