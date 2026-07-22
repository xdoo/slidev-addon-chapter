## Context

The package is `slidev-addon-chapters` at version `0.1.1`. The repository has a release-only workflow that checks out the published release tag, uses Node 24 and npm 11.17.0, runs the existing quality gates, and publishes to `https://registry.npmjs.org` with OIDC provenance. There are no local Git tags, and no GitHub Release or npm publication can be represented in repository files. The README currently links to npm but does not explain how a maintainer creates a release.

The change must remain small, preserve the existing package contract, and never publish during local validation or implementation.

## Goals / Non-Goals

**Goals:**

- Audit the workflow against the release contract and correct only concrete issues.
- Make the version/tag identity `package.json:version` ↔ `v<version>` explicit and fail closed.
- Preserve OIDC Trusted Publishing, provenance, least-privilege permissions, npmjs.org, and all existing checks.
- Document the first release and subsequent release sequence, including failure investigation.
- Define the exact external npm Trusted Publisher configuration and local commands required before publishing `v0.1.1`.

**Non-Goals:**

- No GitHub Release, Git tag, npm publish, or GitHub Packages publication.
- No long-lived npm token or repository secret.
- No manual dispatch publication path or duplicate dry-run workflow unless the audit proves it is needed without weakening the release-only safety boundary.
- No runtime, API, dependency, or package-content redesign.

## Decisions

1. **Keep the `release.published` trigger.** A GitHub Release is an intentional human approval boundary and provides the tag used for the identity check. A `workflow_dispatch` option was considered but rejected because a manual path would need separate non-publication semantics and could tempt rerunning an immutable version.

2. **Keep npm Trusted Publishing via OIDC.** The workflow retains `id-token: write`, `contents: read`, npm registry setup, and `npm publish --access public --provenance`; it does not introduce `NPM_TOKEN` or `NODE_AUTH_TOKEN`. The npm Trusted Publisher mapping is documented as external configuration because it cannot be stored safely in this repository.

3. **Use the existing quality gates as the release contract.** `npm ci`, `npm test`, `npm run typecheck`, `npm run build`, `npm run verify:fixture`, and `npm pack --dry-run` remain ordered before publication. No duplicate package inventory or workflow parser is added.

4. **Document diagnosis at the platform boundary.** The README directs maintainers to the GitHub Actions run for workflow failures, the GitHub Release/tag for identity problems, and npm package/provenance pages for publication results. This keeps operational guidance close to the release command without claiming that repository files can verify external setup.

5. **Use repository evidence plus explicit external handoff.** Local inspection covers manifest, lockfile, workflow, tags, and clean working state. GitHub Release existence, npm availability/ownership, and Trusted Publisher registration are release-preparation checks and are recorded as tasks rather than guessed from the repository.

## Risks / Trade-offs

- [The npm Trusted Publisher mapping is absent or mismatched] → Configure owner `xdoo`, repository `slidev-addon-chapter`, and workflow `publish.yml` in npm before publishing the GitHub Release.
- [A release uses the wrong tag] → Fail before publication with actual and expected tag values; create a new correctly tagged release rather than changing the package version in CI.
- [A local check accidentally creates a tarball or build output] → Treat generated files as disposable validation artifacts and confirm the working tree before handoff; never invoke `npm publish` locally.
- [Action or runtime versions drift over time] → Keep versions explicit, run the release gate on the supported Node/npm toolchain, and review action major versions during implementation.

