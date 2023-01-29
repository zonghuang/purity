<template>
  <div>
    <slot></slot>
    <slot name="header"></slot>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['action'])

onBeforeMount(() => emit('action', { event: 'beforeMount' }))
onMounted(() => emit('action', { event: 'mounted' }))
onBeforeUnmount(() => emit('action', { event: 'beforeUnmount' }))
</script>
