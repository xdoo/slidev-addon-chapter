## 1. Playground Structure

- [x] 1.1 Define the slide sequence and map every required public feature to one focused learning objective and live example.
- [x] 1.2 Replace the opening of `playground/slides.md` with a beginner-oriented introduction covering purpose, chapter/subchapter mental model, add-on setup, and the first declaration.
- [x] 1.3 Add reusable playground-only labels and panel helpers that keep “Result” and “Markdown” columns visually consistent and readable.

## 2. Live Feature Tour

- [x] 2.1 Rebuild the chapter and subchapter declaration examples with `two-cols`, live output on the left, and matching frontmatter on the right.
- [x] 2.2 Add focused `two-cols` examples for `ChapterTitle`, `CurrentChapterTitle`, `CurrentChapterNumber`, and `ChapterCount`.
- [x] 2.3 Add focused `two-cols` examples for `ChapterToc`, including numbering, subchapter visibility, and current-entry highlighting.
- [x] 2.4 Update the imported-slide example and `playground/pages/architecture.md` so imported chapter metadata is explained with the same result/source teaching pattern.
- [x] 2.5 Add a concise live `useChapters()` example that explains the returned chapter data and shows the corresponding Markdown/Vue expression.
- [x] 2.6 Review all feature slides for plain-language descriptions, exact agreement between live metadata and displayed snippets, and readable half-slide code blocks.

## 3. CSS Customization

- [x] 3.1 Add a scoped title/position-component CSS example with the styled result on the left and a copyable `<style>` block on the right.
- [x] 3.2 Add a scoped table-of-contents CSS example covering useful public element and current-state classes without altering unrelated default examples.
- [x] 3.3 Consolidate playground styles and clearly distinguish local presentation helpers from the add-on's stable public CSS hooks.

## 4. Verification

- [x] 4.1 Update `scripts/e2e.mjs` to navigate the redesigned deck without brittle obsolete slide numbers and to verify representative chapter, subchapter, component, and current-entry results.
- [x] 4.2 Add or update automated assertions that verify the introductory content, repeated `two-cols` result/source contract, required feature coverage, and CSS examples in the playground source.
- [x] 4.3 Run the unit test and typecheck suites and resolve any regressions caused by the playground changes.
- [x] 4.4 Build the production playground and run its end-to-end integration check against the built or development deck.
