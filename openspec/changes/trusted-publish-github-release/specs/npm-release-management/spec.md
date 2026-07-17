## MODIFIED Requirements

### Requirement: Public npm metadata is complete and evidence-based
The package manifest SHALL declare the available npm name `slidev-addon-chapters`, semantic version `0.1.1`, description, `MIT` license, author, repository, homepage, bugs URL, relevant keywords, ESM package type, supported Node range, npm package-manager version, published files, verified entry points/exports/types, peer and development dependencies, and public publish configuration with provenance. The repository URL MUST equal npm's normalized Git URL `git+https://github.com/xdoo/slidev-addon-chapter.git`, and metadata MUST NOT claim an entry point or generated file that the package does not ship.

#### Scenario: Metadata is ready for publication
- **WHEN** the manifest is validated before release
- **THEN** every required field is present and internally consistent with package version `0.1.1`, the selected package name, source entry points, lockfile, README, and public npm registry

#### Scenario: Repository metadata is inspected by npm
- **WHEN** npm reads the package manifest
- **THEN** the repository uses the normalized `git+https` form without a repository URL normalization warning

### Requirement: Published contents are minimal and sufficient
The package SHALL use `package.json#files` as its primary positive allowlist and SHALL include the root Slidev component files, composable files, exported TypeScript source, README, and LICENSE. It MUST exclude source-control metadata, local or IDE configuration, tests, coverage, temporary files, playground/build/export output, OpenSpec working files, unrelated examples or fixtures, and secrets or credentials. The release gate SHALL use `npm pack --dry-run` as the canonical package inventory check and MUST NOT maintain a second custom inventory that duplicates the manifest allowlist and npm exclusion behavior.

#### Scenario: Dry-run tarball inventory passes
- **WHEN** `npm pack --dry-run` evaluates the release candidate
- **THEN** npm reports only the consumer files admitted by the manifest allowlist and its standard mandatory package files

#### Scenario: Package allowlist changes
- **WHEN** a consumer-required path is added or removed
- **THEN** maintainers update the manifest `files` boundary and verify the canonical dry-run inventory rather than duplicating the path in a release-only policy script

### Requirement: Packed package works in a clean Slidev consumer
A release candidate MUST be packable to a tarball and installable into a clean fixture project with compatible Slidev and Vue peers. The fixture MUST use the package name through Slidev addon configuration, exercise automatic component discovery and both documented exports, and complete typecheck and production build without repository-relative imports. This integration check SHALL be retained because it verifies installed consumer behavior beyond npm's file selection.

#### Scenario: Clean consumer installation succeeds
- **WHEN** the generated tarball is installed into the clean fixture and its validation commands run
- **THEN** npm resolves the package, Slidev discovers the addon components, documented imports typecheck, and the fixture builds successfully

#### Scenario: Package works only from repository root
- **WHEN** the fixture requires `addons: [./]`, undeclared repository files, or paths outside the installed package
- **THEN** release verification fails

### Requirement: Publication is gated by reproducible quality checks
Release automation MUST install dependencies with `npm ci` from `package-lock.json`, run the applicable existing package tests, typecheck, Slidev build, meaningful packed-consumer verification, and `npm pack --dry-run` before publishing. The gate MUST NOT add scripts or tests whose only purpose is to statically inspect workflow YAML, redundantly validate the version outside the workflow, duplicate tarball inventories, or reimplement npm behavior. A lint gate SHALL run only when the repository has a justified lint command.

#### Scenario: Complete quality gate succeeds
- **WHEN** a release candidate is evaluated on the supported Node/npm toolchain
- **THEN** reproducible install, package tests, typecheck, build, meaningful packed-consumer verification, and npm dry-run packaging all succeed before publication begins

#### Scenario: Any quality check fails
- **WHEN** installation, a retained test, typecheck, build, packed-consumer verification, or dry-run packaging exits unsuccessfully
- **THEN** publication is blocked and the workflow reports the failing step

#### Scenario: Redundant release helper is reviewed
- **WHEN** a custom release script or test provides no evidence beyond `package.json#files`, `npm pack --dry-run`, existing package tests, or npm itself
- **THEN** the helper and its associated test are removed instead of being included in the release gate

### Requirement: GitHub Release publication uses npm Trusted Publishing
The repository SHALL define `.github/workflows/publish.yml`, triggered exclusively by a GitHub Release event of type `published`, to check out the release tag, use a supported Node.js version satisfying the package engine, configure `https://registry.npmjs.org`, execute the release gates in a clear sequence, and run `npm publish --access public --provenance`. The workflow MUST use `actions/checkout` and `actions/setup-node`, grant only `contents: read` and `id-token: write`, MUST NOT use `NPM_TOKEN`, `NODE_AUTH_TOKEN`, or another npm repository secret, and MUST NOT publish from pull requests, ordinary pushes, tag creation alone, drafts, or workflow dispatch.

#### Scenario: Published GitHub Release is valid
- **WHEN** a GitHub Release is published for a matching release tag and every validation step passes
- **THEN** `publish.yml` obtains npm authorization through OIDC and publishes the public package with provenance

#### Scenario: Non-release repository event occurs
- **WHEN** a pull request, push, tag-only event, draft edit, or manual dispatch occurs
- **THEN** no npm publication job is triggered

#### Scenario: Long-lived npm credential is absent
- **WHEN** the workflow and repository release contract are inspected
- **THEN** publishing relies on `id-token: write` Trusted Publishing and does not require a token secret

#### Scenario: Provenance configuration is evaluated
- **WHEN** npm publication runs in GitHub Actions
- **THEN** provenance is enabled by the publish invocation and manifest configuration and is not disabled by local npm configuration

### Requirement: Release identity is exact and consistent
Before publishing, the workflow MUST read `package.json#version`, calculate the expected tag as `v<package-version>`, and compare it directly with the published GitHub Release tag. For package version `0.1.1`, only tag `v0.1.1` SHALL pass. The check MUST execute directly in the workflow without a separate repository script, MUST produce an understandable error containing the actual and expected identity when they differ, and MUST NOT increase or otherwise modify the package version.

#### Scenario: Release identity matches
- **WHEN** the published GitHub Release tag is `v0.1.1` and the manifest version is `0.1.1`
- **THEN** version validation permits the remaining gates and publication to proceed

#### Scenario: Release and package versions differ
- **WHEN** the published GitHub Release tag does not equal `v` plus `package.json#version`
- **THEN** the workflow fails before `npm publish` with a message identifying the actual tag, package version, and expected tag

#### Scenario: Workflow evaluates the version
- **WHEN** the release identity check runs
- **THEN** it only reads and compares the committed version and never invokes automatic versioning behavior

### Requirement: First release requires explicit preparation
Before automated publication, maintainers MUST confirm npm ownership of `slidev-addon-chapters`, commit package version `0.1.1`, locally run all release gates except publication, and configure the npm Trusted Publisher for GitHub owner `xdoo`, repository `slidev-addon-chapter`, and workflow `publish.yml`. The maintained process SHALL create a published GitHub Release tagged `v0.1.1` only after these steps. Local manual publication with a token SHALL NOT be a supported fallback.

#### Scenario: Trusted Publisher is not configured
- **WHEN** the package lacks the exact npm Trusted Publisher mapping for the repository and workflow
- **THEN** automated publication cannot authenticate and maintainers are directed to configure it before publishing the GitHub Release

#### Scenario: Release preparation is complete
- **WHEN** version `0.1.1` and all workflow changes are committed, local gates pass, and the Trusted Publisher is configured
- **THEN** a maintainer creates and publishes GitHub Release `v0.1.1` to trigger publication

