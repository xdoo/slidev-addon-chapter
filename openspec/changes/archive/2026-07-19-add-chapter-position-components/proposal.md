## Why

Presentations and themes currently need to derive chapter position information (current chapter number, total chapter count, and current chapter title) by calling `useChapters()` directly. This couples common layout markup to the runtime API for simple one-value renders. Thin position components provide stable, reusable building blocks for progress indicators, section headers, footers, and other position-aware UI without requiring consumers to import or destructure the composable.

## What Changes

- Add three public Vue components—`CurrentChapterNumber`, `ChapterCount`, and `CurrentChapterTitle`—each consuming `useChapters()` and rendering exactly one value.
- `CurrentChapterNumber` renders the one-based chapter index (`currentChapter.index + 1`). `ChapterCount` renders the total number of chapters (`chapters.length`). `CurrentChapterTitle` renders `currentChapter.title`.
- Each component renders a single root element with a stable public CSS class (`.current-chapter-number`, `.chapter-count`, `.current-chapter-title`), no inline styles, no formatting, no separators, and no labels.
- All three render nothing when there is no active chapter (for `ChapterCount`: render nothing when there are no chapters).
- Export all three components from the addon entry point (`src/index.ts`) for explicit import alongside the runtime API.
- Document each component in the README with a minimal usage example and its stable CSS class.

## Capabilities

### New Capabilities

- `chapter-position-components`: Defines the three public position components (`CurrentChapterNumber`, `ChapterCount`, `CurrentChapterTitle`), their reactive rendering behavior, stable styling contracts, export contract, and documentation expectations.

### Modified Capabilities

None.

## Impact

- Adds three auto-discovered Vue components to the addon's public component surface alongside the existing `ChapterTitle` and `ChapterToc`.
- Uses the existing `useChapters()` composable and chapter model without changing their contracts.
- Adds component exports to `src/index.ts`, expanding the entry-point surface.
- Adds minimal component tests following the existing `ChapterTitle` test pattern.
- Adds documentation to the README for each new component.
- `CurrentChapterTitle` provides equivalent functionality to the existing `ChapterTitle` with a more explicit name and its own CSS class; `ChapterTitle` is preserved unchanged.
