## Why

The addon currently has no public web presence beyond npm and the GitHub repository README. Potential users evaluating the addon—as well as existing users looking up component behavior, styling APIs, or subchapter semantics—must either install it or read raw markdown. A deployed GitHub Pages site built from the existing playground gives visitors an interactive, always-up-to-date view of every feature declared in the slides.

When new features are added, the page rebuilds automatically on push to main, keeping the showcase in sync with the codebase without manual publication steps.

## What Changes

- Add a GitHub Actions workflow (`pages.yml`) that builds the playground with `slidev build` and deploys the static output to GitHub Pages.
- The workflow runs on pushes to `main` only—not on tags, releases, or pull requests—and is completely separate from the npm publish workflow.
- Wire the deployment so the site is served at `https://xdoo.github.io/slidev-addon-chapter/` with the correct base path.
- Optionally polish the playground's initial slide(s) with a brief intro that explains what the addon does, linking back to the README and npm page for full docs.
- Add a link to the generated GitHub Pages URL from the README and the repository description.
- No npm version bump, no package.json change, no tarball content change.

## Capabilities

### New Capabilities

- `github-feature-page`: Defines the automated GitHub Pages deployment of the playground, its trigger (push to main only), build configuration, base path, and separation from npm release publishing.

### Modified Capabilities

None.

## Impact

- Adds one GitHub Actions workflow file; no changes to addon source, package metadata, tests, or exported APIs.
- The playground may receive cosmetic adjustments to its preface slides for a better landing experience—these affect only the playground directory.
- GitHub Pages must be enabled in the repository settings (Pages source: GitHub Actions). This is a one-time repository configuration step.
- The README gains a link to the feature page; this is a documentation-only change that does not alter npm package contents.
