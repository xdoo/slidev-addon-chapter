import { readFile } from 'node:fs/promises'
import { verifyReleaseVersion } from './release-version.mjs'

const tag = process.argv[2] ?? process.env.GITHUB_REF_NAME
if (!tag) {
  console.error('release tag is required as an argument or GITHUB_REF_NAME')
  process.exit(1)
}

const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
try {
  console.log(`Verified release version ${verifyReleaseVersion(tag, manifest.version)}`)
} catch (error) {
  console.error(error.message)
  process.exit(1)
}
