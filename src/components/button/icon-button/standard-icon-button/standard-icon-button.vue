<template>
  <md-standard-icon-button
    :icon="icon"
    :disabled="disabled"
    @click="click"
    @dblclick="dbclick"
  ></md-standard-icon-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  property: {
    icon: string
    disabled?: boolean
  }
}>()
const emit = defineEmits(['action'])

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })

const icon = computed(() => props.property.icon)
const disabled = computed(() => props.property.disabled)
</script>
