## Context

The Pages job completes `npm ci`, which installs `@slidev/cli` under `node_modules/.bin`, but then invokes `slidev` directly. GitHub-hosted runners do not implicitly add a repository's local npm binaries to `PATH` for arbitrary shell steps, so the command exits with status 127. The workflow also lags behind `publish.yml`: it uses `actions/checkout@v4`, `actions/setup-node@v4`, and Node.js 22, whereas the publication path already uses the Node 24-compatible v6 actions and Node.js 24.

The GitHub Pages output must continue to use `/slidev-addon-chapter/` as its Vite base because the site is hosted below the repository path. Because Slidev resolves the relative `--out dist` argument from the deck directory, the existing build writes to `playground/dist`; a fresh GitHub runner therefore has no root-level `dist` directory to upload. The normal `build` script remains useful for local output, so Pages needs an explicit repository-owned build entry point without changing the default build semantics or output location.

## Goals / Non-Goals

**Goals:**

- Make the Pages build resolve the locked local Slidev CLI after `npm ci`.
- Keep the repository-specific Pages base path explicit and repeatable locally.
- Remove the Node 20 action-runtime deprecation warning by matching the maintained action majors and Node.js version already used by `publish.yml`.
- Keep deployment triggers, permissions, deployment actions, and the public Pages URL unchanged.

**Non-Goals:**

- Redesigning the playground or changing addon runtime behavior.
- Combining Pages deployment with npm publishing or adding pull-request previews.
- Adding a globally installed Slidev CLI or another package manager.
- Broadly upgrading dependencies unrelated to the failing workflow.

## Decisions

### Add a dedicated npm script for the Pages build

Add `build:pages` as a thin wrapper around the existing `build` script, passing `--base /slidev-addon-chapter/`, and call it with `npm run build:pages` from the workflow. npm scripts automatically expose `node_modules/.bin`, so this resolves the installed `@slidev/cli` without relying on runner-global tooling. Reusing `build` also keeps the input deck and output directory defined in one place.

Calling `npx slidev` directly was considered. It would resolve the local binary after installation, but a named script is safer and easier to reproduce because it records the complete Pages build contract in `package.json` and avoids any ambiguity about npx downloading missing packages.

### Align Pages with the publish workflow's supported runtime baseline

Update Pages to `actions/checkout@v6`, `actions/setup-node@v6`, and Node.js 24. These versions are already established in `publish.yml`, so matching them removes the deprecation warning and prevents two workflows from maintaining different CI runtime baselines.

Pinning action commit SHAs was considered but is outside the repository's current convention; both existing workflows track action majors.

### Leave the deployment pipeline unchanged

Keep the existing trigger, permissions, concurrency policy, `configure-pages`, artifact upload action, and deployment action. The failure does not require a different deployment architecture.

Configure `upload-pages-artifact` to upload `playground/dist`, the directory actually produced by Slidev for `playground/slides.md`. Changing the package build output to a root-level directory was considered, but would alter the established `build` script semantics solely to accommodate an incorrect workflow assumption.

## Risks / Trade-offs

- [The repository base path remains hardcoded] → Keep it in the purpose-specific `build:pages` script so a repository rename has one obvious project-level update point.
- [Slidev resolves relative output paths from the deck directory] → Make the workflow's artifact path explicitly match `playground/dist` and verify that directory after the build.
- [Node.js 24 may expose dependency incompatibilities] → Run the Pages build locally with the locked dependency tree and retain `npm ci` in CI.
- [Action major upgrades can include behavioral changes] → Use the same v6 action majors already exercised by the repository's publish workflow and leave their configuration minimal.
- [A wrapper script adds one package command] → The command makes the production Pages build locally reproducible and removes raw tool invocation from CI.
