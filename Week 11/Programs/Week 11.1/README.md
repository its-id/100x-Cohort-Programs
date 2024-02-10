# Easily Setup Cloudflare workers and deploy for free!
<img width="1582" alt="Screenshot 2024-02-10 at 9 35 26 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/eb7278c5-bbde-44e8-82e6-65ca6c0de150">


# Steps to run

### 1. Cloudflare Workers Setup

1. cd into the `cloudflare-worker-app` directory
2. run `npm i` (one time)
3. run `npm run dev` to start the server
4. Open the browser and go to `http://localhost:8787`

### 2. Honojs Setup

1. cd into the `hono-app` directory
2. run `npm i` (one time)
3. Uncomment the Step in `index.ts` file which you want to run
4. run `npm run dev` to start the server
5. For GET request, simply open the browser and go to `http://localhost:8787` and check the console.
6. For POST request, use Postman or any other API testing tool and pass the data in different sections as shown in the image below (check any consoles in the terminal):
<img width="1132" alt="Screenshot 2024-02-10 at 9 53 37 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/2035fe4b-1929-4745-9eee-8d95f0db0337">
<img width="1132" alt="Screenshot 2024-02-10 at 9 53 26 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/e025905d-fe31-4c70-b329-00e7065416de">

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
