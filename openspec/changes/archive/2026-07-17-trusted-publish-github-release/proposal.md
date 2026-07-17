## Why

The existing publication setup duplicates npm and GitHub Actions behavior across custom scripts and tests, making releases harder to understand and maintain. Publication should instead use a small GitHub Release workflow, npm Trusted Publishing, and the package's existing quality checks while keeping package contents controlled by standard npm metadata.

## What Changes

- Simplify `.github/workflows/publish.yml` so it runs only for published GitHub Releases, uses a supported Node.js version and the public npm registry, requests only `contents: read` and `id-token: write`, and publishes through npm Trusted Publishing with public access and provenance.
- Run `npm ci`, the package's relevant tests, typecheck/build checks, and `npm pack --dry-run` before `npm publish` in a clear sequence.
- Compare the release tag directly with `v` plus `package.json#version` inside the workflow and fail with an actionable message on mismatch, without automatic version changes or a separate version-check script.
- Set the package version to `0.1.1` and normalize the repository URL to npm's expected `git+https` form.
- Keep `package.json#files` as the primary package-content boundary and remove custom release helpers and tests that only duplicate version matching, tarball inventory checks, workflow inspection, or npm standard behavior.
- Retain package-level verification only where it demonstrates consumer behavior that `files`, `npm pack --dry-run`, existing tests, and npm itself do not cover.
- Preserve the addon's public runtime API and introduce no new dependencies.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `npm-release-management`: Replace the current custom-script-heavy release contract with a lean published-GitHub-Release workflow, inline tag/version validation, normalized metadata, standard npm package inspection, and Trusted Publishing.
- `addon-delivery-and-quality`: Simplify the release quality gate and package-content verification requirements while preserving meaningful package tests and consumer compatibility.

## Impact

- Affects `.github/workflows/publish.yml`, `package.json`, and the release/package verification scripts and tests that are found to be redundant.
- May adjust npm scripts to compose existing package tests, typecheck, build, and package inspection without adding release-only tooling.
- Requires an npm Trusted Publisher mapping for GitHub owner `xdoo`, repository `slidev-addon-chapter`, and workflow filename `publish.yml` before publication can succeed.
- Does not publish locally, change runtime source, alter public exports, or add dependencies.
