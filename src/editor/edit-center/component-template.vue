<template>
  <div
    class="shell"
    draggable=true
    :id="element.uuid"
    :key="element.uuid"
    v-for="element in elements"
    :style="shellStyle(element)"
    @click="click($event, element)"
    @mousedown="mousedown"
    @dragstart="dragstart"
    @dragend="dragend"
    @dragenter="dragenter($event, element)"
    @dragleave="dragleave"
    @dragover="dragover($event, element)"
    @drop="drop"
  >
    <line-insert-placeholder
      v-if="targetElement.id === element.uuid && line.slotPosition === 'previous'"
      :style="line.style"
      :propConfig="{ direction: line.direction }"
    />
 
    <component
      class="component"
      :class="{ 'pointer-events': isPointerEvents(element), 
                'root-container': element.type === 'root',
                'active': editStore.currentComponent.uuid === element.uuid
              }"
      :is="element.name"
      :uuid="element.uuid"
      :style="element.style"
      :propValue="element.propValue"
      :propConfig="element.propConfig"
    >
      <component-template v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
    </component>

    <line-insert-placeholder
      v-if="targetElement.id === element.uuid && line.slotPosition === 'next'"
      :style="line.style"
      :propConfig="{ direction: line.direction }"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { IElement } from '../interface'
import { useEditStore } from '../store/edit';

const props = defineProps<{
  elements: IElement[]
}>()

const editStore = useEditStore()
const elementOffset = reactive({ offsetX: 0, offsetY: 0 })
const line = reactive({ direction: '', slotPosition: '', style: {} })
const draggedElement = reactive({ id: '', offsetX: 0, offsetY: 0 })
const targetElement = reactive({ id: '', clientWidth: 0, clientHeight: 0, type: '' })
let insertSeat = ''

const click = (ev: MouseEvent, element: IElement) => {
  ev.stopPropagation()
  editStore.currentComponent = element
}

const mousedown = (ev: MouseEvent) => {
  elementOffset.offsetX = ev.offsetX
  elementOffset.offsetY = ev.offsetY
}

const dragstart = (ev: DragEvent) => {
  ev.stopPropagation()
  const { currentTarget } = ev
  const { offsetX, offsetY } = elementOffset
  const id = currentTarget.getAttribute('id')
  const data = `${id},${offsetX},${offsetY}`
  Object.assign(draggedElement, { id, offsetX, offsetY })
  ev.effectAllowed = 'copyMove'
  ev.dataTransfer.setData('text/plain', data)
}

const dragend = (ev: DragEvent) => {
  ev.dataTransfer.clearData()
}

const dragenter = (ev: DragEvent, element: IElement) => {
  ev.preventDefault()
  ev.stopPropagation()

  if (ev.currentTarget.getAttribute('id') === draggedElement.id) {
    hideLine()
    return
  }

  const { currentTarget, currentTarget: { clientWidth, clientHeight } } = ev
  const id = currentTarget.getAttribute('id')
  const isContainer = element.type === 'container' || element.type === 'root'
  const { display = '', flexDirection } = element.style
  const isInline = display.includes('inline') || (display === 'flex' && flexDirection === 'row')
  
  const type = isInline  && !isContainer ? 'inlineNoncontainer'
             : !isInline && !isContainer ? 'blockNoncontainer'
             : isInline  && isContainer  ? 'inlineContainer'
             : 'blockContainer'

  Object.assign(targetElement, { id, clientWidth, clientHeight, type })
}

const dragleave = () => {
  hideLine()
}

const dragover = (ev: DragEvent, element: IElement) => {
  ev.preventDefault()
  ev.stopPropagation()

  if (!targetElement.id) return
  const { offsetX, offsetY } = ev
  const { id, clientWidth, clientHeight, type } = targetElement

  switch (type) {
    case 'inlineNoncontainer': {
      if (offsetX < (clientWidth / 2)) {
        insertSeat = 'previous'
        setLine('vertical', 'previous', 1, clientHeight)
      } else {
        insertSeat = 'next'
        setLine('vertical', 'next', 1, clientHeight)
      }
      break
    }

    case 'blockNoncontainer': {
      if (offsetY < clientHeight / 2) {
        insertSeat = 'previous'
        setLine('horizontal', 'previous', clientWidth, 1)
      } else {
        insertSeat = 'next'
        setLine('horizontal', 'next', clientWidth, 1)
      }
      break
    }

    case 'inlineContainer': {
      if (offsetX < 20) {
        insertSeat = 'previous'
        setLine('vertical', 'previous', 1, clientHeight)
      } else if (offsetX > clientWidth - 20) {
        insertSeat = 'next'
        setLine('vertical', 'next', 1, clientHeight)
      } else {
        insertSeat = 'inside'
        hideLine()
      }
      break
    }

    case 'blockContainer': {
      line.style = { width: clientWidth + 'px', height: '1px' }
      if (offsetY < 20) {
        insertSeat = 'previous'
        setLine('horizontal', 'previous', clientWidth, 1)
      } else if (offsetY > clientHeight - 20) {
        insertSeat = 'next'
        setLine('horizontal', 'next', clientWidth, 1)
      } else {
        insertSeat = 'inside'
        hideLine()
      }
      break
    }

    default:
      break;
  }
}

const drop = (ev: DragEvent) => {
  hideLine()
  ev.preventDefault()
  ev.stopPropagation()

  const data = ev.dataTransfer.getData('text/plain')

  if (data.includes('isNew')) {
    const [name, offsetX, offsetY] = data.split(',')
    const payload = { name, offsetX, offsetY }
    editStore.addComponent(payload)
    if (editStore.currentComponent.style?.position)
      setComponentPos(ev.pageX, ev.pageY, Number(offsetX), Number(offsetY))
    if (insertSeat === 'previous') editStore.insertBefore(editStore.currentPage.elements, targetElement.id)
    if (insertSeat === 'next') editStore.insertAfter(editStore.currentPage.elements, targetElement.id)
    if (insertSeat === 'inside') editStore.insertChild(editStore.currentPage.elements, targetElement.id)
  
  } else {
    const [uuid, offsetX, offsetY] = data.split(',')
    
    if (ev.currentTarget.getAttribute('id') === uuid) return
    editStore.setComponent(editStore.currentPage.elements, uuid)
    editStore.deleteComponent(editStore.currentPage.elements, uuid)
    if (editStore.currentComponent.style?.position)
      setComponentPos(ev.pageX, ev.pageY, Number(offsetX), Number(offsetY))
    if (insertSeat === 'previous') editStore.insertBefore(editStore.currentPage.elements, targetElement.id)
    if (insertSeat === 'next') editStore.insertAfter(editStore.currentPage.elements, targetElement.id)
    if (insertSeat === 'inside') editStore.insertChild(editStore.currentPage.elements, targetElement.id)
  }
}

const setComponentPos = (pageX: number, pageY: number, offsetX: number, offsetY: number) => {
  const left = pageX - 365 - offsetX
  const top = pageY - 64 - offsetY
  const style = { left: left + 'px', top: top + 'px' }
  editStore.setComponentStyle(style)
}

const setLine = (direction: string, slotPosition: string, width: number, height: number) => {
  const style =  { width: width + 'px', height: height + 'px'}
  Object.assign(line, { direction, slotPosition, style })
}
const hideLine = () => {
  Object.assign(line, { direction: '', slotPosition: '', style: {} })
}
const shellStyle = (element: IElement) => {
  const { display = '' } = element.style
  return element.type === 'root' ? { margin: 0, height: '100%' } 
       : display.includes('inline') ? { display }
       : {}
}
const isPointerEvents = (element: IElement) => {
  const isAbsolutePos = element.style.position === 'absolute'
  const isContainer = element.type == 'container' || element.type === 'root'
  return isContainer || isAbsolutePos ? false : true
}
</script>

<style scoped lang="less">
.shell {
  margin: 1px;
  cursor: move;
}
.component {
  border: 1px dashed red;
}
.active {
  border: 1px solid #409eff;
}
.pointer-events {
  pointer-events: none;
}
.root-container {
  height: calc(100% - 2px);
}
</style>