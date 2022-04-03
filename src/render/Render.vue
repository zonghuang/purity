<template>
  <render-template :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store/render';

const route = useRoute()
const renderStore = useRenderStore()
renderStore.fetchConfig(route.params)
const elements = computed(() => renderStore.currentPage.elements)
</script>
