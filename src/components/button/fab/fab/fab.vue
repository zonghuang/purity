<template>
  <md-fab
    :icon="icon"
    @click="click"
    @dblclick="dbclick"
  ></md-fab>
</template>

<script setup lang="ts">
const props = defineProps<{
  propConfig: {
    icon: string
  }
}>()

const emit = defineEmits(['action'])

const icon = computed(() => props.propConfig.icon)

const click = (e: MouseEvent) => {
  e.stopPropagation()
  emit('action', { event: 'click' })
}

const dbclick = (e: MouseEvent) => {
  e.stopPropagation()
  emit('action', { event: 'dbclick' })
}
</script>
