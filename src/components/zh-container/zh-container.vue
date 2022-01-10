<template>
  <div class="zh-container">
    容器
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{ propValue: string }>()
</script>

<style scoped>
.zh-container {
  /* padding: 10px; */
  /* border: 1px solid #ccc; */
}
</style>
