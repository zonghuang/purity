<template>
  <component
    v-for="component in components"
    :key="component.uuid"
    :is="component.name"
    :uuid="component.uuid"
    :style="component.style"
    :property="component.property"
    :modelValue="component.modelValue"
    @update:modelValue="handleUpdate($event, component)"
    @action="handleAction($event, component)"
  >
    <render-template v-if="component.children?.length" :components="component.children" />
    <template v-for="slot in component.slots" :key="slot.name" v-slot:[slot.name]>
      <render-template :components="slot.children" />
    </template>
  </component>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store'

defineProps<{
  components: Component[]
}>()

const renderStore = useRenderStore()

const getProps = (component: Component) => renderStore.getProperty(component)
const getValue = (component: Component) => renderStore.getModelValue(component)

function handleUpdate(newValue: any, component: Component) {
  console.log('update:modelValue', newValue, component)
  component.modelValue = newValue
}

function handleAction(ev: any, component: Component) {
  console.log(ev.event, component)
  const actions = component.actions?.filter(item => item.event === ev.event)
  if (actions) renderStore.handleAction(actions)
}
</script>
