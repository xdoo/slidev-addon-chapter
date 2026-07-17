import assert from 'node:assert/strict'
import test from 'node:test'
import { verifyPackageFiles } from '../scripts/package-contents.mjs'

const required = [
  'LICENSE', 'README.md', 'package.json',
  'components/ChapterTitle.vue', 'components/ChapterToc.vue',
  'components/ChapterToc/Chapter.vue', 'components/ChapterToc/Subchapter.vue',
  'composables/index.ts', 'composables/useChapters.ts',
  'src/error.ts', 'src/extract-chapters.ts', 'src/index.ts', 'src/types.ts',
]

test('accepts the minimal consumer inventory', () => {
  assert.deepEqual(verifyPackageFiles(required.map(path => ({ path }))), [])
})

test('rejects a missing consumer entry point', () => {
  assert.match(verifyPackageFiles(required.filter(path => path !== 'src/index.ts'))[0], /missing.*src\/index\.ts/)
})

for (const path of ['tests/example.test.ts', 'dist/index.html', 'openspec/config.yaml', '.env', 'credentials.json']) {
  test(`rejects ${path}`, () => {
    assert.ok(verifyPackageFiles([...required, path]).includes(`forbidden package file: ${path}`))
  })
}
