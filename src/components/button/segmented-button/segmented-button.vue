<template>
  <md-outlined-segmented-button
    :segments="segments"
    @click="click"
    @dblclick="dbclick"
  ></md-outlined-segmented-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  propConfig: {
    segments: {
      label: string
      icon?: string
      disabled?: boolean
    }[]
  }
}>()
const emit = defineEmits(['action'])

const segments = computed(() => props.propConfig.segments)

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })
</script>
