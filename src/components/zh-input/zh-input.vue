<template>
  <el-input :id="id" v-model="a" :placeholder="data" />
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  id: string,
  data: string
}>()

const a = ref(0)
</script>

<style scoped>

</style>
