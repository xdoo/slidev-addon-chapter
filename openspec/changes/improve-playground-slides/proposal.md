## Why

The current playground demonstrates the add-on, but it expects readers to infer the relationship between frontmatter, components, and the rendered result. A guided, example-driven deck will let even first-time Slidev users immediately understand each feature and copy the corresponding Markdown.

## What Changes

- Replace the current feature tour with a short introductory sequence that explains the problem, the chapter model, and how to enable the add-on.
- Present feature examples with Slidev's `two-cols` layout: the visible result on the left and the Markdown or frontmatter that produces it on the right.
- Cover the add-on's user-facing features in a progressive order, including chapters, subchapters, chapter titles, table of contents options, position components, imported slides, and the composable where it can be explained clearly in a slide.
- Add explicit before/after styling examples that show which emitted CSS classes can be customized and how CSS changes the rendered chapter UI.
- Use plain language, descriptive headings, and annotations so readers do not need prior knowledge of the repository or its implementation.
- Preserve representative chapter and subchapter metadata so the playground remains a live, navigable demonstration rather than a static documentation mock-up.

## Capabilities

### New Capabilities

- `playground-feature-guide`: A beginner-friendly, executable Slidev guide that pairs rendered results with their source Markdown and demonstrates CSS customization.

### Modified Capabilities

None.

## Impact

- Primarily affects `playground/slides.md` and, where useful for imported-slide examples, files below `playground/pages/`.
- May add playground-only CSS and presentation markup; no runtime API, package export, or dependency changes are expected.
- Existing build, export, and end-to-end checks must continue to work with the redesigned deck.
