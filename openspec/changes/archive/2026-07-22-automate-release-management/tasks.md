## 1. Establish the Release Please model

- [x] 1.1 Confirm the repository audit: package/lock versions are `0.1.1`, npm `latest` is `0.1.0`, no Git tags or GitHub Releases exist, existing commits are not consistently Conventional Commits, and `publish.yml` is the separate npm publication gate.
- [x] 1.2 Add `release-please-config.json` for the root Node package `slidev-addon-chapters`, `CHANGELOG.md`, `include-component-in-tag: false`, and the `v<version>` tag format.
- [x] 1.3 Add `.release-please-manifest.json` with the correct bootstrap baseline `0.1.0` and a bounded first-release strategy that produces exactly `0.1.1` without a permanent forced version.
- [x] 1.4 Add an initial `CHANGELOG.md` compatible with Release Please and preserve the existing package version alignment in `package.json` and `package-lock.json`.

## 2. Add automated release-PR and release creation workflow

- [x] 2.1 Add `.github/workflows/release-please.yml` triggered only by pushes to `main`, using `googleapis/release-please-action@v4` in manifest mode.
- [x] 2.2 Configure release workflow permissions as least privilege for Release Please (`contents: write`, `pull-requests: write`, and only the required issue permission), with no `id-token: write`, npm registry, or npm secret.
- [x] 2.3 Configure Release Please with a non-default GitHub App installation token or fine-grained `RELEASE_PLEASE_TOKEN` so the generated `release.published` event can trigger `publish.yml`; document the required repository settings and secret names without storing credentials.
- [x] 2.4 Ensure the merged Release PR creates exactly tag `v<version>` and a published GitHub Release for the same merge commit, without direct npm publication or automatic PR merging.

## 3. Harden and preserve npm publication

- [x] 3.1 Keep `.github/workflows/publish.yml` on `release.types: [published]` and retain release-tag checkout, Node/npm setup, npmjs.org, tests, typecheck, build, fixture verification, `npm pack --dry-run`, provenance, and `npm publish --access public --provenance`.
- [x] 3.2 Move `contents: read` and `id-token: write` to the publish job so OIDC permission is granted only to the npm publishing job; remove any unrelated workflow-level publish permission.
- [x] 3.3 Add an exact-version registry guard that fails clearly when `slidev-addon-chapters@<version>` already exists, while allowing a missing version to proceed to the normal publish step.
- [x] 3.4 Verify no `NPM_TOKEN`, `NODE_AUTH_TOKEN`, GitHub Packages registry, manual publish trigger, or direct Release Please publish path is introduced.

## 4. Define and document versioning/bootstrap behavior

- [x] 4.1 Replace the manual README release instructions with the automated flow: merge to `main`, review/update the Release PR, merge it, observe automatic tag and GitHub Release, then observe npm publication.
- [x] 4.2 Document Conventional Commit rules: `fix`/`perf` patch, `feat` minor before `1.0.0`, and `BREAKING CHANGE`/`!` major; document that old non-conventional commits are not rewritten.
- [x] 4.3 Document the first-release expectation that the generated Release PR must propose `0.1.1`, and that no tag, Release, or npm publication is created during bootstrap.
- [x] 4.4 Document failed-release diagnosis in Release Please PRs, GitHub Actions, GitHub Releases/tags, npm package versions, and provenance.
- [x] 4.5 Document the one-time GitHub release credential setup and required permission to let GitHub Actions create/approve PRs.
- [x] 4.6 Document npm Trusted Publisher setup: owner `xdoo`, repository `slidev-addon-chapter`, workflow `publish.yml`, allowed action `npm publish`, and registry `https://registry.npmjs.org`; include the equivalent `npm trust github` command and note that the package must already exist.

## 5. Validate safely and bootstrap handoff

- [x] 5.1 Run `npm ci`.
- [x] 5.2 Run `npm test`.
- [x] 5.3 Run `npm run typecheck`.
- [x] 5.4 Run `npm run build`.
- [x] 5.5 Run `npm run verify:fixture`.
- [x] 5.6 Run `npm pack --dry-run` and verify the intended package inventory.
- [x] 5.7 Validate the Release Please configuration and inspect the generated first Release PR/dry-run to ensure it proposes exactly `0.1.1` and updates both changelog and package metadata.
- [x] 5.8 Confirm no tag, GitHub Release, or npm publish occurred during implementation and that the final diff contains no runtime API changes or permanent credentials.
- [x] 5.9 Record the exact first real-release handoff: configure external credentials, merge the automation, review/merge the `0.1.1` Release PR, verify `v0.1.1` and the GitHub Release, then inspect the `publish.yml` run and npm provenance.
