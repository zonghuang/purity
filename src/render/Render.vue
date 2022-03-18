<template>
  <render-template :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store/render';

const renderStore = useRenderStore()
renderStore.fetchConfig('1')
const elements = computed(() => renderStore.currentPage.elements)
</script>