<template>
  <div
    id="shape"
    class="shape"
    v-for="element in elements"
    :key="element.uuid"
    @mousedown="onMousedown($event, element)"
    @mouseup="onMouseup"
    @dragstart="onDragstart"
    @dragend="onDragend"
    @click="onClick($event, element)"
  >
    <component
      :is="element.name"
      :id="element.uuid"
      :uuid="element.uuid"
      :style="element.style"
      :propValue="element.propValue"
      :propConfig="element.propConfig"
    >
      <component-template v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
    </component>
  </div>
</template>

<script setup lang="ts">
import { toRaw } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
import { IElement } from '../interface'

const store = useStore(key)
const props = defineProps<{ elements: IElement[] }>()

const onMousedown = (ev: MouseEvent, element: IElement) => {
  // console.log('mousedown');
  store.commit('selectComponent', element)
  
  // element.style.position = 'absolute';
  const canvasOffset = toRaw(store.state.canvasOffset)
  const startX =  canvasOffset.x + ev.offsetX
  const startY = canvasOffset.y + ev.offsetY
  
  const move = (e: MouseEvent) => {
    const left = e.pageX - startX
    const top = e.pageY - startY
    const style = { left: left + 'px', top: top + 'px'}
    const payload = { componentId: element.uuid, style }
    store.commit('moveComponent', payload)
  }

  const up = (e: MouseEvent) => {
    document.removeEventListener('mousemove', move)
    document.removeEventListener('mouseup', up)
  }

  document.addEventListener('mousemove', move)
  document.addEventListener('mouseup', up)
}

const onMouseup = (ev: MouseEvent) => {
  // console.log('mouseup');
}

const onDragstart = (ev: DragEvent) => {
  // console.log('dragstart');
  ev.dataTransfer.setData('text/plain', ev.target.id);
  ev.effectAllowed = 'copyMove';
}

const onDragend = (ev: DragEvent) => {
  // console.log('dragend');
  ev.dataTransfer.clearData();
}

const onClick = (ev: MouseEvent, element: IElement) => {
  // console.log('click', ev, element);
}
</script>

<style scoped>
.shape {
  cursor: move;
  position: absolute;
  display: contents;
}
</style>