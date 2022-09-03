<template>
  <component
    v-for="element in elements"
    :key="element.uuid"
    :is="element.name"
    :uuid="element.uuid"
    :style="element.style"
    :actions="element.actions"
    :modelValue="element.modelValue"
    :propConfig="element.propConfig"
    :childrens="element.childrens"
    @update:modelValue="handleUpdate($event, element)"
    @action="handleAction($event, element)"
  >
    <render-template v-if="element.childrens?.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store/render'

defineProps<{
  elements: IElement[]
}>()

const renderStore = useRenderStore()

function handleUpdate(newValue: any, element: IElement) {
  renderStore.updateValue(newValue, element)
}

function handleAction(ev: { event: string; bindCode?: string }, element: IElement) {
  console.log('action: ', ev.event, toRaw(element))
  const actions = element.actions?.filter(item => item.event === ev.event)
  if (actions && ev.bindCode) {
    const bindCodeActions = actions.filter(item => item.bindCode === ev.bindCode)
    bindCodeActions && renderStore.handleActions(bindCodeActions)
  } else {
    actions && renderStore.handleActions(actions)
  }
}
</script>
