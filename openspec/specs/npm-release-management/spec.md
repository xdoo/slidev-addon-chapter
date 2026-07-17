## Purpose

Define the package metadata, contents, verification gates, release identity, and trusted publication process required to publish the addon safely to npm.

## Requirements

### Requirement: Public npm metadata is complete and evidence-based
The package manifest SHALL declare the finalized available npm name, semantic version, description, `MIT` license, author, repository, homepage, bugs URL, relevant keywords, ESM package type, supported Node range, npm package-manager version, published files, verified entry points/exports/types, peer and development dependencies, public publish configuration, and release/verification scripts. The repository URL MUST equal `https://github.com/xdoo/slidev-addon-chapter.git`, and metadata MUST NOT claim an entry point or generated file that the build does not produce.

#### Scenario: Metadata is ready for publication
- **WHEN** the finalized manifest is validated before release
- **THEN** every required field is present and internally consistent with the selected package name, verified source entry points, lockfile, README, and public npm registry

#### Scenario: Package name has not been secured
- **WHEN** registry availability, ownership, or scoped-versus-unscoped publication has not been confirmed
- **THEN** release preparation remains incomplete and the working name is not silently treated as reserved

### Requirement: Published contents are minimal and sufficient
The package SHALL positively include the root Slidev component files, composable files, exported TypeScript source, README, LICENSE, and any additional consumer type file proven necessary. It MUST exclude source-control metadata, local/IDE configuration, tests unless deliberately required, coverage, temporary files, playground/build/export output, OpenSpec working files, unrelated examples/fixtures, and secrets or credentials.

#### Scenario: Dry-run tarball inventory passes
- **WHEN** `npm pack --dry-run --json` is checked by the package-content verifier
- **THEN** all required consumer paths are present and no forbidden development-only path is listed

#### Scenario: Required source is omitted
- **WHEN** an export, composable, discovered component, or its required source/type dependency is absent from the inventory
- **THEN** package verification fails before publication

#### Scenario: Forbidden material enters the package
- **WHEN** the inventory contains a forbidden test, build artifact, OpenSpec file, local configuration, temporary file, or credential-like file
- **THEN** package verification fails with the offending path

### Requirement: Packed package works in a clean Slidev consumer
A release candidate MUST be packed to a tarball and installed into a clean fixture project with compatible Slidev and Vue peers. The fixture MUST use the finalized package name through Slidev addon configuration, exercise automatic component discovery and both documented exports, and complete typecheck and production build without repository-relative imports.

#### Scenario: Clean consumer installation succeeds
- **WHEN** the generated tarball is installed into the clean fixture and its validation commands run
- **THEN** npm resolves the package, Slidev discovers the addon components, documented imports typecheck, and the fixture builds successfully

#### Scenario: Package works only from repository root
- **WHEN** the fixture requires `addons: [./]`, undeclared repository files, or paths outside the installed package
- **THEN** release verification fails

### Requirement: Publication is gated by reproducible quality checks
Release automation MUST install dependencies with `npm ci` from `package-lock.json`, run the applicable existing tests, typecheck, and Slidev build, verify package contents, and validate the clean packed-package fixture before publishing. A lint gate SHALL run only when the repository has a justified lint command; the release change MUST NOT add a lint tool solely to satisfy a nominal gate.

#### Scenario: Complete quality gate succeeds
- **WHEN** a release candidate is evaluated on the supported Node/npm toolchain
- **THEN** reproducible install, tests, typecheck, build, package inventory, and clean-fixture validation all succeed before publication begins

#### Scenario: Any quality check fails
- **WHEN** installation, tests, typecheck, build, inventory verification, or fixture validation exits unsuccessfully
- **THEN** publication is blocked and the workflow reports a failing job

### Requirement: GitHub Release publication uses npm Trusted Publishing
The repository SHALL define `.github/workflows/publish.yml`, triggered only when a GitHub Release is published, to check out the release target commit, use the supported Node and npm versions, run the full quality gate, and publish the public package to npm with provenance. The workflow MUST grant only `contents: read` and `id-token: write`, MUST NOT use a long-lived npm automation token, and MUST NOT publish from pull requests, ordinary pushes, tag creation alone, drafts, or prerelease preparation events.

#### Scenario: Published GitHub Release is valid
- **WHEN** a GitHub Release is published for a release commit whose validation and version checks pass
- **THEN** `publish.yml` obtains npm authorization through OIDC and publishes the public package with provenance

#### Scenario: Non-release repository event occurs
- **WHEN** a pull request, push, or tag-only event occurs
- **THEN** no npm publication job is triggered

#### Scenario: Long-lived npm credential is absent
- **WHEN** the workflow and repository release contract are inspected
- **THEN** publishing relies on `id-token: write` Trusted Publishing and does not require `NODE_AUTH_TOKEN` or an npm token secret

### Requirement: Release identity is exact and consistent
Before publishing, the workflow MUST require the documented `v<semantic-version>` GitHub Release tag, the release target commit, and `package.json#version` to describe the same release. A malformed tag, version mismatch, or inability to check out the exact target MUST fail rather than skip validation or publish another commit.

#### Scenario: Release identity matches
- **WHEN** release tag `vX.Y.Z` targets the checked-out commit and the manifest version is `X.Y.Z`
- **THEN** version validation permits the remaining gates and publication to proceed

#### Scenario: Release and package versions differ
- **WHEN** the normalized GitHub Release tag differs from `package.json#version`
- **THEN** the workflow fails before `npm publish`

### Requirement: First release requires explicit preparation
Before the first automated release, maintainers MUST confirm npm name availability and ownership, choose scoped or unscoped naming and public access, select and commit an initial semantic version, verify the package locally, and configure the npm Trusted Publisher for GitHub owner `xdoo`, repository `slidev-addon-chapter`, and workflow `publish.yml`. The maintained process SHALL create the matching published GitHub Release only after these steps. Local manual publication with a token SHALL NOT be a supported fallback.

#### Scenario: Trusted Publisher is not configured
- **WHEN** the package lacks the exact npm Trusted Publisher mapping for the repository and workflow
- **THEN** the first automated release is blocked and maintainers are directed to configure it before publishing the GitHub Release

#### Scenario: First-release choices are unresolved
- **WHEN** package name/scope, public access, or initial version remains undecided
- **THEN** maintainers do not create the publishing GitHub Release

### Requirement: Publication preparation preserves addon compatibility
Metadata, packaging, dependency classification, exports, verification, workflow, and documentation changes MUST NOT alter chapter/subchapter runtime semantics, the public component or composable APIs, or documented styling selectors. Any entry-point, generated-file, or dependency-classification change MUST be assessed against existing local consumers and the packed fixture.

#### Scenario: Existing addon behavior remains unchanged
- **WHEN** the existing unit/component suite and Slidev build run after publication preparation
- **THEN** all existing chapter, subchapter, component, composable, navigation, and styling contracts remain satisfied
