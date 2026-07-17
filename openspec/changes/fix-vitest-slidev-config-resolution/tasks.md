## 1. Isolate the Pure Test Boundary

- [ ] 1.1 Update `tests/extract-chapters.test.ts` to import extraction runtime values directly from `src/extract-chapters.ts` and types directly from `src/types.ts`.
- [ ] 1.2 Run the focused extraction test and confirm it collects and passes without a `#slidev/configs` alias, stub, or Slidev dev server.

## 2. Verify Repository Quality Gates

- [ ] 2.1 Run the complete unit test suite and confirm runtime-facing tests remain green.
- [ ] 2.2 Run TypeScript typechecking and resolve any import/type regressions introduced by the test boundary change.
- [ ] 2.3 Run the production build and confirm the unchanged public barrel and Slidev integration still build successfully.
