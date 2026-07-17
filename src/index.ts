export { ChapterValidationError } from './error'
export { extractChapters, findCurrentChapter } from './extract-chapters'
export type {
  Chapter,
  ChapterDiagnostic,
  ChapterDiagnosticCode,
  ChapterExtractionResult,
  ChapterFrontmatter,
  ChapterState,
  NormalizedSlide,
} from './types'
export { useChapters } from '../composables/useChapters'
