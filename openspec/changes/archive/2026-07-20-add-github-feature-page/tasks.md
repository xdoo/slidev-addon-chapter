## 1. GitHub Pages Workflow

- [x] 1.1 Create `.github/workflows/pages.yml` that triggers on push to `main` only (not tags, releases, or PRs).
- [x] 1.2 Configure job permissions: `contents: read`, `pages: write`, `id-token: write`.
- [x] 1.3 Set up Node.js 22, install dependencies with `npm ci`, and build with `slidev build playground/slides.md --out dist --base /slidev-addon-chapter/`.
- [x] 1.4 Deploy using the official actions pipeline (`configure-pages`, `upload-pages-artifact`, `deploy-pages`).

## 2. Playground Intro Polish (Optional)

- [x] 2.1 Add 1–2 sentences to the preface slide explaining what the addon does and linking to the README / npm page, so the landing page provides immediate context for first-time visitors.
- [x] 2.2 Verify the playground still builds correctly with `npm run build` after the change.

## 3. Documentation Update

- [x] 3.1 Add a link to `https://xdoo.github.io/slidev-addon-chapter/` in the README under a "Feature Showcase" or "Live Demo" heading near the top.
- [ ] 3.2 Optionally add the GitHub Pages URL to the repository description on GitHub.

## 4. Verification

- [x] 4.1 Enable GitHub Pages in the repository settings (Settings → Pages → Source: GitHub Actions). This is a one-time manual step.
- [x] 4.2 Push the change to a branch, merge to main, and confirm the workflow deploys successfully.
- [x] 4.3 Open the deployed URL and verify all slides render correctly: preface, chapters, subchapters, imported slides, ChapterTitle, ChapterToc with all props, and navigation.
- [x] 4.4 Confirm the README link works and points to the correct deployed URL.
