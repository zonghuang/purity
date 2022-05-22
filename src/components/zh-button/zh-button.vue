<template>
  <div class="zh-button">
    <el-button :type="propConfig.type" :icon="propConfig.icon" @click="handleClick">{{ propConfig.label }}</el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  propConfig: any
}>()
const emit = defineEmits(['action'])

const handleClick = () => emit('action', { event: 'click' })
</script>

<style scoped>
</style>
