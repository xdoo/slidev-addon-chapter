## MODIFIED Requirements

### Requirement: GitHub Release publication uses npm Trusted Publishing
The repository SHALL define `.github/workflows/publish.yml`, triggered exclusively by a GitHub Release event of type `published`, to check out the release tag, use a supported Node.js version satisfying the package engine, configure `https://registry.npmjs.org`, execute the release gates in a clear sequence, reject an already-existing exact package version, and run `npm publish --access public --provenance`. The workflow MUST use `actions/checkout` and `actions/setup-node`, grant `contents: read` and `id-token: write` only to the publish job, MUST NOT use `NPM_TOKEN`, `NODE_AUTH_TOKEN`, or another npm repository secret, and MUST NOT publish from pull requests, ordinary pushes, tag creation alone, drafts, workflow dispatch, or the Release Please workflow directly.

#### Scenario: Published GitHub Release is valid
- **WHEN** Release Please publishes a matching GitHub Release and every validation step passes
- **THEN** `publish.yml` obtains npm authorization through OIDC and publishes the public package with provenance

#### Scenario: Non-release repository event occurs
- **WHEN** a pull request, push, tag-only event, draft edit, or manual dispatch occurs
- **THEN** no npm publication job is triggered

#### Scenario: Long-lived npm credential is absent
- **WHEN** the workflow and repository release contract are inspected
- **THEN** publishing relies on `id-token: write` Trusted Publishing and does not require a token secret

#### Scenario: Existing npm version is detected
- **WHEN** the exact package version already exists on `https://registry.npmjs.org`
- **THEN** the publish job fails before `npm publish` with an actionable duplicate-version error

#### Scenario: Provenance configuration is evaluated
- **WHEN** npm publication runs in GitHub Actions
- **THEN** provenance is enabled by the publish invocation and manifest configuration and is not disabled by local npm configuration

### Requirement: First release requires automated preparation
Before automated publication, maintainers MUST confirm npm ownership of `slidev-addon-chapters`, configure Release Please and its non-default GitHub release credential, locally run all release gates except publication, and configure the npm Trusted Publisher for GitHub owner `xdoo`, repository `slidev-addon-chapter`, and workflow `publish.yml` with `npm publish` allowed. The maintained process SHALL generate and review a Release Please PR for `0.1.1`, merge it into `main`, and allow Release Please to create the matching tag and published GitHub Release. Local manual versioning, tag creation, GitHub Release creation, and publication with an npm token SHALL NOT be supported fallbacks.

#### Scenario: Trusted Publisher is not configured
- **WHEN** the package lacks the exact npm Trusted Publisher mapping for the repository and workflow
- **THEN** automated publication cannot authenticate and maintainers are directed to configure it before merging the first Release PR

#### Scenario: Release Please credential uses the default GITHUB_TOKEN
- **WHEN** the release workflow would create the tag or Release using only the default `GITHUB_TOKEN`
- **THEN** the configuration is rejected because the resulting event may not trigger `publish.yml`; a suitable GitHub App or fine-grained release credential is required

#### Scenario: Automated first release is ready
- **WHEN** the first Release PR proposes `0.1.1`, local gates pass, GitHub release automation is configured, and the npm Trusted Publisher is configured
- **THEN** merging the Release PR creates `v0.1.1` and a matching GitHub Release that triggers npm publication
