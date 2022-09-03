<template>
  <div class="zh-container" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  uuid: string
  modelValue: string
}>()

const emit = defineEmits(['action'])

const handleClick = () => emit('action', { event: 'click' })
</script>

<style scoped lang="less">
&::-webkit-scrollbar {
  display: none;
}
</style>
