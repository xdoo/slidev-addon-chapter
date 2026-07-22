## Why

The repository already contains the intended npm Trusted Publishing workflow, but the first release has not yet been completed and the operator-facing process is not documented in the README. The release identity, npm registry target, local quality gates, and external Trusted Publisher setup need one explicit, verifiable contract before `0.1.1` can be published safely.

## What Changes

- Verify and, where necessary, correct the release workflow so a published GitHub Release is the only publication trigger.
- Preserve least-privilege OIDC permissions, npm registry publication, provenance, the declared Node/npm toolchain, tag/version validation, and all existing quality gates.
- Keep publication free of long-lived npm tokens and prevent GitHub Packages configuration from becoming part of the process.
- Add a concise README section titled `Release process` describing the required `v<package-version>` tag, GitHub Release handoff, npm destination, release steps, and failure diagnostics.
- Record the exact external npm Trusted Publisher mapping required for `xdoo/slidev-addon-chapter` and `.github/workflows/publish.yml`.
- Run the complete local release verification sequence, including `npm pack --dry-run`, without creating a release or publishing the package.
- Do not add a manual publication path; retain the release-only trigger so a manual run cannot accidentally republish an immutable npm version.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `npm-release-management`: Clarify and verify the first-release handoff, release documentation, external Trusted Publisher prerequisites, and the non-publication local validation contract.

## Impact

- `.github/workflows/publish.yml` may be corrected only where the audit finds a concrete release or security issue.
- `README.md` gains the maintainer-facing release procedure.
- `openspec/specs/npm-release-management/spec.md` receives a delta for the clarified release contract.
- No runtime source API, package exports, npm registry, or dependency model changes are intended.
- External setup remains required in GitHub and npm: repository Actions permissions and an npm Trusted Publisher for owner `xdoo`, repository `slidev-addon-chapter`, workflow `publish.yml`.
