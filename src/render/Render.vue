<template>
  <render-template v-if="refresh && elements?.length" :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { _useRoute } from '@/hooks'
import { useRenderStore } from '@/store/render'

const route = _useRoute()
const renderStore = useRenderStore()

const refresh = ref(true)

renderStore.fetchConfig(route.params)
const elements = computed(() => renderStore.page?.elements)

watch(() => route.fullPath, async () => {
  refresh.value = false
  await renderStore.fetchConfig(route.params)
  refresh.value = true
})
</script>
