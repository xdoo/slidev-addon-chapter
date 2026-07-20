## 1. Remove the redundant component

- [x] 1.1 Delete `components/ChapterTitle.vue` so Slidev no longer auto-discovers `<ChapterTitle />`.
- [x] 1.2 Delete `tests/chapter-title.test.ts` while retaining the equivalent behavioral and markup coverage in `tests/current-chapter-title.test.ts`.

## 2. Consolidate documentation and playground usage

- [x] 2.1 Replace the README's `ChapterTitle` documentation and compatibility wording with canonical `CurrentChapterTitle` usage, rendered markup, `.current-chapter-title` styling, and explicit migration guidance.
- [x] 2.2 Replace every rendered use, source snippet, and explanatory mention of `ChapterTitle` in `playground/slides.md` and imported playground pages with `CurrentChapterTitle`, collapsing duplicate side-by-side examples to a single coherent demonstration.
- [x] 2.3 Verify the playground still demonstrates reactive current-title rendering and contains no active reference that presents `ChapterTitle` as available.

## 3. Align automated verification

- [x] 3.1 Update `tests/playground-content.node.mjs` to require `CurrentChapterTitle` coverage without requiring the removed component.
- [x] 3.2 Update `scripts/verify-packed-package.mjs` so the clean packed-package fixture exercises `<CurrentChapterTitle />` and no longer references `<ChapterTitle />`.
- [x] 3.3 Search non-archived source, tests, documentation, and playground files for stale `ChapterTitle` and `.chapter-title` API references, preserving only intentional migration notes.

## 4. Verify the breaking change

- [x] 4.1 Run `npm test` and confirm the retained `CurrentChapterTitle` behavior and updated playground-content assertions pass.
- [x] 4.2 Run `npm run typecheck`, `npm run build`, and `npm run verify:fixture` to verify component discovery, package contents, and the playground after removal.
