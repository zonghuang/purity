<template>
  <md-elevated-button
    :icon="icon"
    :label="label"
    :disabled="disabled"
    @click="click"
    @dblclick="dbclick"
  ></md-elevated-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  property: {
    label: string
    icon?: string
    disabled?: boolean
  }
}>()
const emit = defineEmits(['action'])

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })

const label = computed(() => props.property.label)
const icon = computed(() => props.property.icon)
const disabled = computed(() => props.property.disabled)
</script>
