<template>
  <el-input :uuid="uuid" v-model="propValue" :placeholder="propConfig.placeholder" />
</template>

<script setup lang="ts">
import { ref } from "vue";

defineProps<{
  uuid: string,
  propValue: string
  propConfig: any
}>()

const a = ref(0)
</script>

<style scoped>

</style>
