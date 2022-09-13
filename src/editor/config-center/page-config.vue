<template>
  <div class="page-config">
    <md-outlined-text-field
      label="页面标题"
      v-model="editStore.currentPage.title"
    ></md-outlined-text-field>

    <md-outlined-text-field
    label="页面名称"
    disabled="true"
    v-model="editStore.currentPage.page"
    ></md-outlined-text-field>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/editor'

const editStore = useEditStore()
</script>

<style scoped>
.page-config {
  padding: 16px;
}
</style>
