<script setup lang="ts">
import { useNav } from '@slidev/client'
import { useChapters } from '../composables'
import Chapter from './ChapterToc/Chapter.vue'

const {
  showNumbers = false,
  highlightCurrent = false,
  showSubchapters = false,
} = defineProps<{
  showNumbers?: boolean
  highlightCurrent?: boolean
  showSubchapters?: boolean
}>()

const { chapters, currentChapter, currentSubchapter } = useChapters()
const { go } = useNav()
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
        :is-current="highlightCurrent && currentChapter?.id === chapter.id"
        :current-subchapter-id="highlightCurrent && currentChapter?.id === chapter.id ? currentSubchapter?.id : undefined"
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
