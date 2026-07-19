## Context

The addon repository lives at `xdoo/slidev-addon-chapter` and the playground at `playground/slides.md` already demonstrates every public feature: chapters, subchapters, `ChapterTitle`, `ChapterToc` with all props, imported slides, layout independence, CSS styling, and the single-source-of-truth semantics. The repository has no existing GitHub Pages deployment.

GitHub Pages can serve from a workflow-run build artifact using the official `actions/configure-pages` + `actions/upload-pages-artifact` + `actions/deploy-pages` pipeline. No branch-based or `/docs` folder deployment is needed.

Slidev's `build` command produces a fully static SPA that works under a configurable base path. The repository name becomes the URL path segment, so the base must be `/slidev-addon-chapter/`.

## Goals / Non-Goals

**Goals:**

- Deploy the playground as a live feature showcase on GitHub Pages at `https://xdoo.github.io/slidev-addon-chapter/`.
- Automatically rebuild and redeploy on every push to `main` so the page always reflects the latest addon features.
- Keep the deployment workflow completely independent from `publish.yml`—no npm version bump, no tag, no release event trigger.
- Ensure the built site works with the repository-name base path.
- Add a visible link to the feature page from the README and repository metadata.

**Non-Goals:**

- Creating new slides, demos, or documentation beyond what the playground already covers (cosmetic intro polish is acceptable).
- Triggering a new npm release or changing any file included in the npm tarball.
- Adding a custom domain or changing the default `*.github.io` URL.
- Setting up PR preview deployments.

## Decisions

### Deploy on push to main only

The `pages.yml` workflow triggers on `push` with branch filter `main`. This keeps the page in sync with the merged codebase without deploying feature branches or PRs. Tags and releases are excluded because they belong to the npm publication path. The push trigger covers the primary use case: a feature is merged to main and the showcase updates automatically.

### Use the official GitHub Pages actions pipeline

The deployment uses the three-step official pipeline:
1. `actions/configure-pages` — detects the correct deployment settings.
2. `actions/upload-pages-artifact` — uploads the `dist` directory.
3. `actions/deploy-pages` — publishes the artifact.

The workflow requires `contents: read`, `pages: write`, and `id-token: write` permissions (the latter for OIDC-based deployment authentication). This is the recommended approach for GitHub Actions-based Pages deployments and avoids third-party actions.

### Build with base path from repository name

The build step runs `slidev build playground/slides.md --out dist --base /slidev-addon-chapter/`. The `--base` flag ensures all asset paths and navigation routes are prefixed correctly for the GitHub Pages URL scheme. Without this flag, the SPA router would break on initial load and asset 404s would occur.

### Keep workflow lightweight

`npm ci` is used for reproducibility. The workflow installs only production dependencies needed for the build (`npm ci` without `--omit=dev` since Slidev CLI is a devDependency) and does not run tests, typecheck, or verification gates. These are already covered by CI and the npm publish workflow. The pages workflow's only responsibility is to produce and deploy the static showcase.

### Polish the preface slide(s) minimally

The current playground starts with a "Preface" slide that exercises the no-chapter state. For the landing page, this slide can optionally be extended with a brief sentence explaining what the addon does ("This addon provides explicit, theme-independent chapter semantics for Slidev..."), a link to the README/npm page, and a note that navigating reveals all features. No new slides, no redesign—just a navigation-friendly intro.

## Risks / Trade-offs

- [Every push to main triggers a deployment] → Builds are fast (~30s) and the official actions handle concurrency; this is standard practice for documentation and showcase sites.
- [The playground must remain buildable] → If a future refactor breaks `slidev build`, the pages deployment fails. This is acceptable because `slidev build` is already part of the release gates (`npm run release:check`).
- [Base path is hardcoded to the repository name] → If the repository is renamed, the workflow base path must be updated. This is unlikely and easily fixed.
- [GitHub Pages must be enabled once in repository settings] → This is a one-time manual step documented in the workflow. The workflow itself has no way to toggle this setting.
