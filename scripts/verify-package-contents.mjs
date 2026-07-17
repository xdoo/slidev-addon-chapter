import { execFileSync } from 'node:child_process'
import { verifyPackageFiles } from './package-contents.mjs'

const output = execFileSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: new URL('..', import.meta.url),
  encoding: 'utf8',
})
const result = JSON.parse(output)
const errors = verifyPackageFiles(result[0]?.files ?? [])

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Verified ${result[0].files.length} files in ${result[0].filename}`)
