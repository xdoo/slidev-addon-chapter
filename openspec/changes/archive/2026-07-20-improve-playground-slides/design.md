## Context

The playground is both the development fixture for the add-on and its live feature tour. Its current slides exercise chapters, subchapters, imported pages, `ChapterTitle`, and `ChapterToc`, but they present prose, output, and source inconsistently. New readers must already understand Slidev frontmatter and mentally connect examples across slides.

The redesign must stay executable as one Slidev deck. Chapter metadata shown in examples must agree with the metadata actually driving the current slide, and code examples must remain legible at presentation dimensions. The add-on remains theme-independent, so playground-specific visual polish must not imply that it ships a chapter layout or theme.

## Goals / Non-Goals

**Goals:**

- Teach the add-on progressively, beginning with its purpose, mental model, installation, and smallest working chapter declaration.
- Give each user-facing feature a predictable visual explanation: actual result on the left, exact copyable slide source on the right.
- Demonstrate practical CSS customization through stable public component classes.
- Keep the playground useful as a live integration fixture and compatible with the existing build and export commands.

**Non-Goals:**

- Changing chapter discovery, component behavior, the composable API, or package exports.
- Adding a theme or a `layout: chapter` implementation to the add-on.
- Turning the playground into exhaustive API reference documentation.
- Adding a new documentation framework or runtime dependency.

## Decisions

### Use a short full-width introduction followed by a repeated teaching pattern

The opening slides will use simple full-width layouts for orientation, the chapter/subchapter mental model, and setup. Feature slides will then use Slidev's built-in `two-cols` layout with a clearly labelled “Result” in the default slot and “Markdown” in the `right` slot. Repetition reduces the amount of layout knowledge a beginner must learn while reading.

An alternative was to put every slide, including the title and overview, into two columns. That would enforce stricter uniformity but would weaken the introductory narrative and crowd slides that do not yet have a meaningful rendered example.

### Make examples live wherever practical

The left column will render real add-on components against the actual deck metadata. The right column will show the smallest complete source fragment responsible for that result, including frontmatter when structural metadata matters. Examples will avoid simulated screenshots or manually duplicated result text.

The actual slide metadata and the displayed snippet will be kept semantically aligned. Where a feature cannot safely demonstrate itself on its own slide, such as imported slide structure or `useChapters()` data, the deck may use a small labelled live projection while still showing the exact Markdown or Vue expression.

An alternative was to use static mockups for perfect visual isolation. That would be easier to arrange but could drift from runtime behavior and would reduce the playground's value as an integration fixture.

### Organize the tour from structure to presentation to customization

The feature sequence will move from chapter and subchapter declarations, through title and position components, to `ChapterToc` options, imported slides, and `useChapters()`. CSS customization follows the component examples so readers first see the default output and then understand what they are styling.

The tour will cover the public surface without giving every API field its own slide. Closely related options can share one slide when both the output and source remain readable.

### Treat CSS examples as Markdown source

CSS demonstrations will retain the same two-column contract. The right column will show the `<style>` block exactly as it can be placed in `slides.md`; the left column will render the styled component. Examples will use stable public classes such as `.chapter-title`, `.current-chapter-number`, `.chapter-count`, `.current-chapter-title`, and `.chapter-toc` descendants rather than playground-only DOM assumptions.

An alternative was to add a separate stylesheet and link to it. Inline examples are more directly copyable and make the cause-and-effect relationship visible on one slide.

### Keep presentation helpers local to the playground

Small labels, panels, spacing rules, and code sizing may use playground-local classes defined in the deck's final `<style>` block. These helpers will visually separate output from explanation but will not be described as add-on API. Existing CSS that demonstrates public classes will be consolidated and documented through the feature slides.

## Risks / Trade-offs

- **Dense source snippets can become unreadable in half a slide** → Use minimal examples, split unrelated options across slides, and size code deliberately rather than shrinking an exhaustive block.
- **A snippet can drift from the live slide metadata** → Keep snippets adjacent to their live examples and add a lightweight source/content check for the repeated column labels and key feature coverage.
- **Global demo CSS can accidentally affect earlier examples** → Scope styled variants with playground wrapper classes or CSS custom properties so default and customized states remain distinguishable.
- **More slides increase maintenance and export duration** → Prefer a compact progression with one learning objective per slide and reuse the same layout helpers.
- **Imported-page examples interrupt the visual pattern** → Give imported slides the same labelled result/source structure or explicitly frame them as a structural example.

## Migration Plan

1. Restructure `playground/slides.md` into the introductory and feature-tour sequence while retaining valid chapter metadata.
2. Update the imported playground page if it remains part of the tour.
3. Add scoped presentation and customization CSS.
4. Run the playground content checks, production build, and relevant end-to-end/export validation.

Rollback consists of reverting the playground files; no data, API, or dependency migration is involved.

## Open Questions

None. Exact wording and grouping of closely related features can be refined during implementation as long as the specification's coverage and layout contract remain satisfied.
