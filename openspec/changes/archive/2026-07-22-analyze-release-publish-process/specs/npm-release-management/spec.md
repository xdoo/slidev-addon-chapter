## MODIFIED Requirements

### Requirement: First release requires explicit preparation
Before automated publication, maintainers MUST confirm npm ownership and availability of `slidev-addon-chapters`, commit package version `0.1.1`, locally run all release gates except publication, and configure the npm Trusted Publisher for GitHub owner `xdoo`, repository `slidev-addon-chapter`, and workflow `publish.yml`. The README SHALL document that a published GitHub Release is required, that its tag MUST be `v<package-version>`, that publication targets npm at `https://registry.npmjs.org` rather than GitHub Packages, and that failed runs are investigated in GitHub Actions and the corresponding npm/GitHub Release views. The maintained process SHALL create a published GitHub Release tagged `v0.1.1` only after these steps. Local manual publication with a token SHALL NOT be a supported fallback, and no manual workflow path SHALL publish an immutable package version.

#### Scenario: Trusted Publisher is not configured
- **WHEN** the package lacks the exact npm Trusted Publisher mapping for the repository and workflow
- **THEN** automated publication cannot authenticate and maintainers are directed to configure it before publishing the GitHub Release

#### Scenario: Release preparation is complete
- **WHEN** version `0.1.1` and all workflow changes are committed, local gates pass, and the Trusted Publisher is configured
- **THEN** a maintainer creates tag `v0.1.1`, publishes the matching GitHub Release, and the release-only workflow is allowed to publish to npm

#### Scenario: Maintainer follows the documented release process
- **WHEN** a maintainer prepares a new version
- **THEN** the README directs them to set `package.json` version, merge to `main`, create tag `v<version>`, publish the GitHub Release, and inspect the resulting Actions run and npm package status if publication fails

#### Scenario: Manual validation is requested
- **WHEN** a maintainer wants to validate the release workflow without publishing
- **THEN** they use the documented local quality commands and no manual workflow invocation publishes the package or reuses an immutable npm version
