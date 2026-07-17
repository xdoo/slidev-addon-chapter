## Why

Adding subchapter coverage reintroduced imports from the mixed public barrel into `tests/extract-chapters.test.ts`, so standalone Vitest again evaluates `@slidev/client` and fails while resolving Slidev's generated `#slidev/configs` module. The pure extraction suite needs a durable boundary that remains valid as its coverage evolves.

## What Changes

- Restore direct imports from the pure extraction and type modules in `tests/extract-chapters.test.ts`.
- Add a regression guard that detects runtime imports from the mixed package barrel in pure unit tests before Vite attempts to load Slidev virtual modules.
- Verify focused and complete unit tests, typechecking, and the production build without introducing a `#slidev/configs` alias or stub.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `addon-delivery-and-quality`: Strengthen standalone pure-test isolation so future extraction-test changes cannot silently restore a dependency on Slidev-generated runtime modules.

## Impact

- Affects `tests/extract-chapters.test.ts` and the repository's test-quality checks or test configuration.
- May add a small source-boundary regression test or equivalent static guard.
- Does not change chapter/subchapter behavior, public APIs, dependencies, or supported Slidev versions.
