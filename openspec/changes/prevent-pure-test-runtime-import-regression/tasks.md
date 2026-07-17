## 1. Restore the Pure Test Boundary

- [ ] 1.1 Update `tests/extract-chapters.test.ts` so extraction runtime values come directly from `src/extract-chapters.ts` and `NormalizedSlide` comes directly from `src/types.ts`.
- [ ] 1.2 Run the focused extraction test and confirm all chapter and subchapter cases collect and pass without a Slidev virtual-module alias, stub, or dev server.

## 2. Enforce the Boundary

- [ ] 2.1 Add a dependency-free check for prohibited mixed-barrel import specifiers in designated pure test files, with an actionable failure message.
- [ ] 2.2 Add regression coverage for accepted pure-module imports and rejected mixed-barrel imports.
- [ ] 2.3 Run the boundary check before Vitest in the repository's normal `test` command.

## 3. Verify Repository Quality Gates

- [ ] 3.1 Run the complete unit-test command and confirm the boundary check and runtime-facing tests pass.
- [ ] 3.2 Run TypeScript typechecking and resolve any import or script regressions introduced by the change.
- [ ] 3.3 Run the production build and confirm the unchanged public barrel and Slidev integration still build successfully.
