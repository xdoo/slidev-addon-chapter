export interface ChapterFrontmatter {
  readonly id: string
  readonly title: string
}

export interface SubchapterFrontmatter {
  readonly id: string
  readonly title: string
}

export interface Subchapter {
  readonly id: string
  readonly title: string
  readonly index: number
  readonly startSlide: number
  readonly endSlide: number
  readonly slideNumbers: readonly number[]
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
  readonly subchapters: readonly Subchapter[]
}

export interface ChapterState {
  readonly chapters: Readonly<Ref<readonly Chapter[]>>
  readonly currentChapter: Readonly<Ref<Chapter | undefined>>
  readonly currentSubchapter: Readonly<Ref<Subchapter | undefined>>
}

export type ChapterDiagnosticCode =
  | 'invalid-chapter'
  | 'missing-id'
  | 'missing-title'
  | 'duplicate-id'
  | 'invalid-subchapter'
  | 'orphaned-subchapter'

export interface ChapterDiagnostic {
  readonly code: ChapterDiagnosticCode
  readonly slideNumber: number
  readonly field: 'chapter' | 'chapter.id' | 'chapter.title' | 'subchapter' | 'subchapter.id' | 'subchapter.title'
  readonly message: string
  readonly relatedSlideNumber?: number
}

export interface ChapterExtractionResult {
  readonly chapters: readonly Chapter[]
  readonly diagnostics: readonly ChapterDiagnostic[]
}
import type { Ref } from 'vue'
