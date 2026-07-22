## Context

The package is a single npm package at repository root. `package.json` and `package-lock.json` already contain version `0.1.1`, while the public npm registry reports `0.1.0` as `latest`; the repository has no Git tags or GitHub Releases. Existing history uses messages such as `change ...`, `optimizing docu`, and merge commits rather than a consistent Conventional Commits format.

The existing `publish.yml` is intentionally a separate release-to-npm gate. It checks out the GitHub Release tag, runs the full quality gate, and publishes to npm with OIDC. The new automation must create the GitHub Release without bypassing that gate.

## Goals / Non-Goals

**Goals:**

- Open controlled Release PRs from pushes to `main`.
- Let Release Please update the npm version files and `CHANGELOG.md`, then create `v<version>` and a GitHub Release after the PR merges.
- Preserve a separate `release.published` → `publish.yml` → npm OIDC publication path.
- Make the first automated candidate resolve to `0.1.1`, without creating a tag or publishing during implementation.
- Define reliable Conventional Commit semantics for future patch, minor, and major releases.
- Keep `id-token: write` limited to the publish job and avoid all npm publish tokens.

**Non-Goals:**

- No automatic merge of Release PRs.
- No direct npm publication from Release Please.
- No GitHub Packages registry, manual version bump workflow, or manual npm fallback.
- No rewrite of existing history merely to normalize old commit messages.

## Decisions

1. **Use Release Please manifest mode for the root package.** Add `release-please-config.json` and `.release-please-manifest.json` with package path `.` and `include-component-in-tag: false`, producing the required unprefixed `v<version>` tags. Release type `node` updates `package.json`, `package-lock.json`, and the generated `CHANGELOG.md`.

2. **Run a dedicated `release-please.yml` on `main`.** The workflow reacts only to pushes on `main` and opens/updates one reviewable Release PR. It has no npm credentials and no OIDC permission. Its repository permissions are limited to the Release Please API needs: `contents: write`, `pull-requests: write`, and `issues: write`.

3. **Use a non-default GitHub credential for Release Please.** GitHub suppresses workflow events caused by the repository `GITHUB_TOKEN`; using it would prevent the created GitHub Release from triggering `publish.yml`. Configure a fine-grained `RELEASE_PLEASE_TOKEN` or equivalent GitHub App installation token with only the repository permissions required to create the Release PR, tag, and Release. This is a GitHub credential, never an npm token.

4. **Keep publication in `publish.yml`.** Release Please creates the Release; the published Release event invokes the existing npm workflow. Move `contents: read` and `id-token: write` to the `publish` job so OIDC is available only where `npm publish` runs. Keep checkout of the release tag, exact tag/version validation, all tests, typecheck, build, fixture verification, dry-run packing, registry URL, and provenance.

5. **Reject duplicate npm versions before publication.** In addition to npm's immutable-version rejection, the publish job checks whether the exact package/version already exists on the public registry and fails with an actionable message before `npm publish`. The check must not treat a missing version as an error.

6. **Adopt Conventional Commits going forward.** `fix:` and `perf:` produce patch releases; `feat:` produces minor releases while the package remains below `1.0.0`; `BREAKING CHANGE:` or a `!` scope produces a major release according to Release Please's semver behavior. Existing non-conventional history is not rewritten; the bootstrap boundary prevents old commits from producing an accidental release.

7. **Bootstrap from the known registry state.** Initialize the manifest's last released version as `0.1.0`, preserve `package.json`/lockfile at `0.1.1`, and set a bootstrap boundary at the implementation baseline. The implementation must verify the generated Release PR proposes exactly `0.1.1` before any tag or Release is allowed. If Release Please cannot derive that candidate from the existing history, use a one-time conventional bootstrap commit or equivalent documented Release Please bootstrap setting; do not add a permanent forced version.

8. **Use `npm trust` only as a maintainer-side setup option.** npm CLI v11 supports `npm trust github <package> --repo xdoo/slidev-addon-chapter --file publish.yml --allow-publish`, but it requires the package to exist and authenticated account-level setup. Repository code documents the command and web UI fields; it does not run it or store credentials.

## Risks / Trade-offs

- [Release Please uses the default `GITHUB_TOKEN`] → Require the external release credential and document why it is needed to emit a downstream `release.published` event.
- [Old commits are not Conventional Commits] → Set a bootstrap boundary and document the convention for all new commits; do not rewrite history.
- [Manifest/package bootstrap versions disagree] → Validate the first generated Release PR and keep the manifest's `0.1.0` baseline only until the `0.1.1` Release PR is merged.
- [The npm version already exists] → Check the public registry before publish and let npm's immutable-version rule remain the final guard.
- [A Release PR is merged without required checks] → Protect `main` and require the existing CI checks and review before merging; Release Please itself does not auto-merge.
- [Release Please action or credential is compromised] → Pin reviewed action major versions, keep permissions scoped, use a fine-grained/App credential, and give the publish workflow no release-creation permissions.

## Migration Plan

1. Add the Release Please workflow/configuration and changelog bootstrap without creating a tag or Release.
2. Configure the GitHub release credential and allow GitHub Actions to create/approve PRs where required.
3. Confirm the first Release PR proposes `0.1.1` and updates the package metadata/changelog correctly.
4. Merge that Release PR through normal review and required checks; Release Please then creates tag `v0.1.1` and the GitHub Release.
5. The published Release triggers `publish.yml`; verify the npm package and provenance.

Rollback is a normal revert before the first Release PR is merged. After a package version is published, corrections require a new semver version; npm versions and tags must not be reused.

## Open Questions

- The implementation must choose between a fine-grained `RELEASE_PLEASE_TOKEN` and a GitHub App installation token based on what repository administration can provision. Both satisfy the event-trigger requirement; the App token avoids storing a long-lived user token but requires more one-time setup.
