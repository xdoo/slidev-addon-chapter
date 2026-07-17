## 1. Isolate the Pure Test Boundary

- [x] 1.1 Update `tests/extract-chapters.test.ts` to import extraction runtime values directly from `src/extract-chapters.ts` and types directly from `src/types.ts`.
- [x] 1.2 Run the focused extraction test and confirm it collects and passes without a `#slidev/configs` alias, stub, or Slidev dev server.

## 2. Verify Repository Quality Gates

- [x] 2.1 Run the complete unit test suite and confirm runtime-facing tests remain green.
- [x] 2.2 Run TypeScript typechecking and resolve any import/type regressions introduced by the test boundary change.
- [x] 2.3 Run the production build and confirm the unchanged public barrel and Slidev integration still build successfully.
