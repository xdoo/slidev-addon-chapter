## 1. Public Model and Extraction

- [x] 1.1 Extend addon-owned frontmatter, `Subchapter`, `Chapter`, state, result, and diagnostic types and export the new public types/functions from supported entry points.
- [x] 1.2 Extend the pure extractor to parse chapter and subchapter declarations in resolved slide order, process a same-slide chapter before its subchapter, and build immutable chapter-scoped subchapter records with inclusive ranges and slide numbers.
- [x] 1.3 Implement deterministic validation for malformed subchapter values, missing/blank IDs and titles, orphan declarations, and duplicate IDs within a chapter while permitting the same ID in different chapters.
- [x] 1.4 Add pure `findCurrentSubchapter` lookup and ensure invalid structural input follows the existing diagnostic/error boundary without publishing a partial hierarchy.

## 2. Runtime API

- [x] 2.1 Extend `useChapters()` to expose readonly `Chapter.subchapters` and a readonly computed `currentSubchapter` derived from the current chapter and current slide.
- [x] 2.2 Add runtime/composable tests for slides before chapters, chapter content before its first subchapter, movement within and across subchapters, chapter transitions, direct-state initialization, and chapter-only absence of `currentSubchapter`.

## 3. Chapter TOC

- [x] 3.1 Add a boolean `showSubchapters` prop defaulting to false and render non-empty nested subchapter lists only when enabled, preserving existing default chapter-only markup and behavior.
- [x] 3.2 Add opt-in hierarchical numbering, chapter-scoped subchapter identity/ownership attributes, stable subchapter CSS classes, and current chapter/subchapter semantic and modifier states governed by `highlightCurrent`.
- [x] 3.3 Navigate each subchapter link to its `startSlide` through the existing documented Slidev `go()` integration.
- [x] 3.4 Extend component tests for default omission, enabled hierarchy/order, chapters without subchapters, numbering on/off, current highlighting across transitions, stable hooks, and subchapter navigation.

## 4. Extraction and Compatibility Tests

- [x] 4.1 Add pure extraction tests for normal and consecutive subchapters, same-slide chapter/subchapter declarations, final ranges, chapter boundary closure, ownership, indices, and immutable record shape.
- [x] 4.2 Add validation tests for malformed declarations, missing fields, orphaned subchapters, duplicates within one chapter, reusable IDs across chapters, and clear slide-aware messages.
- [x] 4.3 Retain existing chapter tests and add explicit chapter-only compatibility assertions for unchanged chapter fields/ranges, empty subchapter collections, current chapter behavior, and default TOC output.

## 5. Playground and Documentation

- [x] 5.1 Expand the playground with multiple subchapters across chapters, a chapter with no subchapters, chapter/subchapter transitions, an enabled numbered/highlighted hierarchical TOC, navigation targets, and theme-overridable demonstration styles.
- [x] 5.2 Update the README with the two-level concept, independent frontmatter examples, boundary/validation rules, complete runtime interfaces and consumption guidance, TOC defaults and opt-in examples, navigation behavior, and every stable subchapter styling hook/data attribute.
- [x] 5.3 Add migration and compatibility guidance stating that chapter-only presentations require no changes and that downstream themes/addons should consume `useChapters()` rather than parse frontmatter.

## 6. Verification

- [x] 6.1 Run the full unit/component test suite, typecheck, and package build; resolve all regressions.
- [x] 6.2 Start and build the playground and verify component discovery, chapter-only/default and hierarchical rendering, navigation, direct refresh/current state, and readable static output.
- [x] 6.3 Record or update the repository's documented presenter, supported-theme, PDF, and PPTX verification expectations for subchapter labels and known interactive-navigation limitations.
