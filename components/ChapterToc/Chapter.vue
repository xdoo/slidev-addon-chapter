<script setup lang="ts">
import type { Chapter } from '../../src'
import Subchapter from './Subchapter.vue'

defineProps<{
  chapter: Chapter
  showNumbers: boolean
  showSubchapters: boolean
  isCurrent: boolean
  currentSubchapterId?: string
}>()

defineEmits<{ navigate: [slideNumber: number] }>()
</script>

<template>
  <li
    class="chapter-toc__item"
    :class="{ 'chapter-toc__item--current': isCurrent }"
    :data-chapter-id="chapter.id"
    :data-current="isCurrent ? 'true' : undefined"
  >
    <button
      class="chapter-toc__link"
      type="button"
      :aria-current="isCurrent ? 'location' : undefined"
      @click="$emit('navigate', chapter.startSlide)"
    >
      <span v-if="showNumbers" class="chapter-toc__number" aria-hidden="true">{{ chapter.index + 1 }}.</span>
      <span class="chapter-toc__title">{{ chapter.title }}</span>
    </button>
    <ol v-if="showSubchapters && chapter.subchapters.length > 0" class="chapter-toc__sublist">
      <Subchapter
        v-for="subchapter in chapter.subchapters"
        :key="subchapter.id"
        :subchapter="subchapter"
        :chapter-id="chapter.id"
        :chapter-index="chapter.index"
        :show-numbers="showNumbers"
        :is-current="isCurrent && currentSubchapterId === subchapter.id"
        @navigate="$emit('navigate', $event)"
      />
    </ol>
  </li>
</template>

<style scoped>
.chapter-toc__sublist {
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
