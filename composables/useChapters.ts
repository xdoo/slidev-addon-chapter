import type { ChapterState, NormalizedSlide } from '../src'
import { useNav } from '@slidev/client'
import { computed, readonly } from 'vue'
import { ChapterValidationError } from '../src'
import { extractChapters, findCurrentChapter, findCurrentSubchapter } from '../src'

export function useChapters(): ChapterState {
  const { slides, currentPage } = useNav()

  const extraction = computed(() => extractChapters(
    slides.value.map((route): NormalizedSlide => ({
      slideNumber: route.no,
      frontmatter: route.meta.slide.frontmatter,
    })),
  ))

  const chapters = computed(() => {
    if (extraction.value.diagnostics.length > 0)
      throw new ChapterValidationError(extraction.value.diagnostics)
    return extraction.value.chapters
  })

  const currentChapter = computed(() => findCurrentChapter(chapters.value, currentPage.value))
  const currentSubchapter = computed(() => findCurrentSubchapter(currentChapter.value, currentPage.value))

  return {
    chapters: readonly(chapters),
    currentChapter: readonly(currentChapter),
    currentSubchapter: readonly(currentSubchapter),
  }
}
