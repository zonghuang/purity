<template>
  <el-button :id="id" type="primary" size="medium">{{data}}</el-button>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  data: string,
}>()
</script>

<style scoped>

</style>
