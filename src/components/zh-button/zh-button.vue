<template>
  <div class="zh-button">
    <el-button :type="propConfig.type">{{ propValue }}</el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  propValue: string
  propConfig: any
}>()
</script>

<style scoped>

</style>
