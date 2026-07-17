## Context

The addon currently converts resolved Slidev frontmatter into immutable, flat `Chapter` records, exposes them through `useChapters()`, and renders them in `ChapterToc`. Subchapters cross all three layers: extraction/validation, reactive public state, and optional presentation. The implementation must preserve all chapter-only behavior and keep frontmatter declarations as the sole structural input.

## Goals / Non-Goals

**Goals:**

- Model exactly one optional level beneath a chapter with deterministic inclusive slide ranges.
- Validate declarations before publishing any structural state, with actionable slide-aware diagnostics.
- Expose immutable subchapter data and reactive current-subchapter lookup through the existing public API.
- Add opt-in hierarchical TOC rendering whose default DOM and behavior remain chapter-only.
- Demonstrate and verify the complete behavior in tests, documentation, and the playground.

**Non-Goals:**

- Nested subchapters, arbitrary trees, implicit grouping, or inference from layouts/headings.
- A separate subchapter registry, agenda configuration, or frontmatter parser for downstream addons.
- Changes to existing chapter navigation or default `ChapterToc` output.
- A dedicated subchapter title component, previous/next navigation, or progress UI.

## Decisions

### Build chapter and subchapter ranges in one ordered extraction pass

The extractor will parse both declaration kinds from the resolved slide sequence and associate each valid subchapter declaration with the latest preceding valid chapter declaration. Chapter starts close the prior chapter and any active subchapter; subchapter starts close only the prior subchapter. Final open ranges end at the deck's last slide. Records are assembled immutably after validation so each `Chapter.subchapters` array and every `slideNumbers` array is readonly.

This keeps boundary rules explicit and prevents a second traversal from independently reconstructing ownership. Treating subchapters as globally ranged records and joining them later was considered, but would make orphan detection and chapter-boundary clipping easier to get wrong.

### Scope subchapter identity to its owning chapter

Duplicate subchapter IDs are rejected only within the same chapter. The extractor tracks first declaration locations per chapter and reports both slides in duplicate diagnostics. The same subchapter ID may appear in another chapter because consumers can address it through chapter ownership; no globally unique composite identifier is added to the public model.

Global uniqueness was considered but rejected because it is stricter than the requested model and makes reusable section names unnecessarily difficult.

### Preserve the existing validation boundary

`chapter` and `subchapter` are both treated as untrusted frontmatter. Addon-owned frontmatter/types and diagnostics will be extended for subchapter fields and orphan/duplicate cases. Extraction will continue to return diagnostics, and the existing runtime error boundary will format them consistently. Invalid structural input will not be partially published as a plausible hierarchy.

### Resolve current subchapter from the current chapter

Add a pure `findCurrentSubchapter` lookup that searches only `currentChapter.subchapters` using inclusive ranges. `useChapters()` will expose a computed readonly `currentSubchapter` derived from the same reactive current-slide state as `currentChapter`. This guarantees it becomes absent on chapter slides before the first subchapter, at chapter transitions, and before the first chapter, with no navigation history dependence.

A global subchapter search was considered, but chapter-scoped lookup directly enforces ownership and avoids ambiguity when IDs repeat across chapters.

### Make hierarchical TOC markup opt-in

`ChapterToc` gains `showSubchapters` defaulting to `false`. When true, each chapter with subchapters renders a nested list beneath its existing chapter link. Subchapter links call the same Slidev `go()` operation with `startSlide`. Hierarchical visible numbers use `<chapter index + 1>.<subchapter index + 1>` when numbering is enabled. Current subchapter semantics and CSS modifiers are emitted only when current highlighting is enabled, matching existing `highlightCurrent` behavior.

The nested structure is favored over a flattened list because it preserves semantic ownership and permits independent theme styling. Existing chapter hooks remain stable; new hooks include the requested sublist, subitem, current modifier, subtitle, and subnumber classes plus a stable subchapter data attribute/link hook where useful for navigation tests and styling.

### Verify compatibility at pure, component, and playground levels

Pure extraction tests cover ownership, transitions, ranges, malformed input, duplicates, and orphans. Runtime/composable tests cover reactive lookup. Component tests cover default omission, enabled hierarchy, highlighting, numbering, and navigation. Existing chapter-only fixtures remain and explicit compatibility assertions confirm unchanged public results. The playground will include multiple subchapters, a chapter with none, current-state styling, and an enabled hierarchical TOC.

## Risks / Trade-offs

- [A slide declaring both a chapter and subchapter has ambiguous “currently active chapter” timing] → Process the chapter declaration first, then allow the subchapter on that same slide to belong to the newly declared chapter; document and test this deterministic interpretation.
- [Invalid declarations could leave misleading partial ranges] → Accumulate deterministic diagnostics and publish no chapters when structural validation fails, matching current duplicate handling.
- [New nested markup could affect themes using broad descendant selectors] → Render it only when `showSubchapters` is true and retain existing default markup/classes.
- [Repeated subchapter IDs across chapters complicate DOM selection] → Nest entries under their owning `[data-chapter-id]` and document chapter-scoped identity; expose ownership through the runtime hierarchy.
- [Slidev metadata behavior can vary by mode] → Reuse the established resolved-slide and navigation integration, and cover representative playground/build checks rather than introducing private APIs.

## Migration Plan

Release as a backwards-compatible minor feature. Existing decks require no frontmatter, component, styling, or runtime changes. Consumers may add `subchapter` declarations, opt into `showSubchapters`, and optionally consume `currentSubchapter`/`Chapter.subchapters`. Rollback consists of removing those new declarations/usages; chapter-only behavior remains valid on both versions.

## Open Questions

None. The implementation will use chapter-first processing when both declarations occur on one slide, and hierarchical numbering will follow the existing `showNumbers` switch.
