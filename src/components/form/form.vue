<template>
  <form>
    <slot></slot>
  </form>
</template>

<script setup lang="ts">

const props = defineProps<{
  uuid: string
  modelValue: any
  property: any
}>()
const emit = defineEmits(['update:modelValue', 'action'])

onBeforeMount(() => emit('action', { event: 'beforeMount' }))
onMounted(() => emit('action', { event: 'mounted' }))
onBeforeUnmount(() => emit('action', { event: 'beforeUnmount' }))

const formState = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
</script>
