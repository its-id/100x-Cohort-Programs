## TurboRepo

- Not a framework.
- A tool for managing monorepos with multiple packages.
- Internally, may use Lerna, Yarn Workspaces, Rush, or Nx.

---

## What exactly is TurboRepo?

### Build System:

- A tool that is used to build the code and run the tests.
- Examples: Webpack, Babel, Rollup, Parcel, Vite etc.
- Responsible for:
  - transpiling the code.
  - minifying the code.
  - bundling the code.

### MonoRepo Framework:

- A tool that is used to manage monorepos with multiple packages.
- Examples: Lerna, Yarn Workspaces, Rush, Nx etc.
- Responsible for:
  - managing the dependencies.
  - managing the version control.
  - managing the build process.
  - managing the deployment process.
- May use a build system internally.

### Build System Orchestrator:

- A tool that is used to manage the **build process of multiple packages** in a monorepo.
- Responsible for:
  - managing the build process of multiple packages: includes caching the common dependencies as well.
  - managing the deployment process of multiple packages.
  - may use a build system and a monorepo framework internally.
- **TurboRepo** is a build system orchestrator.

---

## TurboRepo as a Build System Orchestrator

**Advantages it offers**:

- **Caching**: It caches the common dependencies and the build artifacts.
- **Parallelization**: It parallelizes the build process of multiple packages.
- **Incremental Builds**: It only builds the packages that have changed.
- **Deployment**: It manages the deployment process of multiple packages.
- **Integration with other tools**: It integrates with other tools like Lerna, Yarn Workspaces, Rush, Nx etc.
- **Customization**: It allows you to customize the build process and the deployment process.

Check out the [official documentation](https://arc.net/l/quote/ditaxuxg) for detailed info on performance increases and other features.

---

## Creating & Running a TurboRepo Project

1. Run the following command to create a new TurboRepo project:

   ```bash
   npx create-turbo@latest
   ```

2. Install the dependencies (inside `my-turbrepo` folder):

   ```bash
   npm install
   ```

3. Run the following command to run the project:

   ```bash
    npm run dev
   ```

   <details>
   <summary>What Happens when we run this command?</summary>

   - It runs the `turbo dev` script in the `package.json` file present root path.

   - This script runs the `dev` script present in package.json in the `apps/web` and `apps/docs` project.

   - By default, the `dev` script runs the project on PORT `3000`.

   - Notice the port mentioning in `dev` script of package.json for `apps/docs` project. This makes the project run on PORT `3001`.
   </details>

### <p align="center">Congratulations 🎉</p>

<p align="center">You have successfully created and run a TurboRepo project.</p>
<p align="center">
<img width="1580" alt="Screenshot 2024-03-16 at 8 04 15 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/bfdd39d7-b577-4c60-9ab4-441cb9f2d49a">
<img width="1580" alt="Screenshot 2024-03-16 at 8 04 24 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/c91c5edd-951d-41bc-b532-1fb7998147c5">
</p>

---

## Exploring Project Structure

- **packages**: This folder contains all the packages.
  - **eslint-config**: This folder contains the ESLint configurations for the project. These configurations can be
  - **typescript-config**: This folder contains the TypeScript configurations for the project.
  - **ui**: This folder contains the UI components for the project. These can be shared between different parts of the project.
- **apps**: This folder contains all the apps for the project.
  - **docs**: Contains the documentation for the project made with Next.js.
  - **web**: A Demo Next.js app.
- **turbo.json**: This file contains the configuration for TurboRepo.

### What is UI Package?

- Contains the ui components that can be used in multiple parts of projects.
- The importing of these components is done using the `@my-turborepo/ui` package name.
- The `@my-turborepo/ui` package name is defined in the `package.json` file of the `ui` package.
  > Make sure to add the path of the component in the `exports` field of the `package.json` file of the `ui` package.
- This can be considered a feature of TurboRepo as we are able to import in above way without pushing the UI components to npm.

---

## Adding a New Page: `/admin`

1. Create a new `/admin` page i.e `apps/web/admin/page.tsx` folder.

2. Create a new component `Admin` in the `ui` package.
   <img width="800" alt="Screenshot 2024-03-16 at 8 35 30 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/33edff3e-ef5a-4f19-8d8b-279d5f067830">

3. Add the path of the `Admin` component in the `exports` field of the `package.json` file of the `ui` package.
   <img width="800" alt="Screenshot 2024-03-16 at 8 35 30 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/55887a6e-fc3b-4c92-947d-d83de6fdad9e">

4. Import the `Admin` component in the `page.tsx` file of the `apps/web/admin/page.tsx` folder.
   <img width="800" alt="Screenshot 2024-03-16 at 8 38 48 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/e9b4c1c0-ac9c-47cd-8f99-9ede414bb12e">

5. Run the project and go to the `http://localhost:3000/admin` route to see the new page.

**Bonus**:

- You can also use the `packages/ui/turbo/generators` folder to quickly create a new component.

- Run the following command that will replicate steps 1, 2 and 3 for you.
  ```bash
  npx gen react-component
  ```

---

## Summary:

It's important to understand the dependencies between these workspaces. Let's map them out:

**`web`** - depends on `ui`, `typescript-config` and `eslint-config`.
**`docs`** - depends on `ui`, `typescript-config` and `eslint-config`.
**`ui`**- depends on `typescript-config` and `eslint-config`.
**`typescript-config`** - no dependencies.
**`eslint-config`** - no dependencies.

> Note that the **Turborepo CLI is not responsible for managing these dependencies**. All of the things above are handled by the package manager you chose (npm, pnpm or yarn).

---

## Understanding TurboRepo Pipeline: `turbo.json`

- Turborepo helps by making running tasks simpler and much more efficient.
- As we can see in the `turbo.json` file, we have a `pipeline` object that contains the tasks that we want to run:

  - `build` - This task runs the build script in the `package.json` file of the `apps/web` and `apps/docs` project.
  - `lint` - This task runs the lint script in the `package.json` file of the `apps/web` and `apps/docs` project.
  - `dev` - This task runs the dev script in the `package.json` file of the `apps/web` and `apps/docs` project.

> **Note**: Every task registered inside turbo.json can be run with turbo run <task> (or turbo <task> for short).

---

## Adding a different project (React.js app)

1.  Go to the `/apps` folder in the terminal and run the following command to create a new Next.js app:

    ```bash
    npm create vite@latest test-app
    ```

2.  Go to this project's `package.json` file and do these two things:

    - Give a PORT number to the `dev` script: `next dev --port 3002`.
    - Add `ui` package as a dependency:

      ```json
      "dependencies": {
        "@repo/ui": "*",
      }
      ```

3.  Create a new `turbo.json` file in the root of the `test-app` project and override the `pipeline` object with the following tasks. More info [here](https://turbo.build/repo/docs/core-concepts/monorepos/configuring-workspaces):

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

4.  Update/Install the dependencies in the root dir (i.e `my-turborepo` folder):

    ```bash
    npm install
    ```

5.  Run the following command to run the project:

    ```bash
    npm run dev
    ```

### <p align="center">Congratulations 🎉</p>

<p align="center">You have successfully added a different project to the TurboRepo.</p>
<p align="center">
  <img width="1104" alt="Screenshot 2024-03-16 at 9 18 26 PM" src="https://github.com/its-id/100x-Cohort-Programs/assets/60315832/08def320-0b6c-47db-9b12-205e874b9497">
</p>
