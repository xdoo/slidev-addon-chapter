## 1. Component Implementation

- [x] 1.1 Create `components/CurrentChapterNumber.vue` using `useChapters()` and conditionally render `currentChapter.index + 1` (one-based) in `<span class="current-chapter-number">`.
- [x] 1.2 Create `components/ChapterCount.vue` using `useChapters()` and conditionally render `chapters.length` in `<span class="chapter-count">`; render nothing when count is zero.
- [x] 1.3 Create `components/CurrentChapterTitle.vue` using `useChapters()` and conditionally render `currentChapter.title` in `<span class="current-chapter-title">`.
- [x] 1.4 Ensure all three components have no props, no formatting, no separators, no labels, no wrappers beyond the single span, no inline styles, and no extra semantic attributes.

## 2. Entry-Point Exports

- [x] 2.1 Add named exports for `CurrentChapterNumber`, `ChapterCount`, and `CurrentChapterTitle` to `src/index.ts`.
- [x] 2.2 Verify the exports resolve correctly by running `npm run typecheck`.

## 3. Component Tests

- [x] 3.1 Add `tests/current-chapter-number.test.ts` with mocked reactive Slidev navigation, covering active chapter rendering, absent chapter (renders nothing), and reactive update on navigation change.
- [x] 3.2 Add `tests/chapter-count.test.ts` with mocked reactive Slidev navigation, covering non-zero chapter count and zero-chapter (renders nothing) scenarios.
- [x] 3.3 Add `tests/current-chapter-title.test.ts` with mocked reactive Slidev navigation, covering active chapter rendering, absent chapter (renders nothing), and reactive update on navigation change.
- [x] 3.4 Run full test suite with `npm test` and confirm all new and existing tests pass.

## 4. Documentation

- [x] 4.1 Document `CurrentChapterNumber` in the README: purpose, usage (`<CurrentChapterNumber />`), rendered HTML, `.current-chapter-number` CSS class, and a minimal styling example.
- [x] 4.2 Document `ChapterCount` in the README: purpose, usage (`<ChapterCount />`), rendered HTML, `.chapter-count` CSS class, and a minimal styling example.
- [x] 4.3 Document `CurrentChapterTitle` in the README: purpose, usage (`<CurrentChapterTitle />`), rendered HTML, `.current-chapter-title` CSS class, and a minimal styling example.
- [x] 4.4 Add all three CSS classes to the documented CSS classes list in the README.

## 5. Verification

- [x] 5.1 Run `npm run typecheck` and resolve any type errors.
- [x] 5.2 Run `npm test` and confirm all tests pass.
- [x] 5.3 Run `npm run build` to confirm the addon builds successfully.
- [x] 5.4 Run `npm run verify:fixture` to confirm the components are auto-discovered and usable in a clean Slidev project.
