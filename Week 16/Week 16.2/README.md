# Advanced Customizations in TurboRepo

## Introduction

1. Start by creating a fresh monorepo:

   ```bash
   npx create-turbo@latest
   ```

2. Try creating a new page in the `apps/web` directory. (Refer to Week 16.1 docs for [steps](https://github.com/its-id/100x-Cohort-Programs/blob/master/Week%2016/Week%2016.1/2.%20TurboRepo/README.md#adding-a-new-page-admin)). <br>

3. Now, let's try to create a new component using `turbo generators`:

   ```bash
   npm run generate:component
   ```

   <img width="586" alt="Screenshot 2024-03-17 at 7 26 57 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/5d4cb04e-c80d-4691-9ff5-a079928c1d72">

   > We can also generate entire packages. More info [here](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation).

4. Include these newly created components in our admin page.

### <p align="center">Congratulations 🎉</p>

   <p align="center">You have successfully created custom components using two different methods and used inside a newly created page.</p>
   <p align="center">
      <img width="1582" alt="Screenshot 2024-03-17 at 10 00 29 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/c8f37f94-1a7c-413e-9af8-7e6703db4e76">
   </p>

---

## Understanding turbo.json in depth

<img width="500" alt="Screenshot 2024-03-17 at 9 45 14 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/d6d99d42-673b-4934-97c3-35aa52065047">
<br>
It contains the configuration for our turbo repo. Explaining main parts below:

### `build: { .. }`

**`"dependsOn": ["^build"],`** 👇

- This line tells the turbo repo that the `build` command should be run before the `start` command.
- Turbo repo will also act as a Build orchestrator i.e building all the packages first ➡ then running the start command.

**`"outputs": [".next/**", "!.next/cache/**"]`** 👇

- This line tells the turbo repo to cache the `.next` directory and ignore the `.next/cache` directory.
- This is useful when we want to cache the build files for the next.js app.

<br>

### `"lint": {}`

**`"dependsOn": ["^lint"]`** 👇

- This line tells the turbo repo that the `lint` command should be run before the `start` command.
- Turbo repo will also act as a lint orchestrator i.e linting all the packages first ➡ then running the start command.

<br>

### `"dev": {}`

**`"cache": false,`** 👇

- This line tells the turbo repo to not cache the `dev` command.
- When `"cache": false` ➡ it will always run the `dev` command from scratch.
- When `"cache": true` ➡ it will cache the `dev` command and use the cache for subsequent runs.

**`"persistent": true`** 👇

- This line tells the turbo repo to keep the `dev` command running even after the `start` command is run.
- When `"persistent": true` ➡ it will keep the `dev` command running.
- When `"persistent": false` ➡ it will stop the `dev` command after the `start` command is run.

---

## Customizations in a different project (React.js app)

1. Create a new react app using instructions [here](https://arc.net/l/quote/dtkfxchl).

2. Try to import one of the components in `/packages/ui` in our newly created app.
   <details>
   <summary>How is it getting imported</summary>

   - In our case, these component got included in the `@repo/ui` folder in `node_modules` of the newly created app.
   - This is because we have added the `@repo/ui` package as a dependency in the `package.json` file of the newly created app.
   - But as a good practice, we should add the `packages/ui` as a dependency in the `package.json`.

   </details>

### <p align="center">Congratulations 🎉</p>

   <p align="center">You have successfully added a custom component to a new app.</p>
   <p align="center">
      <img width="1582" alt="Screenshot 2024-03-17 at 10 00 05 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/e5b10960-bda5-4648-8a92-8b355bff6a89">
   </p>

---

## Caching in TurboRepo

- It is one of the main features of TurboRepo.
- It caches the build files and uses them for subsequent runs.
- Try running the `build` command multiple times and see the difference in time taken for the first and subsequent runs.
- All of the cache is stored in the `node_modules/.cache/turbo` folder. To turn off cache, run the following command:
  ```bash
  turbo run dev --no-cache
  ```
- More Info [here](https://turbo.build/repo/docs/getting-started/create-new#using-the-cache).

---

## Adding a Node.js app

1. Go to `apps` directory and create a new directory `backend`.

2. Initialize a new `tsconfig.json` file in the `backend` directory.

   ```bash
   npx tsc --init
   ```

3. Extend base tsconfig from `packages/typescript-config/base.json`. Sample project [here](https://github.com/vercel/turbo/blob/main/examples/kitchen-sink/apps/api/tsconfig.json).

   ```json
   {
     "extends": "@repo/typescript-config/base.json",
     "compilerOptions": {
       "lib": ["ES2015"],
       "rootDir": "./src",
       "outDir": "./dist",
       "esModuleInterop": true,
       "forceConsistentCasingInFileNames": true,
       "strict": true,
       "skipLibCheck": true
     }
   }
   ```

4. Creating our package.json file in the `backend` directory.

   ```bash
   npm init -y
   ```

5. Add dependencies:

   ```bash
   npm i express @types/express
   ```

6. Create a new file `src/index.ts` and write the base code:

   ```ts
   import express from 'express';

   const app = express();

   app.get('/', (req, res) => {
     res.json({
       message: 'Hello from the backend.',
     });
   });
   ```

7. Create a new `turbo.json` and update the output directory to `dist`.

   ```json
   {
     "extends": ["//"],
     "pipeline": {
       "build": {
         "outputs": ["dist/**"]
       }
     }
   }
   ```

8. Update the `package.json` file to include the `build` and `dev` commands.

   ```json
   {
     "scripts": {
       "build": "tsc",
       "dev": "node dist/index.js --port 3002"
     }
   }
   ```

   > Note: This build command may or may not work depending on the system. If it doesn't work, then follow the below step.

   <p align="center"> OR </p>

- Install `esbuild` for building the ts file.

  ```bash
  npm install esbuild
  ```

- Update `build` command in `package.json`:

  ```json
  {
    "scripts": {
      "build": "esbuild src/index.ts --bundle --platform=node --outfile=dist/index.js"
    }
  }
  ```

    <details>
       <summary>Why are we using esbuild for building?</summary>

  - We are using esbuild for building the ts file because it is faster than the typescript compiler and **does not throw import errors like the typescript compiler**.
  - Recommended by the turbo repo.
  - Alternative build command [here](https://github.com/vercel/turbo/blob/main/examples/kitchen-sink/apps/api/package.json).

    </details>

<br>

9. Build the project:

   ```bash
   npm run build
   ```

10. Run the monorepo in the root directory `my-turborepo`:

    ```bash
    npm run dev
    ```

    ### <p align="center">Congratulations 🎉</p>

   <p align="center">You have successfully added a backend (node.js) project to the TurboRepo.</p>
   <p align="center">
      <img width="1582" alt="Screenshot 2024-03-17 at 9 28 23 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/2bca86d1-f494-4bc1-a4eb-17ef97bd6d14">
   </p>

---

## Creating a common package

**Goal**: This package will contain the common code that can be shared across different apps (fronend, backend).

1. Go to the `packages` directory and create a new directory `common`.
2. Create a new `tsconfig.json` file in the `common` directory.

   ```bash
   npx tsc --init
   ```

3. Extend base tsconfig from `packages/typescript-config/base.json` in the created `tsconfig.json`.

   ```json
   {
     "extends": "@repo/typescript-config/base.json",
     "include": ["src"]
   }
   ```

4. Add a common variable in the `src/index.ts` file.

   ```ts
   export const PORT = 3002;
   export const commonVariable = 'commonVariable';
   ```

5. Create a new `package.json` file in the `common` directory.

   ```bash
   npm init -y
   ```

6. Change the module name to `@repo/common` and give the export path in the `package.json` file.

   ```json
   {
     "name": "@repo/common",
     "version": "1.0.0",
     "private": true,
     "exports": {
       ".": "./src/index.ts"
     }
   }
   ```

7. Go to `apps/backend/` and add this package as a dependency in the `package.json` file.

   ```json
   {
     "dependencies": {
       "@repo/common": "1.0.0"
     }
   }
   ```

8. Import and use this common variable in the `apps/backend/src/index.ts` file.

   ```ts
   import { PORT, commonVariable } from '@repo/common';
   ...
   ```

9. Rebuild the backend project:

   ```bash
   npm run build
   ```

10. Run the server in the root directory `my-turborepo`:

    ```bash
    npm run dev
    ```

    ### <p align="center">Congratulations 🎉</p>

   <p align="center">You have successfully added and used a common package in the TurboRepo.</p>
   <p align="center">
      <img width="1582" alt="Screenshot 2024-03-17 at 9 42 37 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/252c5402-6c08-4aa5-a519-40af21cc2799">
   </p>
