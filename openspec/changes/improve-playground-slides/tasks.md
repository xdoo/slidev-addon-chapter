## 1. Playground Structure

- [ ] 1.1 Define the slide sequence and map every required public feature to one focused learning objective and live example.
- [ ] 1.2 Replace the opening of `playground/slides.md` with a beginner-oriented introduction covering purpose, chapter/subchapter mental model, add-on setup, and the first declaration.
- [ ] 1.3 Add reusable playground-only labels and panel helpers that keep “Result” and “Markdown” columns visually consistent and readable.

## 2. Live Feature Tour

- [ ] 2.1 Rebuild the chapter and subchapter declaration examples with `two-cols`, live output on the left, and matching frontmatter on the right.
- [ ] 2.2 Add focused `two-cols` examples for `ChapterTitle`, `CurrentChapterTitle`, `CurrentChapterNumber`, and `ChapterCount`.
- [ ] 2.3 Add focused `two-cols` examples for `ChapterToc`, including numbering, subchapter visibility, and current-entry highlighting.
- [ ] 2.4 Update the imported-slide example and `playground/pages/architecture.md` so imported chapter metadata is explained with the same result/source teaching pattern.
- [ ] 2.5 Add a concise live `useChapters()` example that explains the returned chapter data and shows the corresponding Markdown/Vue expression.
- [ ] 2.6 Review all feature slides for plain-language descriptions, exact agreement between live metadata and displayed snippets, and readable half-slide code blocks.

## 3. CSS Customization

- [ ] 3.1 Add a scoped title/position-component CSS example with the styled result on the left and a copyable `<style>` block on the right.
- [ ] 3.2 Add a scoped table-of-contents CSS example covering useful public element and current-state classes without altering unrelated default examples.
- [ ] 3.3 Consolidate playground styles and clearly distinguish local presentation helpers from the add-on's stable public CSS hooks.

## 4. Verification

- [ ] 4.1 Update `scripts/e2e.mjs` to navigate the redesigned deck without brittle obsolete slide numbers and to verify representative chapter, subchapter, component, and current-entry results.
- [ ] 4.2 Add or update automated assertions that verify the introductory content, repeated `two-cols` result/source contract, required feature coverage, and CSS examples in the playground source.
- [ ] 4.3 Run the unit test and typecheck suites and resolve any regressions caused by the playground changes.
- [ ] 4.4 Build the production playground and run its end-to-end integration check against the built or development deck.
