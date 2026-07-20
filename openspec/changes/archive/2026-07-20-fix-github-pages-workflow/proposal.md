## Why

The GitHub Pages workflow fails after dependency installation because it invokes `slidev` as though it were globally installed, even though the CLI is only available as a project devDependency. The same workflow also uses Node 20-based major versions of `actions/checkout` and `actions/setup-node`, which GitHub now runs through a Node 24 compatibility fallback and reports as deprecated.

## What Changes

- Run the Pages build through the repository's package scripts so npm resolves the locked, project-local Slidev CLI.
- Preserve the Pages-specific `/slidev-addon-chapter/` base path while avoiding a duplicated raw Slidev command in the workflow.
- Upgrade the checkout and Node setup actions to Node 24-compatible major versions and align the build job itself with Node.js 24.
- Verify locally that the Pages build produces the expected static output and that the workflow no longer references the deprecated action majors.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `addon-delivery-and-quality`: Extend automated build expectations so deployment workflows use locked project tooling and supported GitHub Actions/Node runtimes.

## Impact

- Affects `.github/workflows/pages.yml` and the build command exposed by `package.json`.
- Does not change the addon's public API, runtime behavior, package contents, or npm publication trigger.
- Restores the existing GitHub Pages deployment at `https://xdoo.github.io/slidev-addon-chapter/` without changing its URL or base path.
