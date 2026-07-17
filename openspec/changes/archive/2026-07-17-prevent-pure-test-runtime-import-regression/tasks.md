## 1. Restore the Pure Test Boundary

- [x] 1.1 Update `tests/extract-chapters.test.ts` so extraction runtime values come directly from `src/extract-chapters.ts` and `NormalizedSlide` comes directly from `src/types.ts`.
- [x] 1.2 Run the focused extraction test and confirm all chapter and subchapter cases collect and pass without a Slidev virtual-module alias, stub, or dev server.

## 2. Enforce the Boundary

- [x] 2.1 Add a dependency-free check for prohibited mixed-barrel import specifiers in designated pure test files, with an actionable failure message.
- [x] 2.2 Add regression coverage for accepted pure-module imports and rejected mixed-barrel imports.
- [x] 2.3 Run the boundary check before Vitest in the repository's normal `test` command.

## 3. Verify Repository Quality Gates

- [x] 3.1 Run the complete unit-test command and confirm the boundary check and runtime-facing tests pass.
- [x] 3.2 Run TypeScript typechecking and resolve any import or script regressions introduced by the change.
- [x] 3.3 Run the production build and confirm the unchanged public barrel and Slidev integration still build successfully.
