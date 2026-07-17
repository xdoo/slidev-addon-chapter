import type {
  Chapter,
  ChapterDiagnostic,
  ChapterExtractionResult,
  ChapterFrontmatter,
  NormalizedSlide,
  Subchapter,
  SubchapterFrontmatter,
} from './types'

function nonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function parseSubchapter(
  value: unknown,
  slideNumber: number,
): { subchapter?: SubchapterFrontmatter, diagnostics: ChapterDiagnostic[] } {
  if (value === undefined || value === null)
    return { diagnostics: [] }
  if (typeof value !== 'object' || Array.isArray(value)) {
    return { diagnostics: [{
      code: 'invalid-subchapter', field: 'subchapter', slideNumber,
      message: `Slide ${slideNumber}: subchapter must be an object with non-empty id and title fields.`,
    }] }
  }
  const candidate = value as Record<string, unknown>
  const diagnostics: ChapterDiagnostic[] = []
  if (!nonEmptyString(candidate.id)) {
    diagnostics.push({ code: 'missing-id', field: 'subchapter.id', slideNumber, message: `Slide ${slideNumber}: subchapter.id must be a non-empty string.` })
  }
  if (!nonEmptyString(candidate.title)) {
    diagnostics.push({ code: 'missing-title', field: 'subchapter.title', slideNumber, message: `Slide ${slideNumber}: subchapter.title must be a non-empty string.` })
  }
  if (diagnostics.length > 0)
    return { diagnostics }
  return { subchapter: { id: (candidate.id as string).trim(), title: (candidate.title as string).trim() }, diagnostics }
}

function parseChapter(
  value: unknown,
  slideNumber: number,
): { chapter?: ChapterFrontmatter, diagnostics: ChapterDiagnostic[] } {
  if (value === undefined || value === null)
    return { diagnostics: [] }

  if (typeof value !== 'object' || Array.isArray(value)) {
    return {
      diagnostics: [{
        code: 'invalid-chapter',
        field: 'chapter',
        slideNumber,
        message: `Slide ${slideNumber}: chapter must be an object with non-empty id and title fields.`,
      }],
    }
  }

  const candidate = value as Record<string, unknown>
  const diagnostics: ChapterDiagnostic[] = []

  if (!nonEmptyString(candidate.id)) {
    diagnostics.push({
      code: 'missing-id',
      field: 'chapter.id',
      slideNumber,
      message: `Slide ${slideNumber}: chapter.id must be a non-empty string.`,
    })
  }

  if (!nonEmptyString(candidate.title)) {
    diagnostics.push({
      code: 'missing-title',
      field: 'chapter.title',
      slideNumber,
      message: `Slide ${slideNumber}: chapter.title must be a non-empty string.`,
    })
  }

  if (diagnostics.length > 0)
    return { diagnostics }

  return {
    chapter: {
      id: (candidate.id as string).trim(),
      title: (candidate.title as string).trim(),
    },
    diagnostics,
  }
}

function slideRange(start: number, end: number): readonly number[] {
  return Object.freeze(Array.from({ length: end - start + 1 }, (_, index) => start + index))
}

export function extractChapters(slides: readonly NormalizedSlide[]): ChapterExtractionResult {
  const orderedSlides = [...slides].sort((a, b) => a.slideNumber - b.slideNumber)
  type SubchapterDeclaration = SubchapterFrontmatter & { slideNumber: number }
  type ChapterDeclaration = ChapterFrontmatter & { slideNumber: number, subchapters: SubchapterDeclaration[], firstSubchapterById: Map<string, number> }
  const declarations: ChapterDeclaration[] = []
  const diagnostics: ChapterDiagnostic[] = []
  const firstDeclarationById = new Map<string, number>()

  for (const slide of orderedSlides) {
    const parsed = parseChapter(slide.frontmatter.chapter, slide.slideNumber)
    diagnostics.push(...parsed.diagnostics)

    if (parsed.chapter) {
      const firstSlideNumber = firstDeclarationById.get(parsed.chapter.id)
      if (firstSlideNumber !== undefined) {
        diagnostics.push({ code: 'duplicate-id', field: 'chapter.id', slideNumber: slide.slideNumber, relatedSlideNumber: firstSlideNumber, message: `Slide ${slide.slideNumber}: duplicate chapter.id "${parsed.chapter.id}"; first declared on slide ${firstSlideNumber}.` })
      }
      else {
        firstDeclarationById.set(parsed.chapter.id, slide.slideNumber)
        declarations.push({ ...parsed.chapter, slideNumber: slide.slideNumber, subchapters: [], firstSubchapterById: new Map() })
      }
    }

    const parsedSubchapter = parseSubchapter(slide.frontmatter.subchapter, slide.slideNumber)
    diagnostics.push(...parsedSubchapter.diagnostics)
    if (!parsedSubchapter.subchapter)
      continue
    const activeChapter = declarations.at(-1)
    if (!activeChapter) {
      diagnostics.push({ code: 'orphaned-subchapter', field: 'subchapter', slideNumber: slide.slideNumber, message: `Slide ${slide.slideNumber}: subchapter "${parsedSubchapter.subchapter.id}" has no active chapter; declare a chapter first.` })
      continue
    }
    const firstSlideNumber = activeChapter.firstSubchapterById.get(parsedSubchapter.subchapter.id)
    if (firstSlideNumber !== undefined) {
      diagnostics.push({ code: 'duplicate-id', field: 'subchapter.id', slideNumber: slide.slideNumber, relatedSlideNumber: firstSlideNumber, message: `Slide ${slide.slideNumber}: duplicate subchapter.id "${parsedSubchapter.subchapter.id}" in chapter "${activeChapter.id}"; first declared on slide ${firstSlideNumber}.` })
      continue
    }
    activeChapter.firstSubchapterById.set(parsedSubchapter.subchapter.id, slide.slideNumber)
    activeChapter.subchapters.push({ ...parsedSubchapter.subchapter, slideNumber: slide.slideNumber })
  }

  if (diagnostics.length > 0)
    return { chapters: Object.freeze([]), diagnostics: Object.freeze(diagnostics) }

  const lastSlide = orderedSlides.at(-1)?.slideNumber ?? 0
  const chapters: Chapter[] = declarations.map((declaration, index) => {
    const endSlide = declarations[index + 1]?.slideNumber
      ? declarations[index + 1].slideNumber - 1
      : lastSlide

    const subchapters: readonly Subchapter[] = Object.freeze(declaration.subchapters.map((subchapter, subchapterIndex) => {
      const nextSubchapter = declaration.subchapters[subchapterIndex + 1]
      const subchapterEndSlide = nextSubchapter ? nextSubchapter.slideNumber - 1 : endSlide
      return Object.freeze({ id: subchapter.id, title: subchapter.title, index: subchapterIndex, startSlide: subchapter.slideNumber, endSlide: subchapterEndSlide, slideNumbers: slideRange(subchapter.slideNumber, subchapterEndSlide) })
    }))
    return Object.freeze({
      id: declaration.id,
      title: declaration.title,
      index,
      startSlide: declaration.slideNumber,
      endSlide,
      slideNumbers: slideRange(declaration.slideNumber, endSlide),
      subchapters,
    })
  })

  return {
    chapters: Object.freeze(chapters),
    diagnostics: Object.freeze([]),
  }
}

export function findCurrentSubchapter(chapter: Chapter | undefined, slideNumber: number): Subchapter | undefined {
  return chapter?.subchapters.find(subchapter => slideNumber >= subchapter.startSlide && slideNumber <= subchapter.endSlide)
}

export function findCurrentChapter(
  chapters: readonly Chapter[],
  slideNumber: number,
): Chapter | undefined {
  return chapters.find(chapter => (
    slideNumber >= chapter.startSlide && slideNumber <= chapter.endSlide
  ))
}
