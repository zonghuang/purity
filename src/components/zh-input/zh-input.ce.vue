<template>
  <input :id="id" :placeholder="data" />
  <el-button>sdfg</el-button>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  data: string,

}>()
</script>

<style scoped>

</style>
