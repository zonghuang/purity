<template>
  <div class="zh-container">
    容器{{uuid}}
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  uuid: string
  propValue: string
}>()
</script>

<style scoped>

</style>
