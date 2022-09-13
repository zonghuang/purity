<template>
  <md-elevated-button
    :label="label"
    @click="click"
    @dblclick="dbclick"
  ></md-elevated-button>
</template>

<script setup lang="ts">
const props = defineProps<{
  propConfig: {
    label: string
    icon?: string
  }
}>()

const emit = defineEmits(['action'])

const label = computed(() => props.propConfig.label)

const click = (e: MouseEvent) => {
  e.stopPropagation()
  emit('action', { event: 'click' })
}

const dbclick = (e: MouseEvent) => {
  e.stopPropagation()
  emit('action', { event: 'dbclick' })
}
</script>
