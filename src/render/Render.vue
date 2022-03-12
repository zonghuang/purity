<template>
  <render-template :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit';

const editStore = useEditStore()
const elements = editStore.currentPage.elements
</script>