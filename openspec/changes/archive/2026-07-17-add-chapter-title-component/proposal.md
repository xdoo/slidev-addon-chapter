## Why

Themes and presentations currently need to consume the chapter runtime API directly to show the active chapter title. A dedicated `ChapterTitle` component provides a stable, presentation-agnostic building block for layouts, headers, footers, and progress UI.

## What Changes

- Add a public Vue component named `ChapterTitle` that obtains the active chapter through `useChapters()`.
- Render only the active chapter's `title` in a minimal `<span class="chapter-title">` element, with no numbering, icons, inline styles, or extra semantics.
- Render nothing when there is no active chapter and react automatically when the active chapter changes.
- Establish `.chapter-title` as the stable public theming hook and provide only minimal default styling.
- Document the component's purpose, usage, rendered HTML, public CSS class, and styling customization.
- Add component tests for active, absent, and changing chapter states.

## Capabilities

### New Capabilities

- `chapter-title`: Defines the public `ChapterTitle` component, its reactive rendering behavior, stable styling contract, accessibility constraints, and documentation expectations.

### Modified Capabilities

None.

## Impact

- Adds an auto-discovered component to the addon's public Vue component surface.
- Uses the existing `useChapters()` composable and chapter model without changing their contracts.
- Adds minimal component CSS, user-facing documentation, and Vue component tests.
- Makes `.chapter-title` a public CSS API that must remain stable across minor releases.
