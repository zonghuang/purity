<template>
  <component
    v-for="element in elements"
    :key="element.uuid"
    :is="element.name"
    :id="element.uuid"
    :style="element.style"
    :config="element.config"
    :events="element.events"
    :data="element.data"
    @update="handleUpdate"
    @action="handleAction"
    @click="handleClick(element)"
  >
    {{element.data}}
    <Render v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import { ElementT } from './element.type'

const props = defineProps<{
  elements: ElementT[],
}>()

function handleUpdate() {
  console.log('update')
}

function handleAction() {
  console.log('action')
}

function handleClick(element: ElementT) {
  console.log('click', element)
}
</script>