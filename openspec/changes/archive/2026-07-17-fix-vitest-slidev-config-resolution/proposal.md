## Why

The unit suite currently fails before collecting `tests/extract-chapters.test.ts` because importing the package entry point pulls in `@slidev/client`, whose `#slidev/configs` virtual module only exists inside a Slidev-powered Vite environment. Pure chapter extraction tests must run under the repository's standalone Vitest configuration without requiring Slidev-generated virtual modules.

## What Changes

- Isolate pure extraction imports from Slidev runtime-dependent modules during unit testing.
- Configure or restructure the Vitest-facing module boundary so `tests/extract-chapters.test.ts` can be collected and executed without resolving `#slidev/configs`.
- Add regression coverage that proves the pure extraction suite runs in the standalone test environment while preserving runtime composable and component behavior.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `addon-delivery-and-quality`: Strengthen the pure extraction unit-test requirement so the standalone suite must not depend on Slidev-generated virtual modules.

## Impact

- Affects the package source/export boundaries and/or `vitest.config.ts` test resolution.
- Affects `tests/extract-chapters.test.ts` and potentially related unit-test mocks.
- Does not change the public chapter model, runtime API behavior, or supported Slidev versions.
