const REQUIRED_FILES = new Set([
  'LICENSE',
  'README.md',
  'package.json',
  'components/ChapterTitle.vue',
  'components/ChapterToc.vue',
  'components/ChapterToc/Chapter.vue',
  'components/ChapterToc/Subchapter.vue',
  'composables/index.ts',
  'composables/useChapters.ts',
  'src/error.ts',
  'src/extract-chapters.ts',
  'src/index.ts',
  'src/types.ts',
])

const FORBIDDEN = [
  /(^|\/)\.git(?:\/|$)/,
  /(^|\/)\.github(?:\/|$)/,
  /(^|\/)\.idea(?:\/|$)/,
  /(^|\/)\.vscode(?:\/|$)/,
  /(^|\/)\.env(?:\.|$)/i,
  /(^|\/)(?:openspec|tests?|coverage|playground|fixtures?|examples?)(?:\/|$)/i,
  /(^|\/)dist(?:-[^/]+)?(?:\/|$)/,
  /(^|\/)(?:tmp|temp)(?:\/|$)/i,
  /\.(?:pdf|pptx|tgz)$/i,
  /(^|\/)(?:credentials?|secrets?|id_rsa)(?:\.|$)/i,
]

export function verifyPackageFiles(files) {
  const paths = new Set(files.map(file => typeof file === 'string' ? file : file.path))
  const errors = []

  for (const required of REQUIRED_FILES) {
    if (!paths.has(required)) errors.push(`missing required package file: ${required}`)
  }

  for (const path of paths) {
    if (FORBIDDEN.some(pattern => pattern.test(path))) {
      errors.push(`forbidden package file: ${path}`)
    }
  }

  return errors
}
