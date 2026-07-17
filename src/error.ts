import type { ChapterDiagnostic } from './types'

export class ChapterValidationError extends Error {
  readonly diagnostics: readonly ChapterDiagnostic[]

  constructor(diagnostics: readonly ChapterDiagnostic[]) {
    super(`Invalid chapter declarations:\n${diagnostics.map(item => `- ${item.message}`).join('\n')}`)
    this.name = 'ChapterValidationError'
    this.diagnostics = diagnostics
  }
}
