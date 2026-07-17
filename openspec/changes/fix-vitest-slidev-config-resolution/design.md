## Context

`src/index.ts` is a mixed public barrel: it exports pure extraction functions and also re-exports `useChapters()`. Loading that barrel therefore evaluates `composables/useChapters.ts`, which imports `@slidev/client`; outside a Slidev Vite process, the client then requests the generated `#slidev/configs` module. The extraction test imports runtime values from this mixed barrel even though the implementation under test has no Slidev dependency.

## Goals / Non-Goals

**Goals:**

- Make the extraction suite collect and pass in standalone Vitest.
- Preserve the package's existing public exports and Slidev runtime integration.
- Keep pure unit tests coupled only to pure source modules.
- Verify the complete unit suite, typecheck, and build after the change.

**Non-Goals:**

- Reimplement Slidev virtual-module generation in Vitest.
- Change chapter extraction semantics or public API signatures.
- Remove `useChapters()` from the root package entry point.
- Add a new dependency or test-only Slidev application bootstrap.

## Decisions

### Import pure implementation modules in pure tests

`tests/extract-chapters.test.ts` will import `extractChapters` and `findCurrentChapter` directly from `src/extract-chapters.ts`, and import `NormalizedSlide` directly from `src/types.ts`. This accurately expresses the test boundary and prevents evaluation of the runtime-dependent re-export.

The alternative of mocking `@slidev/client` globally was rejected because extraction tests do not use that module and such a mock would hide accidental runtime coupling. Aliasing or stubbing `#slidev/configs` was rejected because it emulates an internal Slidev build artifact and would make a pure unit test dependent on private framework details.

### Keep the public barrel unchanged

The root export remains the consumer-facing API used inside Slidev. Changing package exports or lazily loading the composable would broaden the compatibility and API surface of this targeted test fix. Runtime-dependent behavior continues to be tested where `@slidev/client` is explicitly mocked or supplied by Slidev.

### Treat standalone execution as the regression check

The focused extraction test must pass via Vitest without Slidev aliases or virtual-module stubs. The full test command then confirms that the narrower imports do not interfere with component/composable tests.

## Risks / Trade-offs

- [Tests use internal module paths instead of the consumer barrel] → Keep separate runtime-facing tests for the public composable/component and limit direct imports to pure unit tests.
- [A future refactor moves pure modules] → TypeScript/Vitest will fail immediately, requiring the test imports to move with the implementation.
- [The root barrel remains unusable outside Slidev runtime contexts] → This is expected for the existing root API because it includes `useChapters()`; changing that contract is outside this fix.
