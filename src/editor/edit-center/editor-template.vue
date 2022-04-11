<template>
  <div
    class="shell"
    :draggable="isDraggable(element.type)"
    :id="element.uuid"
    :key="element.uuid"
    v-for="element in elements"
    :style="shellStyle(element)"
    @click="click($event, element)"
    @mousedown="mousedown($event, element)"
    @dragstart="dragstart($event, element)"
    @dragend="dragend"
    @dragenter="dragenter($event, element)"
    @dragleave="dragleave"
    @dragover="dragover($event, element)"
    @drop="drop($event, element)"
  >
    <line-insert-placeholder
      v-if="targetElement.id === element.uuid && line.slotPosition === 'previous'"
      :style="line.style"
      :propConfig="{ direction: line.direction }"
    ></line-insert-placeholder>

    <component
      class="component"
      :class="componentClass(element)"
      :is="element.name"
      :uuid="element.uuid"
      :style="element.style"
      :modelValue="element.modelValue"
      :propConfig="element.propConfig"
      :childrens="element.childrens"
    >
      <editor-template v-if="element.childrens?.length" :elements="element.childrens" />
    </component>

    <line-insert-placeholder
      v-if="targetElement.id === element.uuid && line.slotPosition === 'next'"
      :style="line.style"
      :propConfig="{ direction: line.direction }"
    ></line-insert-placeholder>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { IElement } from '@/interface-type'
import { containers } from '@/mock-data';

const editStore = useEditStore()
defineProps<{
  elements: IElement[]
}>()

const elementOffset = reactive({ offsetX: 0, offsetY: 0 })
const line = reactive({ direction: '', slotPosition: '', style: {} })
const draggedElement = reactive({ id: '' })
const targetElement = reactive({ id: '', clientWidth: 0, clientHeight: 0, type: '' })
let insertSeat = ''
const inline = ref(false)

const click = (ev: MouseEvent, element: IElement) => {
  ev.stopPropagation()
  const id = (ev.currentTarget as Element).getAttribute('id')
  if (id !== element.uuid) return
}

const mousedown = (ev: MouseEvent, element: IElement) => {
  ev.stopPropagation()
  const id = (ev.currentTarget as Element).getAttribute('id')
  if (id !== element.uuid) return

  elementOffset.offsetX = ev.offsetX
  elementOffset.offsetY = ev.offsetY
  editStore.currentComponent = element
}

const dragstart = (ev: DragEvent, element: IElement) => {
  ev.stopPropagation()
  ev.dataTransfer?.clearData()
  const id = (ev.currentTarget as Element).getAttribute('id')
  if (id !== element.uuid) return

  const { offsetX, offsetY } = elementOffset
  const data = `${id},${offsetX},${offsetY}`
  Object.assign(draggedElement, { id })
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', data)
}

const dragend = (ev: DragEvent) => {}

const dragenter = (ev: DragEvent, element: IElement) => {
  ev.preventDefault()
  ev.stopPropagation()
  const id = (ev.currentTarget as Element).getAttribute('id')
  if (id !== element.uuid) return

  const { clientWidth, clientHeight } = (ev.currentTarget as Element)
  const isContainer = containers.includes(element.type)
  const { display = '', flexDirection } = element.style
  const parentNode = (<HTMLElement>ev.currentTarget).parentNode
  const pnDisplay = (<HTMLElement>parentNode).style.display
  const pnFlexDirection = (<HTMLElement>parentNode).style.flexDirection
  inline.value = (pnDisplay === 'flex' && (!pnFlexDirection || pnFlexDirection === 'row'))
  const isInline = display.includes('inline') || (display === 'flex' && flexDirection === 'row') || inline.value

  const type = isInline  && !isContainer ? 'inlineNoncontainer'
             : !isInline && !isContainer ? 'blockNoncontainer'
             : isInline  && isContainer  ? 'inlineContainer'
             : 'blockContainer'

  Object.assign(targetElement, { id, clientWidth, clientHeight, type })
}

const dragleave = () => hideLine()

const dragover = (ev: DragEvent, element: IElement) => {
  ev.preventDefault()
  ev.stopPropagation()
  const id = (ev.currentTarget as Element).getAttribute('id')
  if (id !== element.uuid) return

  const { offsetX, offsetY } = ev
  const { clientWidth, clientHeight, type } = targetElement
  if (element.type === 'root' || element.type === 'modal') {
    insertSeat = 'inside'
    hideLine()
    return
  }
  switch (type) {
    case 'inlineNoncontainer': {
      insertSeat = offsetX < (clientWidth / 2) ? 'previous' : 'next'
      setLine('vertical', insertSeat, 1, clientHeight)
      break
    }

    case 'blockNoncontainer': {
      insertSeat = offsetY < clientHeight / 2 ? 'previous' : 'next'
      setLine('horizontal', 'next', clientWidth, 1)
      break
    }

    case 'inlineContainer': {
      if (offsetX < 20) {
        insertSeat = 'previous'
        setLine('vertical', insertSeat, 1, clientHeight)
      } else if (offsetX > clientWidth - 20) {
        insertSeat = 'next'
        setLine('vertical', insertSeat, 1, clientHeight)
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
        setLine('horizontal', insertSeat, clientWidth, 1)
      } else if (offsetY > clientHeight - 20) {
        insertSeat = 'next'
        setLine('horizontal', insertSeat, clientWidth, 1)
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

const drop = (ev: DragEvent, element: IElement) => {
  hideLine()
  ev.preventDefault()
  ev.stopPropagation()
  const id = (ev.currentTarget as Element).getAttribute('id')
  if (id !== element.uuid) return

  const data = ev.dataTransfer!.getData('text/plain')
  const [uuidOrName, offsetX, offsetY] = data.split(',')
  if (data.includes('isNew')) {
    const name = uuidOrName
    editStore.addComponent(name)

  } else {
    const uuid = uuidOrName
    if (id === uuid) return
    editStore.setComponent(uuid)
    editStore.deleteComponent(uuid, false)
  }

  setComponentPosition(ev.pageX, ev.pageY, offsetX, offsetY)
  editStore.insertComponent(id, insertSeat)
}

const setComponentPosition = (pageX: number, pageY: number, offsetX: string, offsetY: string) => {
  if (editStore.currentComponent?.style?.position) {
    const left = pageX - 365 - Number(offsetX)
    const top = pageY - 64 - Number(offsetY)
    const style = { left: left + 'px', top: top + 'px' }
    editStore.setComponentStyle(style)
  }
}

const setLine = (direction: string, slotPosition: string, width: number, height: number) => {
  const style = { width: width + 'px', height: height + 'px', position: inline.value ? 'static' : 'absolute' }
  Object.assign(line, { direction, slotPosition, style })
}
const hideLine = () => {
  Object.assign(line, { direction: '', slotPosition: '', style: {} })
}

const isDraggable = (type: string) => {
  return type === 'root' || type === 'modal' ? false : true
}
const shellStyle = (element: IElement) => {
  if (inline.value) return { display:  'inline-flex' }
  const { display = '' } = element.style
  return element.type === 'root'    ? { margin: 0, height: '100%' } 
       : element.type === 'modal'   ? { margin: 0, width: 0 }
       : display.includes('inline') ? { display }
       : {}
}
const componentClass = (element: IElement) => {
  return {
    'pointer-none': isPointerNone(element),
    'root-container': element.type === 'root',
    'border-none': element.type === 'modal',
    'active': editStore.currentComponent?.uuid === element.uuid
  }
}
const isPointerNone = (element: IElement) => {
  const isAbsolutePos = element.style.position === 'absolute'
  const isContainer = containers.includes(element.type)
  return (isContainer || isAbsolutePos) ? false : true
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
.pointer-none {
  pointer-events: none;
}
.root-container {
  min-height: calc(100% - 2px) !important;
}
.border-none {
  border: none;
}
</style>
