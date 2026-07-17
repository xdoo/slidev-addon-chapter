import { readFile } from 'node:fs/promises'
import { pathToFileURL } from 'node:url'

const guardedFiles = {
  'tests/extract-chapters.test.ts': new Set([
    '../src',
    '../src/index',
    '../src/index.ts',
  ]),
}

const staticSpecifierPattern = /\b(?:import|export)\s+(?:type\s+)?(?:[^'";]*?\sfrom\s*)?(['"])([^'"]+)\1/g
const dynamicSpecifierPattern = /\bimport\s*\(\s*(['"])([^'"]+)\1\s*\)/g

export function findProhibitedImports(source, prohibitedSpecifiers) {
  const violations = []

  for (const pattern of [staticSpecifierPattern, dynamicSpecifierPattern]) {
    pattern.lastIndex = 0
    for (const match of source.matchAll(pattern)) {
      const specifier = match[2]
      if (!prohibitedSpecifiers.has(specifier))
        continue

      violations.push({
        specifier,
        line: source.slice(0, match.index).split('\n').length,
      })
    }
  }

  return violations
}

export async function checkPureTestImports(root = process.cwd()) {
  const failures = []

  for (const [file, prohibitedSpecifiers] of Object.entries(guardedFiles)) {
    const source = await readFile(new URL(file, pathToFileURL(`${root}/`)), 'utf8')
    for (const violation of findProhibitedImports(source, prohibitedSpecifiers))
      failures.push({ file, ...violation })
  }

  return failures
}

async function main() {
  const failures = await checkPureTestImports()
  if (failures.length === 0)
    return

  for (const { file, line, specifier } of failures)
    console.error(`${file}:${line}: pure test imports mixed runtime barrel ${JSON.stringify(specifier)}`)

  console.error('Import extraction values from ../src/extract-chapters and types from ../src/types instead.')
  process.exitCode = 1
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href)
  await main()
