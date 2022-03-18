<template>
  <div class="zh-button">
    <el-button :type="propConfig.type">{{ modelValue }}</el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  propConfig: any
}>()
</script>

<style scoped>

</style>
