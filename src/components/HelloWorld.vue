<template>
  <h2>{{ data }}</h2>
  <el-button type="primary" size="medium" @click="handleClick">按钮</el-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{ data: string }>()

const count = ref(0)
const handleClick = () => {
  console.log('hello');
}

onMounted(() => {
  console.log('++++')
})

</script>

<style scoped>

</style>
