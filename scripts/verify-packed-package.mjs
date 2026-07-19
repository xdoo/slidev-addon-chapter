import { execFileSync } from 'node:child_process'
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

const root = new URL('..', import.meta.url)
const manifest = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'))
const workspace = await mkdtemp(join(tmpdir(), 'slidev-addon-chapters-'))
const packDir = join(workspace, 'pack')
const fixtureDir = join(workspace, 'fixture')

const run = (command, args, cwd) => execFileSync(command, args, {
  cwd,
  stdio: 'inherit',
  env: { ...process.env, CI: 'true' },
})

try {
  await mkdir(packDir)
  await mkdir(fixtureDir)
  run('npm', ['pack', '--pack-destination', packDir], root)
  const tarball = join(packDir, `${manifest.name}-${manifest.version}.tgz`)

  await writeFile(join(fixtureDir, 'package.json'), JSON.stringify({
    name: 'slidev-addon-chapters-consumer-fixture',
    private: true,
    type: 'module',
    scripts: {
      typecheck: 'tsc --noEmit',
      build: 'slidev build slides.md --out dist',
    },
    dependencies: {
      [manifest.name]: `file:${tarball}`,
      '@slidev/cli': '52.18.0',
      '@slidev/client': '52.18.0',
      '@slidev/theme-default': 'latest',
      typescript: '^5.9.3',
      vue: '^3.5.0',
    },
  }, null, 2))
  await writeFile(join(fixtureDir, 'tsconfig.json'), JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      module: 'ESNext',
      moduleResolution: 'Bundler',
      strict: true,
      skipLibCheck: true,
      noEmit: true,
      baseUrl: '.',
      paths: {
        '@slidev/client': ['./types/slidev-client.ts'],
      },
    },
    include: ['verify-imports.ts', 'types/**/*.ts', 'types/**/*.d.ts'],
  }, null, 2))
  await mkdir(join(fixtureDir, 'types'))
  await writeFile(join(fixtureDir, 'types/slidev-client.ts'), `import type { ComputedRef, Ref } from 'vue'\nexport interface PublicSlideRoute { readonly no: number; readonly meta: { readonly slide: { readonly frontmatter: Record<string, unknown> } } }\nexport interface PublicSlidevNav { readonly slides: Ref<PublicSlideRoute[]>; readonly currentPage: ComputedRef<number>; readonly go: (page: number | string, clicks?: number, force?: boolean) => Promise<void> }\nexport declare function useNav(): PublicSlidevNav\n`)
  await writeFile(join(fixtureDir, 'types/vue-shims.d.ts'), `declare module '*.vue' {\n  import type { DefineComponent } from 'vue'\n  const component: DefineComponent<object, object, unknown>\n  export default component\n}\n`)
  await writeFile(join(fixtureDir, 'verify-imports.ts'), `import { CurrentChapterNumber, ChapterCount, CurrentChapterTitle, extractChapters, useChapters } from '${manifest.name}'\nimport { useChapters as useChaptersSubpath } from '${manifest.name}/composables'\nvoid CurrentChapterNumber\nvoid ChapterCount\nvoid CurrentChapterTitle\nvoid extractChapters\nvoid useChapters\nvoid useChaptersSubpath\n`)
  await writeFile(join(fixtureDir, 'slides.md'), `---\ntheme: default\naddons:\n  - ${manifest.name}\n---\n\n# Packed addon fixture\n\n---\nchapter:\n  id: verification\n  title: Verification\n---\n\n<ChapterTitle />\n\n<ChapterToc />\n`)

  run('npm', ['install', '--ignore-scripts', '--no-audit', '--no-fund'], fixtureDir)
  run('npm', ['run', 'typecheck'], fixtureDir)
  run('npm', ['run', 'build'], fixtureDir)
  console.log(`Verified packed ${manifest.name}@${manifest.version} in a clean Slidev fixture`)
} finally {
  await rm(workspace, { recursive: true, force: true })
}
