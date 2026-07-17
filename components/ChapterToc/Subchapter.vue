<script setup lang="ts">
import type { Subchapter } from '../../src'

defineProps<{
  subchapter: Subchapter
  chapterId: string
  chapterIndex: number
  showNumbers: boolean
  isCurrent: boolean
}>()

defineEmits<{ navigate: [slideNumber: number] }>()
</script>

<template>
  <li
    class="chapter-toc__subitem"
    :class="{ 'chapter-toc__subitem--current': isCurrent }"
    :data-subchapter-id="subchapter.id"
    :data-parent-chapter-id="chapterId"
    :data-current="isCurrent ? 'true' : undefined"
  >
    <button
      class="chapter-toc__sublink"
      type="button"
      :aria-current="isCurrent ? 'location' : undefined"
      @click="$emit('navigate', subchapter.startSlide)"
    >
      <span v-if="showNumbers" class="chapter-toc__subnumber" aria-hidden="true">{{ chapterIndex + 1 }}.{{ subchapter.index + 1 }}</span>
      <span class="chapter-toc__subtitle">{{ subchapter.title }}</span>
    </button>
  </li>
</template>

<style scoped>
.chapter-toc__sublink {
  appearance: none;
  border: 0;
  padding: 0;
  color: inherit;
  background: transparent;
  font: inherit;
  text-align: start;
  cursor: pointer;
}

.chapter-toc__subnumber {
  margin-inline-end: 0.4em;
}
</style>
