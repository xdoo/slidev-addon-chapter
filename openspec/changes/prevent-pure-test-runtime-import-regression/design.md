## Context

The root `src/index.ts` barrel intentionally combines pure extraction exports with the Slidev-dependent `useChapters()` composable. Standalone Vitest cannot evaluate that runtime branch because `@slidev/client` expects virtual modules generated only by Slidev's Vite setup. A previous fix gave the extraction test direct pure-module imports, but later subchapter work changed them back to `../src`, demonstrating that passing tests alone did not preserve the boundary.

## Goals / Non-Goals

**Goals:**

- Restore standalone collection and execution of the extraction test.
- Express the extraction test's dependency boundary through direct module imports.
- Fail the normal test command with a focused explanation if a guarded pure test imports a mixed runtime barrel again.
- Retain the existing public package exports and runtime integration.

**Non-Goals:**

- Make the mixed root barrel executable without a Slidev runtime.
- Stub or reproduce Slidev-generated virtual modules in Vitest.
- Change extraction semantics or add production dependencies.
- Introduce a general-purpose lint framework solely for this boundary.

## Decisions

### Import the pure implementation and types directly

`tests/extract-chapters.test.ts` will import runtime functions from `src/extract-chapters.ts` and `NormalizedSlide` from `src/types.ts`. This makes the unit under test explicit and avoids evaluating the composable re-export.

Mocking `@slidev/client` or aliasing `#slidev/configs` was rejected because the pure test does not use either API and those approaches would conceal unwanted coupling. Splitting the public root API was rejected because it would expand a test-only regression fix into a consumer-facing package change.

### Run a narrow source-boundary check before Vitest

A dependency-free repository script will inspect the guarded pure test's import specifiers and reject imports of the mixed root barrel. The normal `test` script will run this check before `vitest run`, producing a stable, actionable error before Vite transforms the suite. The check will be narrowly scoped to known pure extraction tests and prohibited barrel specifiers, avoiding the complexity and broad policy implications of adding ESLint or an import-graph tool.

A Vitest assertion that reads its peer test file was rejected because Vite must first transform all collected test modules, so the current virtual-module resolution failure can occur before such an assertion executes.

### Keep runtime verification separate

Existing composable/component tests and the Slidev production build remain responsible for the mixed public/runtime surface. The quality gates will include the focused test, full test command, typecheck, and build.

## Risks / Trade-offs

- [A textual boundary check can miss novel equivalent import spellings] → Parse the limited static import/export specifier forms used by the TypeScript tests and cover the prohibited forms in the check's own fixtures or self-test path.
- [The rule initially protects only named pure tests] → Keep the guarded-file list explicit and extend it when new pure suites are introduced.
- [Direct internal imports couple tests to source layout] → This is intentional for unit tests; TypeScript reports moved modules immediately.
- [The root barrel remains unavailable in plain Vitest without mocks] → Preserve that documented architectural distinction and test runtime consumers in their appropriate mocked or Slidev-powered environments.
