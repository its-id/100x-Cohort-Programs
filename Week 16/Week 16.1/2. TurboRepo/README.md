## TurboRepo

- Not a framework.
- A tool for managing monorepos with multiple packages.
- Internally, may use Lerna, Yarn Workspaces, Rush, or Nx.

## What exactly is TurboRepo: Build system vs Build system orchestrator vs Monorepo framework

**Build System**:

- A tool that is used to build the code and run the tests.
- Examples: Webpack, Babel, Rollup, Parcel, Vite etc.
- Responsible for:
  - transpiling the code.
  - minifying the code.
  - bundling the code.

**MonoRepo Framework**:

- A tool that is used to manage monorepos with multiple packages.
- Examples: Lerna, Yarn Workspaces, Rush, Nx etc.
- Responsible for:
  - managing the dependencies.
  - managing the version control.
  - managing the build process.
  - managing the deployment process.
- May use a build system internally.

**Build System Orchestrator**:

- A tool that is used to manage the **build process of multiple packages** in a monorepo.
- Responsible for:
  - managing the build process of multiple packages: includes caching the common dependencies as well.
  - managing the deployment process of multiple packages.
  - may use a build system and a monorepo framework internally.
- **TurboRepo** is a build system orchestrator.

## TurboRepo as a Build System Orchestrator

Advantages it offers:

- **Caching**: It caches the common dependencies and the build artifacts.
- **Parallelization**: It parallelizes the build process of multiple packages.
- **Incremental Builds**: It only builds the packages that have changed.
- **Deployment**: It manages the deployment process of multiple packages.
- **Integration with other tools**: It integrates with other tools like Lerna, Yarn Workspaces, Rush, Nx etc.
- **Customization**: It allows you to customize the build process and the deployment process.
