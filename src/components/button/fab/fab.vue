<template>
  <md-fab
    :icon="icon"
    :disabled="disabled"
    @click="click"
    @dblclick="dbclick"
  ></md-fab>
</template>

<script setup lang="ts">
const props = defineProps<{
  propConfig: {
    icon: string
    size?: 'default' | 'large' | 'small'
    disabled?: boolean
  }
}>()
const emit = defineEmits(['action'])

const icon = computed(() => props.propConfig.icon)
const disabled = computed(() => props.propConfig.disabled)

const click = () => emit('action', { event: 'click' })
const dbclick = () => emit('action', { event: 'dbclick' })
</script>
