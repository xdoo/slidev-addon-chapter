## 1. Audit and correct the publication contract

- [x] 1.1 Re-check `package.json`, `package-lock.json`, `.github/workflows/publish.yml`, README, Git tags, and repository state; record any concrete mismatch against the npm release-management requirements.
- [x] 1.2 Verify the workflow keeps `release.types: [published]`, `contents: read`, `id-token: write`, explicit supported Node/npm versions, npmjs.org registry configuration, release-tag checkout, exact `v<package-version>` validation, all existing quality gates, `npm pack --dry-run`, and `npm publish --access public --provenance`.
- [x] 1.3 Remove any npm token secret, GitHub Packages target, unnecessary permission, or manual publication path if found; retain the existing release-only trigger when no concrete defect requires a change.

## 2. Document the maintainer release process

- [x] 2.1 Add a README section titled `Release process` that states a published GitHub Release is required and the tag MUST be `v<package-version>`.
- [x] 2.2 Document the sequence: set the version in `package.json`, merge to `main`, create tag `v<version>`, publish the matching GitHub Release, and let the workflow publish to npm.
- [x] 2.3 State explicitly that publication goes to `https://registry.npmjs.org` and not GitHub Packages, and document where to inspect failed Actions runs, release/tag identity, npm publication, and provenance.

## 3. Configure and verify external release prerequisites

- [x] 3.1 Confirm that `slidev-addon-chapters` is available for first publication and that no conflicting npm package/version already exists; do not publish or claim ownership based only on local files.
- [ ] 3.2 Configure npm Trusted Publishing for owner `xdoo`, repository `slidev-addon-chapter`, and workflow `publish.yml`, with no long-lived npm token.
- [ ] 3.3 Confirm GitHub Actions is permitted to request the required OIDC identity token and that the intended repository/default branch and workflow path match the npm configuration.

## 4. Run local release gates without publication

- [x] 4.1 Run `npm ci`.
- [x] 4.2 Run `npm test`.
- [x] 4.3 Run `npm run typecheck`.
- [x] 4.4 Run `npm run build`.
- [x] 4.5 Run `npm run verify:fixture`.
- [x] 4.6 Run `npm pack --dry-run` and verify the inventory contains only intended consumer files.
- [x] 4.7 Confirm no local command invoked `npm publish`, no GitHub Release was created, and the final diff contains no runtime/API or dependency changes outside the release-process scope.

## 5. First-release handoff

- [x] 5.1 Commit the approved workflow/README changes on `main` with `package.json` version `0.1.1`.
- [ ] 5.2 Create Git tag `v0.1.1` on that commit and create a GitHub Release for the exact tag.
- [ ] 5.3 Publish the GitHub Release only after all local gates and npm Trusted Publisher checks pass; inspect the workflow run and npm provenance after publication.
