## 1. Resolve First-Release Decisions

- [x] 1.1 Check npm registry availability and ownership for `slidev-addon-chapters`, record the repository-name discrepancy, and obtain the maintainer's final scoped or unscoped public package name without publishing or reserving it implicitly.
- [x] 1.2 Confirm public access and the initial semantic version, using the current `0.1.0` only if explicitly selected, and define the corresponding `v<version>` GitHub Release tag.
- [x] 1.3 Run `npm ci` and the repository quality gates at the declared Node 20.12 lower bound; retain it only if supported, otherwise document and apply the demonstrated `>=20.19.0` floor, while selecting Node 22 for CI.
- [x] 1.4 Determine the npm version compatible with the lockfile/toolchain and record the exact `packageManager` value without replacing npm or regenerating dependencies unnecessarily.

## 2. Complete Package Metadata and Contents

- [x] 2.1 Update `package.json` with the finalized name/version, author, exact `https://github.com/xdoo/slidev-addon-chapter.git` repository URL, homepage, bugs, keywords, MIT license, ESM type, Node engine, package manager, and public npm publish configuration.
- [x] 2.2 Audit the root and subpath exports, types, `@slidev/client`/Vue peers, and development dependencies against actual imports; preserve `.` and `./composables` consumer behavior and add no generated entry point or unjustified dependency.
- [x] 2.3 Replace the publish list with a positive consumer allowlist for `components/`, `composables/`, exported `src/`, README, LICENSE, and only proven-required type files; exclude playground outputs, tests, docs/tooling not required at runtime, OpenSpec, local configuration, temporary/export files, and credentials.
- [x] 2.4 Update `package-lock.json` consistently for manifest metadata and verify the existing complete MIT license remains unchanged and `package.json#license` is exactly `MIT`.

## 3. Add Package Verification

- [x] 3.1 Add a dependency-free package-content verifier that parses `npm pack --dry-run --json`, requires every consumer path/entry point, and reports forbidden or credential-like paths explicitly.
- [x] 3.2 Add focused automated tests for accepted inventories, missing required exports/components, and forbidden tests/build/OpenSpec/local/secret-like files.
- [x] 3.3 Add scripts that create a real tarball in temporary storage and install it by path into a clean minimal Slidev fixture using compatible peer dependencies and the finalized package name.
- [x] 3.4 Make the clean fixture exercise full-name addon configuration, automatic component discovery, the root and `/composables` imports, typechecking, and a production Slidev build without repository-relative paths.
- [x] 3.5 Add composed verification/release-gate scripts for existing tests, typecheck, build, dry-run inventory, and clean-fixture validation; include existing browser E2E only if confirmed deterministic and relevant in GitHub Actions, and do not invent a lint command.

## 4. Add Trusted Publishing Workflow

- [x] 4.1 Add a release-identity script with tests that accepts the documented `v<semver>` tag, compares it exactly with `package.json#version`, and fails clearly for malformed/mismatched release data.
- [x] 4.2 Create `.github/workflows/publish.yml` triggered only by a published GitHub Release, with explicit checkout of the release target commit and minimum `contents: read` plus `id-token: write` permissions.
- [x] 4.3 Configure the workflow to install Node 22 and the declared npm version, cache npm data, run `npm ci`, execute every release gate, revalidate the exact release identity, and publish publicly with npm provenance.
- [x] 4.4 Verify the workflow contains no npm token/`NODE_AUTH_TOKEN`, cannot publish from pull requests, pushes, tag creation alone, or draft preparation, and fails rather than conditionally skipping any validation.

## 5. Update Focused Documentation

- [x] 5.1 Update README installation, full-name addon configuration, and minimal usage examples to use the finalized package name while preserving existing feature semantics and styling API documentation.
- [x] 5.2 Document the verified Node/Slidev/Vue support range, npm package/repository/issues links, semantic-version expectations, and MIT license information.
- [x] 5.3 Document the first-release checklist: name availability/scope/public access, initial version commit, local dry-run and clean-fixture verification, and npm Trusted Publisher configuration for owner `xdoo`, repository `slidev-addon-chapter`, workflow `publish.yml`.
- [x] 5.4 Document subsequent releases through a matching `v<package-version>` published GitHub Release and state that token-based manual publishing is not a supported fallback.

## 6. Verify Release Readiness and Compatibility

- [x] 6.1 From a clean lockfile install, run tests, typecheck, production build, package inventory verification, and the packed clean-fixture validation on the selected supported toolchain.
- [x] 6.2 Inspect and record the final `npm pack --dry-run` inventory, confirming all required component/composable/source/license/readme files and none of the forbidden development-only categories.
- [x] 6.3 Run existing component/runtime tests and the playground build to confirm chapter/subchapter behavior, public APIs, automatic component discovery, and documented styling selectors remain unchanged.
- [x] 6.4 Validate `publish.yml` syntax/event/permissions/version-failure paths without publishing, and confirm the README gives the exact npm-side Trusted Publisher settings required before the first GitHub Release.
- [x] 6.5 Perform a final metadata consistency review across `package.json`, lockfile, packed fixture, README, release tag convention, and repository links; stop before creating a release or publishing the package.
