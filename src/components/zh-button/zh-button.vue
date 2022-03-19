<template>
  <div class="zh-button">
    <el-button :type="propConfig.type" @click="handleClick">{{ modelValue }}</el-button>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: string
  propConfig: any
}>()
const emit = defineEmits(['action'])

const handleClick = () => {
  emit('action', 'click')
}
</script>

<style scoped>

</style>
