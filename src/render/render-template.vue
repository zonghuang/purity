<template>
  <component
    v-for="element in elements"
    :key="element.uuid"
    :is="element.name"
    :uuid="element.uuid"
    :style="element.style"
    :events="element.events"
    :propValue="element.propValue"
    :propConfig="element.propConfig"
    @update="handleUpdate"
    @action="handleAction"
    @click="handleClick(element)"
  >
    <render-template v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import { IElement } from '../editor/interface'

const props = defineProps<{
  elements: IElement[],
}>()

function handleUpdate() {
  console.log('update')
}

function handleAction() {
  console.log('action')
}

function handleClick(element: IElement) {
  console.log('click', element)
}
</script>