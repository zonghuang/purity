<template>
  <md-outlined-segmented-button
    :segments="segments"
    @click="click"
    @dblclick="dbclick"
  ></md-outlined-segmented-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  property: {
    segments: {
      label: string
      icon?: string
      disabled?: boolean
    }[]
  }
}>()
const emit = defineEmits(['action'])

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })

const segments = computed(() => props.property.segments)
</script>
