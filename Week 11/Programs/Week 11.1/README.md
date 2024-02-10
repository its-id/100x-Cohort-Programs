# Steps to run

### 1. Cloudflare Workers Setup

1. cd into the `cloudflare-worker-app` directory
2. run `npm i` (one time)
3. run `npm run dev` to start the server
4. Open the browser and go to `http://localhost:8787`

### 2. Honojs Setup

1. cd into the `hono-app` directory
2. run `npm i` (one time)
3. Uncomment the Step in `index.ts` file which you want to run, and do:
   ```
   npm run dev
   ```
4. run `npm run dev` to start the server
5. For GET request, simply open the browser and go to `http://localhost:8787` and check the console.
6. For POST request, use Postman or any other API testing tool and pass the data in different sections as shown in the image below (check any consoles in the terminal):

### To Deploy the app to Cloudflare Workers

1. Create an account at [Cloudflare](https://www.cloudflare.com/).
2. Login to cloudflare using via wrangler cli:
   ```
   npx wrangler login
   ```
3. Login to the browser pop up window
4. To Deploy run:
   ```
   npm run deploy
   ```
