<template>
  <div class="zh-container">
    容器{{uuid}}
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  propValue: string
  uuid: string
}>()
</script>

<style scoped>
.zh-container {
  /* padding: 10px; */
  /* border: 1px solid #ccc; */
}
</style>
