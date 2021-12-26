<template>
  <el-button :id="id" type="primary" size="medium">6666{{data}}</el-button>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  data: string,
}>()
</script>

<style scoped>

</style>
