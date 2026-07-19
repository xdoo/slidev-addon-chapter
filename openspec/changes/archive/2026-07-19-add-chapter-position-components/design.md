## Context

The addon already exposes chapter state through `useChapters()` and provides `ChapterTitle` as a thin component that renders `chapter.title`. Consumers can derive position information themselves, but that couples common one-value inline renders to the composable import. The new components must remain reactive, visually neutral, and follow the same thin-consumer pattern as `ChapterTitle` while covering three distinct position values.

`useChapters()` returns `chapters` (ordered array of all chapters), `currentChapter` (the active chapter or undefined), and `currentSubchapter`. The `Chapter` interface provides zero-based `index`. The one-based number convention is already established by `ChapterToc`'s `showNumbers` prop and should be preserved.

## Goals / Non-Goals

**Goals:**

- Provide three auto-discovered Vue components (`CurrentChapterNumber`, `ChapterCount`, `CurrentChapterTitle`) each backed by `useChapters()`.
- Render exactly one value per component in a single stable root element with a public CSS class.
- Use one-based numbering for `CurrentChapterNumber` consistent with `ChapterToc`'s established convention.
- Render nothing when the corresponding value is absent (no current chapter, or no chapters for count).
- Preserve Vue reactivity when navigation or chapter declarations change.
- Export all three components from `src/index.ts` for explicit consumer imports.
- Document each component with a minimal usage example, rendered HTML, and stable CSS class.
- Cover each component contract with focused Vue tests following the `ChapterTitle` test pattern.

**Non-Goals:**

- Adding props for numbering format, prefix/suffix text, fallback text, or custom semantics.
- Changing chapter extraction, current-chapter selection, or the `useChapters()` API.
- Changing or deprecating the existing `ChapterTitle` component.
- Providing opinionated visual design, inline styles, or layout wrappers.

## Decisions

### Read chapter state through the public composable

All three components will call `useChapters()` and bind directly to its readonly refs. This keeps each component a thin consumer of the canonical state and ensures updates follow the existing reactive pipeline. Reimplementing chapter lookup inside the components was rejected because it would duplicate chapter semantics and risk divergence.

### One-based numbering for CurrentChapterNumber

`CurrentChapterNumber` renders `currentChapter.index + 1` (one-based). This matches `ChapterToc`'s `showNumbers` convention and is the natural expectation for display purposes. Zero-based is an internal model detail that consumers should not need to handle.

### ChapterCount renders chapters.length

`ChapterCount` renders the length of the `chapters` array. This value is always available regardless of current slide position and reflects the total parsed chapter count. The component is not gated on `currentChapter`—it needs only chapter declarations to exist. When no chapters are declared (`chapters.length === 0`), it renders nothing.

### CurrentChapterTitle uses its own CSS class

`CurrentChapterTitle` uses `.current-chapter-title` as its CSS class, distinct from `ChapterTitle`'s `.chapter-title`. This avoids CSS class collision and gives theme authors separate styling hooks for each component. The two components produce equivalent content but with different selectors.

### One stable root element per component

Each component renders exactly one root element when its value is present:
- `<CurrentChapterNumber />` → `<span class="current-chapter-number">N</span>`
- `<ChapterCount />` → `<span class="chapter-count">N</span>`
- `<CurrentChapterTitle />` → `<span class="current-chapter-title">Title</span>`

No wrappers, no sibling elements, no text nodes outside the span. The `span` was chosen over `div` to match `ChapterTitle`'s established element choice and remain inline-friendly.

### Export from entry point

Component default exports will be re-exported from `src/index.ts` as named exports:
```ts
export { default as CurrentChapterNumber } from '../components/CurrentChapterNumber.vue'
export { default as ChapterCount } from '../components/ChapterCount.vue'
export { default as CurrentChapterTitle } from '../components/CurrentChapterTitle.vue'
```
This enables `import { CurrentChapterNumber } from 'slidev-addon-chapters'` alongside the existing composable and type exports.

### Test through mocked Slidev navigation state

Tests will follow the existing `ChapterTitle` test pattern: mount the real component while mocking `@slidev/client` navigation refs. Each component gets its own test file with fixtures covering the active state, absent state, and reactive update.

## Risks / Trade-offs

- [`CurrentChapterTitle` duplicates `ChapterTitle` functionality] → The existing component is preserved unchanged. The new component gives consumers a more explicit name and a distinct CSS class. Both coexist without conflict.
- [Three new documentation sections in README] → Each component gets a concise, consistent section following the `ChapterTitle` documentation pattern. Combined length is manageable.
- [Public CSS classes constrain future DOM refactors] → Keep component DOM deliberately minimal and treat each selector as a compatibility contract.
