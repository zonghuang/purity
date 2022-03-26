<template>
  <div class="zh-container">
    <!-- {{uuid}} -->
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  uuid: string
  modelValue: string
}>()
</script>

<style scoped lang="less">
  &::-webkit-scrollbar {
    display: none;
  }
</style>
