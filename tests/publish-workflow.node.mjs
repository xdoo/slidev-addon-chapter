import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const workflow = await readFile(new URL('../.github/workflows/publish.yml', import.meta.url), 'utf8')

test('publishes only from a published GitHub Release', () => {
  assert.match(workflow, /^on:\n  release:\n    types: \[published\]/m)
  assert.doesNotMatch(workflow, /^\s+(?:push|pull_request|workflow_dispatch):/m)
})

test('uses minimum trusted-publishing permissions without a token', () => {
  assert.match(workflow, /permissions:\n  contents: read\n  id-token: write/)
  assert.doesNotMatch(workflow, /NODE_AUTH_TOKEN|NPM_TOKEN|npm_token/)
})

test('checks out and validates the exact release tag before publishing', () => {
  assert.match(workflow, /ref: \$\{\{ github\.event\.release\.tag_name \}\}/)
  assert.match(workflow, /npm run verify:release/)
  assert.match(workflow, /npm run release:check/)
  assert.match(workflow, /npm publish --access public --provenance/)
})
