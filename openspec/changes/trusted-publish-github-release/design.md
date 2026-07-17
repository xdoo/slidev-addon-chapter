## Context

The repository already has a published-release workflow, npm metadata, package allowlisting, a clean packed-consumer fixture, and release-related helper scripts/tests. The current workflow delegates tag matching and its quality gate to custom scripts, while separate tests statically inspect workflow text and re-check npm's tarball inventory. The package is currently version `0.1.0`, requires Node `>=20.19.0`, declares npm 11.17.0, and uses Node 22 in CI. npm warns about the repository URL because it is HTTPS without the normalized `git+https` prefix.

The implementation must preserve the source-based Slidev addon package, public exports, root component discovery, and runtime behavior. Local validation stops before `npm publish` because npm Trusted Publishing credentials are available only through GitHub Actions OIDC.

## Goals / Non-Goals

**Goals:**

- Make publication from a published GitHub Release easy to audit from one workflow file.
- Authenticate to npm through Trusted Publishing with provenance and no long-lived token.
- Reuse meaningful package tests and standard npm mechanisms instead of release-only replicas.
- Keep package contents minimal through `package.json#files` and verify the resulting inventory with `npm pack --dry-run`.
- Require the release tag to equal `v${package.json.version}` and report both values when it does not.
- Prepare version `0.1.1` and npm-normalized repository metadata.

**Non-Goals:**

- Automatically calculate, increment, or commit a version.
- Publish locally, create the GitHub Release, or configure the npm Trusted Publisher.
- Add dependencies, a release framework, changelog automation, or tests whose subject is workflow YAML.
- Change the addon's runtime implementation or public API.

## Decisions

### Keep the workflow linear and explicit

`.github/workflows/publish.yml` will trigger only on `release.types: [published]`, request `contents: read` and `id-token: write`, check out the release tag, and configure a current supported Node.js version through `actions/setup-node` with `registry-url: https://registry.npmjs.org`. Node 22 remains appropriate because it satisfies the package's `>=20.19.0` engine and is already used by the release setup.

After `npm ci`, individual commands will expose the actual gate order: inline release identity validation, existing relevant tests, typecheck, build, any retained clean packed-consumer verification, `npm pack --dry-run`, and `npm publish --access public --provenance`. A single opaque `release:check` wrapper is avoided in the workflow so reviewers can see what blocks publication.

Pinning an additional globally installed npm version is unnecessary unless implementation proves Trusted Publishing requires a newer npm than the selected Node runner provides. The declared package manager and lockfile remain authoritative for local development; the workflow should avoid complexity that does not contribute to publication.

### Validate release identity inline

A short workflow shell step will read the version with `npm pkg get version`, remove JSON quoting, compute `expected_tag="v${package_version}"`, and compare it with `${{ github.event.release.tag_name }}`. On mismatch it exits nonzero with a message naming the actual tag, package version, and expected tag.

This replaces `scripts/release-version.mjs`, `scripts/verify-release-version.mjs`, their Node tests, and the corresponding npm script. A dedicated semantic-version parser is unnecessary: npm owns manifest version validation, and exact string equality enforces the release contract. The workflow never calls `npm version`.

### Prefer npm package boundaries over duplicated inventory policy

The existing `files` array remains the positive allowlist for `components`, `composables`, `src`, `README.md`, and `LICENSE`. `npm pack --dry-run` remains an explicit pre-publish gate and gives maintainers the canonical inventory and npm warnings.

The custom package inventory module, verifier, and unit tests duplicate the allowlist and npm exclusions and will be removed. Their multiple copies of required paths create drift without proving consumer behavior. By contrast, the clean packed-package fixture may be retained because installing the actual tarball and exercising documented imports and a Slidev build provides integration evidence beyond `files` or `npm pack --dry-run`. Its command should remain a package-level quality check rather than a static workflow test.

### Use manifest publication settings and explicit publish flags consistently

`publishConfig.access: public` and `publishConfig.provenance: true` remain in `package.json`. The workflow will also invoke `npm publish --access public --provenance`, making the irreversible action clear at the call site. No `.npmrc` setting may disable provenance, and no `NPM_TOKEN`, `NODE_AUTH_TOKEN`, or npm repository secret will be configured.

The manifest version becomes `0.1.1`. The repository URL becomes `git+https://github.com/xdoo/slidev-addon-chapter.git`, npm's normalized Git URL; homepage and bugs URLs remain ordinary HTTPS links.

### Keep workflow correctness out of the package test suite

`tests/publish-workflow.node.mjs` will be removed. Static regex checks tightly couple package tests to YAML formatting and do not execute GitHub Actions or OIDC. The workflow's small size, GitHub's parser, the actual published-release event, and npm Trusted Publisher configuration are the appropriate validation layers. Local validation will run `npm ci`, relevant existing tests, typecheck, build, retained package integration checks, and `npm pack --dry-run`, but never `npm publish`.

## Risks / Trade-offs

- [The npm Trusted Publisher mapping is absent or mismatched] → Document and manually configure owner `xdoo`, repository `slidev-addon-chapter`, workflow `publish.yml`, and the package before publishing the release.
- [A release is published with the wrong tag] → Fail before tests and publication with actual and expected identity values; fix the release/tag rather than changing versions in CI.
- [The allowlist omits a consumer file] → Keep the clean packed-consumer fixture because it validates real installation, imports, component discovery, typecheck, and build.
- [Removing static workflow tests reduces local YAML assertions] → Keep the workflow intentionally small and validate its behavior at the platform boundary; do not recreate a partial Actions interpreter.
- [The runner's bundled npm is too old for Trusted Publishing] → Confirm the effective npm version during implementation and add only the smallest supported npm setup if required.

## Migration Plan

1. Update `package.json` to version `0.1.1`, normalize the repository URL, retain the `files` allowlist and provenance/public settings, and remove redundant release scripts from `scripts`.
2. Remove redundant release helper modules and their tests while retaining package-level integration validation that proves installed consumer behavior.
3. Replace the workflow with the linear Trusted Publishing sequence and inline tag/version comparison.
4. Run `npm ci`, package tests, typecheck, build, retained packed-consumer verification, and `npm pack --dry-run`; do not run `npm publish` locally.
5. Configure the npm Trusted Publisher, commit version `0.1.1`, create tag `v0.1.1`, and publish the matching GitHub Release.

Before a successful npm publication, rollback is an ordinary revert of metadata, scripts, and workflow changes. After publication, npm version `0.1.1` is immutable and corrections require a new package version and matching release tag.

## Open Questions

None. The package version, release tag form, repository identity, public access, and provenance behavior are fixed by this change.
