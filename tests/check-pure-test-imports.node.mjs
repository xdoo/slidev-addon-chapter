import assert from 'node:assert/strict'
import { test } from 'node:test'
import { findProhibitedImports } from '../scripts/check-pure-test-imports.mjs'

const prohibited = new Set(['../src', '../src/index', '../src/index.ts'])

test('accepts imports from pure implementation and type modules', () => {
  const source = `
    import type { NormalizedSlide } from '../src/types'
    import { extractChapters } from '../src/extract-chapters'
  `

  assert.deepEqual(findProhibitedImports(source, prohibited), [])
})

test('rejects static imports and exports through the mixed runtime barrel', () => {
  const source = `import type { NormalizedSlide } from '../src'
export { extractChapters } from '../src/index.ts'
import '../src/index'
`

  assert.deepEqual(findProhibitedImports(source, prohibited), [
    { specifier: '../src', line: 1 },
    { specifier: '../src/index.ts', line: 2 },
    { specifier: '../src/index', line: 3 },
  ])
})

test('rejects a dynamic import through the mixed runtime barrel', () => {
  const source = `const api = await import('../src')`

  assert.deepEqual(findProhibitedImports(source, prohibited), [
    { specifier: '../src', line: 1 },
  ])
})
