import assert from 'node:assert/strict'
import test from 'node:test'
import { verifyReleaseVersion } from '../scripts/release-version.mjs'

test('accepts a matching v-prefixed semantic version', () => {
  assert.equal(verifyReleaseVersion('v0.1.0', '0.1.0'), '0.1.0')
})

test('rejects a mismatched version', () => {
  assert.throws(() => verifyReleaseVersion('v0.2.0', '0.1.0'), /does not match/)
})

for (const tag of ['0.1.0', 'v01.0.0', 'latest', 'v1']) {
  test(`rejects malformed tag ${tag}`, () => {
    assert.throws(() => verifyReleaseVersion(tag, '0.1.0'), /v<semver>/)
  })
}
