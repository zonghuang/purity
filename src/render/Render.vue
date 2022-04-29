<template>
  <render-template v-if="refresh && elements && elements.length" :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { _useRoute } from '@/hooks'
import { useRenderStore } from '@/store/render'

const refresh = ref(true)
const route = _useRoute()
const renderStore = useRenderStore()
renderStore.fetchConfig(route.params)
const elements = computed(() => renderStore.currentPage?.elements)

watch(() => route.fullPath, async () => {
  refresh.value = false
  await renderStore.fetchConfig(route.params)
  refresh.value = true
})
</script>
