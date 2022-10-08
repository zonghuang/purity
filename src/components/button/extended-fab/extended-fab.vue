<template>
  <md-fab-extended
    :icon="icon"
    :label="label"
    :disabled="disabled"
    @click="click"
    @dblclick="dbclick"
  ></md-fab-extended>
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
