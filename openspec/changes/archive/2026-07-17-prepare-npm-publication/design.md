## Context

The repository is an npm project (`package-lock.json` lockfile v3) whose consumers load a source-based Slidev addon. Slidev discovers Vue files under root `components/`; the public exports point to `src/index.ts` and `composables/index.ts`. `npm run build` instead builds `playground/slides.md` into `dist/`, so `dist/`, `dist-base/`, and `dist-seriph/` are integration evidence rather than package entry points.

Current quality commands are `npm test`, `npm run typecheck`, `npm run build`, and the separately available `npm run test:e2e`; there is no lint configuration or lint script. The package already declares MIT and contains a complete MIT license. It lacks author/repository/homepage/bugs/package-manager/publish metadata, a release workflow, and an install-from-tarball check. No `.github` directory exists.

The working package name is `slidev-addon-chapters`, while the required repository identity is `https://github.com/xdoo/slidev-addon-chapter.git`. npm name availability and ownership cannot be inferred locally. The root engine currently says Node `>=20.12.0`, but the locked toolchain contains packages requiring at least Node 20.19; release automation therefore needs a concrete supported runtime and the declared floor must be verified rather than copied blindly.

## Goals / Non-Goals

**Goals:**

- Produce a small, auditable public tarball containing every source file Slidev and exported APIs require.
- Establish reproducible local and CI release gates with a clean consumer-install smoke test.
- Publish only from a published GitHub Release through npm Trusted Publishing and provenance.
- Make pre-publication choices explicit and preserve all runtime/component/styling behavior.

**Non-Goals:**

- Bundle or transpile the addon into `dist/`, replace npm/Slidev, or introduce a monorepo.
- Add linting, changelog generation, automatic version calculation, GitHub Packages, or feature/refactoring work.
- Reserve a package name, configure npm, create a release, or publish during this change.
- Support a credential-based manual `npm publish` fallback; local commands stop at pack/dry-run and fixture verification.

## Decisions

### Keep the source-based Slidev package layout

The publish allowlist will include `components/`, `composables/`, `src/`, `README.md`, and `LICENSE`, plus only other consumer-required type files proven necessary by a clean packed-package test. It will not treat playground `dist*` as library output. The existing `.` and `./composables` exports remain source entry points unless the consumer test demonstrates a blocker; any necessary export or dependency-classification adjustment must retain the same imports and behavior.

A compiled library bundle was rejected because no current command produces one and Slidev addon discovery relies on the root structure. Publishing the current `docs/` by default is also rejected unless a consumer requirement is demonstrated; documentation remains available in README/repository.

### Use manifest allowlisting plus machine-verifiable pack inspection

`package.json#files` will be the primary positive allowlist, with package entry points and required conventional files cross-checked against `npm pack --dry-run --json`. A dependency-free verification script will parse npm's JSON inventory and fail on missing required paths or forbidden categories: VCS/local configuration, tests, coverage, temporary/build/export output, OpenSpec working files, playground/examples/fixtures not needed at runtime, IDE files, and credentials/secrets. A real `npm pack` into a temporary directory will feed the clean-fixture install test; tarballs are not committed.

Relying only on `.npmignore` or human inspection was rejected because deny lists drift and cannot establish required-file presence.

### Preserve npm and use explicit release scripts

The lockfile remains authoritative and CI uses `npm ci`. Implementation will add focused package verification and release-gate scripts that compose existing commands rather than duplicate their bodies. The gate runs tests, typecheck, the Slidev playground build, pack verification, and clean-fixture consumption. `test:e2e` will be included only if implementation confirms it is deterministic in GitHub Actions and materially validates the packed package; the new clean fixture is mandatory. No lint step is fabricated while no lint command exists.

The fixture will create or copy a minimal Slidev project outside the package tree, install the generated `.tgz` plus compatible peers, declare the packed addon's final name, import both documented exports, use an automatically discovered component, and run typecheck/build. This tests the artifact rather than repository-relative `addons: [./]` behavior.

### Use Node 22 in CI and reconcile the supported floor with the lockfile

The workflow will use the current Node 22 LTS line, npm caching, and `npm ci`. The implementation must test the declared lower bound against `npm ci` and all gates. Given the locked dependency requiring Node 20.19, the planned package engine range is `>=20.19.0` unless dependency resolution proves the existing `>=20.12.0` floor supportable without replacing the package manager/build system. README, manifest, fixture, and workflow must agree. The exact npm version used to generate the current lockfile will be recorded through `packageManager` after inspecting the local/CI-supported npm version and updating the lockfile consistently.

### Publish from `.github/workflows/publish.yml` on a published GitHub Release

The authoritative trigger is `release.types: [published]`; pull requests, ordinary pushes, tags alone, and draft releases cannot publish. The workflow checks out the release target commit explicitly, sets `permissions: { contents: read, id-token: write }`, installs Node/npm, runs the complete gate, and publishes to the public npm registry with provenance. It contains no `NODE_AUTH_TOKEN` or npm token secret.

Before publish, a script normalizes the release tag by accepting the documented `v<semver>` form, then requires equality among that version, the GitHub Release tag, and `package.json#version`; malformed or mismatched values fail visibly. The workflow uses the exact filename `publish.yml`, which must be entered along with owner `xdoo` and repository `slidev-addon-chapter` in npm Trusted Publisher configuration before the first release.

Manual token publishing was rejected because it weakens provenance and creates credential rotation work. Workflow dispatch was rejected as an authoritative release trigger because it separates publication from the public release record.

### Complete metadata without pre-deciding registry-owned facts

The implementation will set the repository URL exactly to `https://github.com/xdoo/slidev-addon-chapter.git`, derive homepage and bugs links from it, preserve `type: module`, declare `license: MIT`, add author/keywords/package-manager/public publish configuration, and make entry points/types/dependencies consistent with the verified tarball. `@slidev/client` and Vue remain peer dependencies and development dependencies for tests; production dependencies will be added only if source analysis and the packed fixture prove they are runtime-owned by the addon.

Before implementation finalizes `name` or version, the maintainer must check registry availability/ownership and choose scoped versus unscoped publication. `slidev-addon-chapters` remains the evidence-backed candidate, not an automatic conclusion. If scoped, public access must be explicit and every README/fixture/release reference must use the scope. The current `0.1.0` remains the candidate initial semantic version, but the first-release checklist requires an explicit confirmation before its committed version and release tag are created.

### Keep documentation and licensing changes narrow

README changes will cover the finalized npm install name, addon configuration, minimal chapter usage, supported Node/Slidev/Vue versions, package/repository links, existing styling API, MIT licensing, and an exact maintainer release checklist. Existing valid feature documentation stays intact. The current complete MIT license is retained; only metadata consistency is required.

## Risks / Trade-offs

- [The candidate npm name is unavailable or owned by someone else] → Resolve availability and scope before metadata is finalized; propagate one chosen name consistently and do not publish speculatively.
- [Source exports work locally but omit a transitive file from the tarball] → Install the real tarball into a clean Slidev fixture and build/import every documented surface.
- [Node 20.12 documentation conflicts with locked tooling] → Test the lower bound and raise it to the demonstrated `>=20.19.0` floor if necessary; keep all compatibility declarations aligned.
- [Trusted Publisher identity is configured with a different workflow filename] → Fix the contract at `.github/workflows/publish.yml` and document the exact npm-side owner/repository/workflow settings.
- [A published Release triggers an irreversible bad publish] → Validate commit, tag/version, quality gates, and tarball before `npm publish`; npm versions remain immutable, so rollback is a corrective release rather than overwrite.
- [Positive allowlisting excludes useful repository docs] → Include consumer necessities only; repository links keep ancillary docs discoverable without expanding the runtime artifact.

## Migration Plan

1. Resolve and record package name/scope, public access, initial version, npm CLI/package-manager declaration, and supported Node floor.
2. Update metadata/allowlist/scripts and lockfile, then verify dry-run inventory and a real packed artifact in a clean fixture.
3. Add and exercise `publish.yml` without creating a release; configure npm Trusted Publishing with its exact repository identity and filename.
4. Update the README/checklist, run all gates, commit the chosen version, and locally re-run pack verification.
5. Create a published GitHub Release tagged `v<package-version>` at the intended commit; observe the workflow and npm provenance.

Before the first publish, rollback is removal/revision of the workflow and metadata. After publication, defects require deprecation if appropriate and a new semantic version; the published version cannot be replaced.

## Open Questions

- Is `slidev-addon-chapters` available and desired, or must the package use a scope/alternate name?
- Is the initial release version confirmed as `0.1.0`, or should another semantic version be committed?
- Does lower-bound verification support Node 20.12, or must the declared floor become the toolchain-supported `>=20.19.0`?
