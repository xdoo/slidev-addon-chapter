export interface ChapterFrontmatter {
  readonly id: string
  readonly title: string
}

export interface NormalizedSlide {
  readonly slideNumber: number
  readonly frontmatter: Readonly<Record<string, unknown>>
}

export interface Chapter {
  readonly id: string
  readonly title: string
  readonly index: number
  readonly startSlide: number
  readonly endSlide: number
  readonly slideNumbers: readonly number[]
}

export interface ChapterState {
  readonly chapters: Readonly<Ref<readonly Chapter[]>>
  readonly currentChapter: Readonly<Ref<Chapter | undefined>>
}

export type ChapterDiagnosticCode =
  | 'invalid-chapter'
  | 'missing-id'
  | 'missing-title'
  | 'duplicate-id'

export interface ChapterDiagnostic {
  readonly code: ChapterDiagnosticCode
  readonly slideNumber: number
  readonly field: 'chapter' | 'chapter.id' | 'chapter.title'
  readonly message: string
  readonly relatedSlideNumber?: number
}

export interface ChapterExtractionResult {
  readonly chapters: readonly Chapter[]
  readonly diagnostics: readonly ChapterDiagnostic[]
}
import type { Ref } from 'vue'
