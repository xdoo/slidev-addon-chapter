<script setup lang="ts">
import { useChapters } from '../composables'

const { chapters } = useChapters()
</script>

<template>
  <span v-if="chapters.length" class="chapter-count">{{ chapters.length }}</span>
</template>
