## Why

Presentations often need a reusable section level below chapters, but the addon currently exposes only a flat chapter model. Adding declaration-driven subchapters preserves chapter declarations as the single source of truth while enabling themes, navigation components, and future addons to consume a consistent two-level structure without maintaining duplicate agendas.

## What Changes

- Add optional `subchapter` frontmatter declarations with non-empty `id` and `title` fields, assigned to the currently active chapter.
- Define fixed chapter → subchapter boundary, ordering, range, uniqueness, and orphan-validation semantics while leaving chapter-only decks unchanged.
- Extend public chapter records with readonly subchapters and expose a reactive `currentSubchapter` through `useChapters()`.
- Add opt-in subchapter rendering, numbering, highlighting, navigation, data attributes, and stable CSS hooks to `<ChapterToc />`; its default remains chapter-only.
- Expand tests, README guidance, and the local playground to cover subchapter declarations, transitions, errors, runtime consumption, TOC behavior, navigation, and backwards compatibility.

## Capabilities

### New Capabilities

- `subchapter-model`: Declaration, validation, ownership, ordering, and slide-range semantics for the optional second hierarchy level.

### Modified Capabilities

- `chapter-model`: Chapter records include their declaration-derived subchapters and chapter boundaries terminate active subchapters without changing existing chapter behavior.
- `chapter-runtime-api`: The public API exposes subchapter records and reactive current-subchapter state for consumers.
- `chapter-toc`: The component optionally renders and navigates subchapters with hierarchical numbering, current-state markup, and public styling hooks.
- `addon-delivery-and-quality`: Documentation, automated tests, and the playground cover subchapters while retaining chapter-only compatibility.

## Impact

The extraction and validation pipeline, addon-owned public types and exports, `useChapters()` reactive state, and `ChapterToc.vue` markup/props will be extended. Unit/component tests, README documentation, and playground slides/styles will be updated. Existing frontmatter, APIs, component defaults, chapter navigation, and chapter-only presentation output remain compatible; no new hierarchy depth, duplicate navigation data, theme coupling, or private frontmatter parsing API is introduced.
