<template>
  <md-outlined-button
    :icon="icon"
    :label="label"
    :disabled="disabled"
    @click="click"
    @dblclick="dbclick"
  ></md-outlined-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  propConfig: {
    label: string
    icon?: string
    disabled?: boolean
  }
}>()
const emit = defineEmits(['action'])

const label = computed(() => props.propConfig.label)
const icon = computed(() => props.propConfig.icon)
const disabled = computed(() => props.propConfig.disabled)

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })
</script>
