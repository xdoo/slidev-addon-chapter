## 1. Package Metadata and Scripts

- [x] 1.1 Update `package.json` to version `0.1.1` and normalize the repository URL to `git+https://github.com/xdoo/slidev-addon-chapter.git` while preserving public access, provenance, the package `files` allowlist, exports, and runtime dependencies.
- [x] 1.2 Review the current release and package scripts, retain the clean packed-consumer verification that adds integration value, and simplify npm script composition so existing package tests, typecheck, build, and meaningful fixture verification remain directly runnable.
- [x] 1.3 Remove the standalone release-version helpers and tests, duplicated package-inventory helpers and tests, and static publish-workflow test, then remove their obsolete npm script references without adding dependencies.

## 2. Trusted Publishing Workflow

- [x] 2.1 Rewrite `.github/workflows/publish.yml` to trigger only on `release.types: [published]`, grant `contents: read` and `id-token: write`, check out the release tag with `actions/checkout`, and configure a supported Node.js version plus `https://registry.npmjs.org` with `actions/setup-node`.
- [x] 2.2 Add a small inline workflow step that reads `package.json#version`, compares the GitHub Release tag with `v${package_version}`, and exits with an actionable actual-versus-expected error without modifying the version.
- [x] 2.3 Add the explicit ordered gates `npm ci`, relevant existing tests, typecheck, build, retained packed-consumer verification, and `npm pack --dry-run`, followed only on success by `npm publish --access public --provenance`; ensure no npm token secret or provenance-disabling configuration is used.

## 3. Validation and Release Handoff

- [x] 3.1 Run `npm ci`, all retained package tests, `npm run typecheck`, `npm run build`, the retained clean packed-consumer verification, and `npm pack --dry-run`; confirm the inventory contains only the intended package files and do not run `npm publish` locally.
- [x] 3.2 Inspect the final diff to confirm no public runtime API, source behavior, exports, or dependencies changed and no redundant release-only helper remains.
- [x] 3.3 Document the changed and removed files, workflow gate order, required npm Trusted Publisher mapping (`xdoo` / `slidev-addon-chapter` / `publish.yml`), and the future release procedure of committing version `0.1.1` then publishing GitHub Release `v0.1.1`.
