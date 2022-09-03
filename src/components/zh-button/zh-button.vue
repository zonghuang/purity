<template>
  <div class="zh-button">
    <el-button class="btn" :type="propConfig.type" :icon="propConfig.icon" @click="handleClick">
      {{ propConfig.label }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  propConfig: any
}>()
const emit = defineEmits(['action'])

const handleClick = (e: MouseEvent) => {
  emit('action', { event: 'click' })
  e.stopPropagation()
}
</script>

<style scoped>
.zh-button {
  padding: 10px 20px;
}
</style>
