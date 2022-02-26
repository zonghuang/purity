<template>
  <div class="zh-input">
    <el-input v-model="propValue" :placeholder="propConfig.placeholder" />
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
