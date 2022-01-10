<template>
  <div
    class="canvas-container"
    @mousemove="onMousemove"
    @mousedown="onMousedown"
    @mouseup="onMouseup"
    @dragover="onDragover"
    @drop="onDrop"
  >
    <component-template :elements="elements" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from "vue";
import { useStore } from 'vuex'
import { key } from '../store'

const store = useStore(key)
const emit = defineEmits(['moveMouse'])

const elements = computed(() => store.state.currentPage.elements)

onMounted(() => {
  const canvas: any = document.querySelector('.canvas-container')
  store.commit('setCanvasOffset', { x: canvas.offsetLeft, y: canvas.offsetTop })
})

const onMousemove = (ev: MouseEvent) => {
  // console.log('mousemove');
  store.commit('setCoord', { x: ev.offsetX, y: ev.offsetY})
}

const onMousedown = (ev: MouseEvent) => {
  // console.log('mousedown');
}

const onMouseup = (ev: MouseEvent) => {
  // console.log('mouseup');
}

const onDragover = (ev: DragEvent) => {
  // console.log('dragover');
  ev.preventDefault();
}

const onDrop = (ev: DragEvent) => {
  // console.log('drop');
  ev.preventDefault();

  const componentName = ev.dataTransfer.getData('text/plain');
  if (componentName.indexOf('-') !== -1) {
    const { x, y } = store.state.dragBeforeDownOffset
    const left = ev.offsetX - x
    const top = ev.offsetY - y
    const style = { left: left + 'px', top: top + 'px' }
    const payload = { componentName, style }
    store.commit('addComponent', payload)
  } else {
    // const payload = { componentId: componentName, style }
    // store.commit('moveComponent', payload)
  }
}
</script>

<style scoped lang="less">
.canvas-container {
  position: relative;
  flex: 1;
  margin: 0 8px;
  height: 100%;
  overflow: scroll;
  background-image: url('../assets/canvas.svg');
}
</style>
