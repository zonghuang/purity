<template>
  <div class="component-lib">

  </div>
</template>

<script setup lang="ts">
import { components } from 'mock/component-list'

const libs = ref(components)
const activeNames = ref(['test'])

const dragstart = (ev: DragEvent, name: string) => {
  ev.dataTransfer?.clearData()
  const { offsetX, offsetY } = ev
  const data = { name, offsetX, offsetY }
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', JSON.stringify(data))
}
</script>

<style scoped lang="less">

</style>
