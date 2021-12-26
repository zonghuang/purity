<template>
  <button :id="id">{{data}}</button>
</template>

<script setup lang="ts">
defineProps<{
  id: string,
  data: string,

}>()
</script>

<style scoped>

</style>
