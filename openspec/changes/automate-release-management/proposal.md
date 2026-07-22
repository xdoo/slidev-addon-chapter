## Why

The repository currently has a manual release handoff: a maintainer must choose the version, create a tag, and publish a GitHub Release before the npm workflow can run. This makes version selection, changelog maintenance, and the connection between the release commit, GitHub Release, and npm package unnecessarily error-prone.

## What Changes

- Add Release Please automation for pushes to `main`.
- Generate a reviewable release PR that updates `package.json`, `package-lock.json` when required, and `CHANGELOG.md`.
- Use the npm package `slidev-addon-chapters` as a single Release Please manifest package with tags exactly `v<version>`.
- Create the tag and GitHub Release automatically after the release PR is merged.
- Keep `.github/workflows/publish.yml` as a separate `release.published`-triggered npm publication workflow.
- Preserve all npm quality gates, npm Trusted Publishing, OIDC provenance, and the npm registry target `https://registry.npmjs.org`.
- Use a release-automation GitHub credential capable of creating the release PR and release events so the publish workflow is actually triggered; do not use an npm token.
- Adopt and document Conventional Commits: `fix`/`perf` → patch, `feat` → minor, and `BREAKING CHANGE` or `!` → major.
- Bootstrap the existing unreleased local version `0.1.1` without creating a tag, GitHub Release, or npm publication during implementation.
- Replace the README's manual release instructions with the automated release process and external setup instructions.

## Capabilities

### New Capabilities

- `automated-release-management`: Automated semantic versioning, release PRs, changelog updates, tags, and GitHub Releases for the npm package.

### Modified Capabilities

- `npm-release-management`: Change the release contract from manual tag/release creation to Release Please output while retaining the separate GitHub Release → npm Trusted Publishing publication gate.

## Impact

- New `.github/workflows/release-please.yml`, `release-please-config.json`, `.release-please-manifest.json`, and `CHANGELOG.md`.
- `README.md` release documentation is rewritten for automated releases.
- `package.json` and `package-lock.json` remain aligned with the Release Please-managed version; the bootstrap must preserve `0.1.1` as the next unreleased version because npm currently reports `0.1.0` as latest.
- `.github/workflows/publish.yml` remains the only workflow allowed to run `npm publish`; its permissions stay scoped to `contents: read` and `id-token: write`.
- GitHub requires one-time configuration for the release automation credential and permission to create/approve pull requests. npm requires one Trusted Publisher mapping for `xdoo/slidev-addon-chapter` and `publish.yml`, allowing `npm publish`.
- No runtime API, package exports, or consumer behavior changes are intended.
