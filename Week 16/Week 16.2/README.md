# Customizations in MonoRepos

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

   > We can also generate entire packages. More info [here](https://turbo.build/repo/docs/core-concepts/monorepos/code-generation).

4. Include this newly created component in our admin page.

--

## Understanding turbo.json in depth

It contains the configuration for our turbo repo. Explaining each

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

## Customizations in a different project (React.js app)

1. Create a new react app using instructions [here](https://github.com/its-id/100x-Cohort-Programs/blob/master/Week%2016/Week%2016.1/2.%20TurboRepo/README.md#adding-a-new-page-admin)

2. Try to import one of the components in `/packages/ui` in our newly created app.
   <details>
   <summary>How is it getting imported</summary>

   - In our case, these component got included in the `@repo/ui` folder in `node_modules` of the newly created app.
   - This is because we have added the `@repo/ui` package as a dependency in the `package.json` file of the newly created app.
   - But as a good practice, we should add the `packages/ui` as a dependency in the `package.json` file of the newly created app.

   </details>

## Caching in TurboRepo

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
       "module": "CommonJS",
       "outDir": "./dist",
       "rootDir": "./src"
     },
     "exclude": ["node_modules"],
     "include": ["."]
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
       message: 'hello world',
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

8. Install `eslint` for linting and bundling:

   ```bash
   npm install esbuild
   ```

9. Update the `package.json` file to include the `build` and `dev` commands.

   ```json
   {
     "scripts": {
       "build": "esbuild src/index.ts --platform=node --bundle --outdir=dist",
       "dev": "node dist/index.js --port 3002"
     }
   }
   ```

10. Run the server in the root directory `my-turborepo`:

    ```bash
    npm run dev
    ```

## Creating a common package

Goal: This package will contain the common code that can be shared across different apps (fronend, backend).

1. Go to the `packages` directory and create a new directory `common`.
2. Create a new `tsconfig.json` file in the `common` directory.

   ```bash
   npx tsc --init
   ```

3. Extend base tsconfig from `packages/typescript-config/base.json`.

   ```json
   {
     "extends": "@repo/typescript-config/base.json",
     "include": ["src"],
     "exclude": ["node_modules", "dist"]
   }
   ```

4. Create a new `package.json` file in the `common` directory.

   ```bash
   npm init -y
   ```

5. Add a common variable in the `src/index.ts` file.

   ```ts
   export const PORT = 5000;
   export const commonVariable = 'commonVariable';
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

7. Add this package as a dependency in the `apps/backend/package.json` file.

   ```json
   {
     "dependencies": {
       "@repo/common": "1.0.0"
     }
   }
   ```

8. Import and use this common variable in the `apps/backend/src/index.ts` file.

   ```ts
   import { PORT } from '@repo/common';
   ```

9. Run the server in the root directory `my-turborepo`:

   ```bash
   npm run dev
   ```

   <details>
      <summary>If still runs on different port.</summary>
      - Try deleting the `./dist` folder in the `apps/backend` directory and then run the server.
      - Try deleting the cache i.e `./.turbo/cache` folder and then run the server.
   </details>
