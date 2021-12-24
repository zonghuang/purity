<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string }>()

const count = ref(0)
const handleClick = () => {
  console.log('hello');
}
</script>

<template>
  <h2>{{ msg }}</h2>
  <el-button type="primary" size="medium" @click="handleClick">按钮</el-button>
</template>

<style scoped>

</style>
