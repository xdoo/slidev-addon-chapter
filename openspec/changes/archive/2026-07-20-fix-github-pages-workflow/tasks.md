## 1. Repository-Owned Pages Build

- [x] 1.1 Add a `build:pages` package script that delegates to the existing build and supplies the `/slidev-addon-chapter/` base path.
- [x] 1.2 Run the Pages package script with the locked dependencies and confirm it completes using the local `@slidev/cli` executable.

## 2. GitHub Pages Workflow Runtime

- [x] 2.1 Update the Pages workflow to use `actions/checkout@v6`, `actions/setup-node@v6`, and Node.js 24.
- [x] 2.2 Replace the raw `slidev` shell command with `npm run build:pages`, upload the actual `playground/dist` build directory, and preserve the existing trigger, permissions, concurrency, and deployment actions.

## 3. Verification

- [x] 3.1 Inspect the generated `playground/dist` output and confirm static asset URLs use the `/slidev-addon-chapter/` base path.
- [x] 3.2 Review the final workflow diff to confirm no Pages step depends on a global Slidev installation or a Node 20-based checkout/setup action.
- [x] 3.3 After the change reaches `main`, confirm the GitHub Pages workflow builds and deploys successfully without the Node 20 action-runtime deprecation warning.
