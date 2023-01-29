<template>
  <render-template v-if="components?.length" :components="components"></render-template>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store'

const renderStore = useRenderStore()
renderStore.fetchPageConfig()
const components = computed(() => renderStore.page.components)
</script>
