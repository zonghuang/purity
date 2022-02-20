<template>
  <div
    id="canvas-container"
    class="canvas-container"
    @mousedown="mousedown"
    @dragstart="dragstart"
    @dragend="dragend"
    @dragenter="dragenter"
    @dragover="dragover"
    @drop="drop"
  >
    <component-template :elements="elements" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue"
import { useStore } from 'vuex'
import { currentComponent } from "../mock-data"
import { key } from '../store'

import { loopElements1 } from "../mock-data"
import { IElement } from "../interface"

const store = useStore(key)
const emit = defineEmits(['moveMouse'])

const elements: IElement[] = loopElements1

let selectedElement = null
const canvasOffset = { x: 0, y: 0 }
const elementOffset = { x: 0, y: 0 }
const targetElement = { width: 0, height: 0, layout: '', isContainer: false, isInline: false }

// const elements = computed(() => store.state.currentPage.elements)

onMounted(() => {
  const canvas: any = document.querySelector('.canvas-container')
  canvasOffset.x = canvas.offsetLeft
  canvasOffset.y = canvas.offsetTop
})

const mousedown = (ev: any) => {
  return
  // console.log(ev.target);
  // ev.stopPropagation()
  elementOffset.x = ev.offsetX
  elementOffset.y = ev.offsetY
  // console.log('elementOffset', elementOffset)
  // console.log('canvasOffset', canvasOffset)
}

const dragstart = (ev: any) => {
  return
  ev.effectAllowed = 'copyMove'
  selectedElement = ev.target
  ev.dataTransfer.setData('text/plain', ev.target.id)
}

const dragend = (ev: any) => {
  return
  ev.dataTransfer.clearData()
}

const dragenter = (ev: any) => {
  return
  ev.preventDefault()
  ev.stopPropagation()
  const { clientWidth, clientHeight, parentNode } = ev.target
  targetElement.width = clientWidth
  targetElement.height = clientHeight
  targetElement.isContainer = ev.target.getAttribute('isContainer') === 'true' ? true : false
  targetElement.isInline = ev.target.getAttribute('isInline') === 'true' ? true : false
  console.log(targetElement)
  // console.log(ev.target);
  console.log(ev.currentTarget);
  
  
  // console.log(parentNode);
  
}

const dragover = (ev: any) => {
  return
  ev.preventDefault()
  ev.stopPropagation()
  // console.log(ev.offsetX - elementOffset.x, ev.offsetY - elementOffset.y)
  
  const { width, height, isContainer } = targetElement
  if (isContainer) {

    return
  }

  // console.log()


  // console.log(ev.offsetX, elementOffset.x, ev.offsetX - elementOffset.x)
  // console.log(ev.target.clientWidth, ev.target.clientHeight)
  

  // const { x, y } = store.state.elementOffset
  // const cx = ev.clientX - store.state.canvasOffset.x - x
  // const cy = ev.clientY - store.state.canvasOffset.y - y
}

const drop = (ev: any) => {
  return
  ev.preventDefault()
  ev.stopPropagation()
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
