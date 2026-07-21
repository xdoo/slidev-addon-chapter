## Why

`ChapterToc` currently marks both the active chapter and its active subchapter whenever current highlighting is enabled. That hierarchy is useful in some presentations, but others need a single highlighted entry so the selected navigation target is visually unambiguous.

## What Changes

- Add a configurable highlighting mode to `ChapterToc` while keeping `highlightCurrent` as the switch that enables current-state marking.
- Preserve the current chapter-plus-subchapter behavior as the default for backwards compatibility.
- Add a single-entry mode in which only the deepest visible current entry is marked: the active subchapter when subchapters are rendered, otherwise its owning chapter.
- Document the new prop, its values, default, accessibility semantics, and examples in the README and playground.
- Extend component and playground tests for both modes, chapter-only state, and subchapter state.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `chapter-toc`: Define configurable current-entry highlighting while preserving the existing default hierarchy and navigation markup.

## Impact

- Extends the public `ChapterToc` prop API with `highlightCurrentMode` / `highlight-current-mode`, with `hierarchy` and `single` values.
- Updates `components/ChapterToc.vue` and its child highlighting inputs to distinguish parent and deepest-entry selection.
- Updates `tests/chapter-toc.test.ts`, playground examples, content assertions, README tables/examples, and relevant E2E coverage.
- Existing consumers that pass only `highlightCurrent` retain the current behavior (`hierarchy`) without changes.
