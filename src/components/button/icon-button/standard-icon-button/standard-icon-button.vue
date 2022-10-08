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
  propConfig: {
    icon: string
    disabled?: boolean
  }
}>()
const emit = defineEmits(['action'])

const icon = computed(() => props.propConfig.icon)
const disabled = computed(() => props.propConfig.disabled)

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })
</script>
