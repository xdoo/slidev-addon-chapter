## Why

The addon has working package-shaped source and local quality checks, but it lacks complete npm metadata, release automation, and evidence that the published tarball can be installed and consumed. A repository-specific release contract is needed before the unreserved working package name is used for a first public release.

## What Changes

- Complete and verify npm metadata against the existing source-based Slidev addon structure, including repository identity, compatibility, dependencies, exports, published files, and public-access configuration.
- Define an explicit package-content allowlist and dry-run tarball verification that retains the root `components/`, `composables/`, and `src/` consumer surfaces while excluding playground builds, tests, local tooling, OpenSpec files, credentials, and other development-only material.
- Make reproducible installation, the existing test/typecheck/build checks, package inspection, and clean-fixture installation mandatory release gates; add no lint tool unless a repository lint command exists when implementation begins.
- Add a published-GitHub-Release workflow using npm Trusted Publishing, OIDC provenance, minimum GitHub permissions, exact tag/package-version validation, and no long-lived npm token.
- Document first-release decisions and preparation, including package-name availability, scoped versus unscoped/public access, trusted-publisher setup, initial version selection, and local pack verification.
- Update only the release- and consumption-relevant README sections and verify the existing MIT license without changing runtime behavior or public component/composable/styling APIs.

## Capabilities

### New Capabilities

- `npm-release-management`: Public npm package metadata, tarball composition, release quality gates, clean-fixture consumption, trusted GitHub Actions publication, and first-release operations.

### Modified Capabilities

- `addon-delivery-and-quality`: Strengthen release-candidate packaging, documentation, compatibility, and verification requirements while preserving the existing source-based Slidev addon delivery model.

## Impact

- Planning targets `package.json`, `package-lock.json`, `.gitignore` or a package allowlist, release-verification scripts/fixtures, `README.md`, and a new `.github/workflows/publish.yml` workflow.
- npm remains the package manager and `package-lock.json` remains authoritative; the workflow will use a supported Node.js version satisfying the current `>=20.12.0` contract and the resolved dependency toolchain.
- Existing exports (`.` and `./composables`) continue to reference shipped TypeScript source, and Slidev continues to discover root Vue components; the playground `dist*` outputs are not library artifacts.
- The current package name `slidev-addon-chapters` differs from the repository name `slidev-addon-chapter`; final npm naming, scope, availability, and initial release version remain explicit first-release decisions rather than implicit renames.
- No production behavior or public API change is intended.
