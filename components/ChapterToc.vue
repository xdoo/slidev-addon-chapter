<script setup lang="ts">
import { useNav } from '@slidev/client'
import { useChapters } from '../composables/useChapters'

withDefaults(defineProps<{
  showNumbers?: boolean
  highlightCurrent?: boolean
}>(), {
  showNumbers: false,
  highlightCurrent: false,
})

const { chapters, currentChapter } = useChapters()
const { go } = useNav()
</script>

<template>
  <nav class="chapter-toc" aria-label="Chapters" data-chapter-toc>
    <ol class="chapter-toc__list">
      <li
        v-for="chapter in chapters"
        :key="chapter.id"
        class="chapter-toc__item"
        :class="{ 'chapter-toc__item--current': highlightCurrent && currentChapter?.id === chapter.id }"
        :data-chapter-id="chapter.id"
        :data-current="highlightCurrent && currentChapter?.id === chapter.id ? 'true' : undefined"
      >
        <button
          class="chapter-toc__link"
          type="button"
          :aria-current="highlightCurrent && currentChapter?.id === chapter.id ? 'location' : undefined"
          @click="go(chapter.startSlide)"
        >
          <span v-if="showNumbers" class="chapter-toc__number" aria-hidden="true">{{ chapter.index + 1 }}.</span>
          <span class="chapter-toc__title">{{ chapter.title }}</span>
        </button>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.chapter-toc__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.chapter-toc__link {
  appearance: none;
  border: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.chapter-toc__number {
  margin-inline-end: 0.4em;
}
</style>
