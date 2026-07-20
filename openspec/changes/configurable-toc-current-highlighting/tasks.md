## 1. Extend the ChapterToc API

- [ ] 1.1 Add the typed `highlightCurrentMode` prop to `components/ChapterToc.vue`, accepting `hierarchy` and `single` and defaulting to `hierarchy`.
- [ ] 1.2 Derive chapter/subchapter current signals at the TOC boundary so `hierarchy` preserves both markers and `single` marks only the deepest visible current entry, falling back to the chapter when subchapters are hidden.
- [ ] 1.3 Decouple chapter and subchapter current inputs in `components/ChapterToc/Chapter.vue` so a subchapter can be current while its parent is not, without changing existing classes, attributes, or navigation.

## 2. Test highlighting semantics

- [ ] 2.1 Extend `tests/chapter-toc.test.ts` to cover default and explicit hierarchy mode, single mode with an active rendered subchapter, single mode before a chapter's first subchapter, single mode with hidden subchapters, and no active chapter.
- [ ] 2.2 Assert single mode marks exactly one entry by checking one matching current modifier, `data-current`, and `aria-current`, while retaining chapter highlighting whenever no subchapter entry is visible.

## 3. Update documentation and playground

- [ ] 3.1 Document `highlightCurrentMode`, its `hierarchy`/`single` values, default, hidden-subchapter fallback, and migration-free usage in the README.
- [ ] 3.2 Add playground result/source examples for both highlighting modes and update `tests/playground-content.node.mjs` and any E2E selectors/assertions.
- [ ] 3.3 Add or update stable CSS/demo coverage without introducing global styles or changing existing public class names.

## 4. Verify compatibility

- [ ] 4.1 Run `npm test` and confirm existing consumers using only `highlightCurrent` retain hierarchy highlighting.
- [ ] 4.2 Run `npm run typecheck`, `npm run build`, and `npm run verify:fixture` to verify the public prop and packed-package fixture.
