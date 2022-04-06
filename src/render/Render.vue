<template>
  <render-template v-if="refresh && elements" :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store/render';

const refresh = ref(true)
const route = useRoute()
const renderStore = useRenderStore()
renderStore.fetchConfig(route.params)
const elements = computed(() => renderStore.currentPage?.elements)

const stopWatch = watch(() => route.fullPath, async () => {
  refresh.value = false
  await renderStore.fetchConfig(route.params)
  refresh.value = true
})
onUnmounted(() => stopWatch())
</script>
