<template>
  <el-button type="primary">{{propValue}}</el-button>
</template>

<script setup lang="ts">
defineProps<{
  propValue: string
}>()
</script>

<style scoped>

</style>
