export { ChapterValidationError } from './error'
export { extractChapters, findCurrentChapter, findCurrentSubchapter } from './extract-chapters'
export type {
  Chapter,
  ChapterDiagnostic,
  ChapterDiagnosticCode,
  ChapterExtractionResult,
  ChapterFrontmatter,
  ChapterState,
  NormalizedSlide,
  Subchapter,
  SubchapterFrontmatter,
} from './types'
export { useChapters } from '../composables/useChapters'
