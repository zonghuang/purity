<template>
  <el-button :uuid="uuid" type="primary">{{propValue}}</el-button>
</template>

<script setup lang="ts">
defineProps<{
  uuid: string
  propValue: string
}>()
</script>

<style scoped>

</style>
