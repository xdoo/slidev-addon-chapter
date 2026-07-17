## 1. Component Implementation

- [x] 1.1 Add `components/ChapterTitle.vue` using `useChapters()` and conditionally render only `currentChapter.title` in `span.chapter-title`.
- [x] 1.2 Ensure the component has no props, numbering, icons, extra wrappers, semantic attributes, or inline styles, and keep any default CSS minimal and theme-overridable.

## 2. Component Tests

- [x] 2.1 Add a focused Vue test fixture with mocked reactive Slidev navigation and chapter declarations.
- [x] 2.2 Test that an active chapter renders exactly its title in `span.chapter-title` without extra content or attributes.
- [x] 2.3 Test that the component renders no DOM element when the current slide has no chapter.
- [x] 2.4 Test that the displayed title updates automatically when navigation changes the active chapter.

## 3. Documentation and Verification

- [x] 3.1 Document the component purpose, `<ChapterTitle />` usage, rendered HTML, stable `.chapter-title` CSS API, and a styling example.
- [x] 3.2 Run the component test suite and project typecheck, resolving any regressions.
