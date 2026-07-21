<script setup lang="ts">
import { useNav } from '@slidev/client'
import { useChapters } from '../composables'
import Chapter from './ChapterToc/Chapter.vue'

const {
  showNumbers = false,
  highlightCurrent = false,
  highlightCurrentMode = 'hierarchy',
  showSubchapters = false,
} = defineProps<{
  showNumbers?: boolean
  highlightCurrent?: boolean
  highlightCurrentMode?: 'hierarchy' | 'single'
  showSubchapters?: boolean
}>()

const { chapters, currentChapter, currentSubchapter } = useChapters()
const { go } = useNav()

const isChapterCurrent = (chapterId: string) => {
  if (!highlightCurrent || currentChapter.value?.id !== chapterId)
    return false

  return highlightCurrentMode !== 'single' || !showSubchapters || !currentSubchapter.value
}

const currentSubchapterIdFor = (chapterId: string) => {
  if (!highlightCurrent || currentChapter.value?.id !== chapterId || !currentSubchapter.value)
    return undefined

  if (highlightCurrentMode === 'single' && !showSubchapters)
    return undefined

  return currentSubchapter.value.id
}
</script>

<template>
  <nav class="chapter-toc" aria-label="Chapters" data-chapter-toc>
    <ol class="chapter-toc__list">
      <Chapter
        v-for="chapter in chapters"
        :key="chapter.id"
        :chapter="chapter"
        :show-numbers="showNumbers"
        :show-subchapters="showSubchapters"
        :is-current="isChapterCurrent(chapter.id)"
        :current-subchapter-id="currentSubchapterIdFor(chapter.id)"
        @navigate="go"
      />
    </ol>
  </nav>
</template>

<style scoped>
.chapter-toc__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

</style>
