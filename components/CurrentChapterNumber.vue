<script setup lang="ts">
import { useChapters } from '../composables'

const { currentChapter } = useChapters()
</script>

<template>
  <span v-if="currentChapter" class="current-chapter-number">{{ currentChapter.index + 1 }}</span>
</template>
