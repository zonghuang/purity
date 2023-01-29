<template>
  <template v-for="element in components" :key="element.uuid">
    <line-insert-placeholder
      v-if="insertPlaceholder.targetId === element.uuid && insertPlaceholder.placement === 'previous'"
      :direction="insertPlaceholder.direction"
      :style="insertPlaceholder.style"
    ></line-insert-placeholder>

    <component
      :id="element.uuid"
      :class="getClassNames(element)"
      :draggable="!['root', 'modal'].includes(element.type)"
      :is="element.name"
      :uuid="element.uuid"
      :style="element.style"
      :modelValue="element.modelValue"
      :property="element.property"
      :children="element.children"
      @mousedown="mousedown($event, element)"
      @dragstart="dragstart($event, element)"
      @drag="drag($event, element)"
      @dragenter="dragenter($event, element)"
      @dragover="dragover($event, element)"
      @dragleave="dragleave($event, element)"
      @drop="drop($event, element)"
      @dragend="dragend($event, element)"
    >
      <editor-template v-if="element.children?.length" :components="element.children" />

      <template v-for="slot in element.slots" :key="slot.name" v-slot:[slot.name]>
        <render-template :components="slot.children" />
      </template>
    </component>

    <line-insert-placeholder
      v-if="insertPlaceholder.targetId === element.uuid && insertPlaceholder.placement === 'next'"
      :direction="insertPlaceholder.direction"
      :style="insertPlaceholder.style"
    ></line-insert-placeholder>
  </template>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/editor'
import { containers } from '@/mock-data'

defineProps<{
  components: Component[]
}>()

const editStore = useEditStore()

let insertSeat: InsertSeat = 'next'
const insertPlaceholder = reactive({ targetId: '', placement: '', direction: '', style: {} })

const mousedown = (ev: MouseEvent, element: Component) => {
  ev.stopPropagation()
  // if (!isCurrentTarget(ev, element)) return

  editStore.currentComponent = element
}

const dragstart = (ev: DragEvent, element: Component) => {
  ev.stopPropagation()
  ev.dataTransfer?.clearData()
  // if (!isCurrentTarget(ev, element)) return

  const data = { uuid: element.uuid, offsetX: ev.offsetX, offsetY: ev.offsetY }
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', JSON.stringify(data))
}

const drag = (ev: DragEvent, element: Component) => {}

const dragenter = (ev: DragEvent, element: Component) => {
  ev.preventDefault()
  // ev.stopPropagation()
  // if (!isCurrentTarget(ev, element)) return

  const target = ev.target as HTMLElement
  target.style.background = 'rgb(234, 242, 253)'
}

const dragover = (ev: DragEvent, element: Component) => {
  ev.preventDefault()
  // ev.stopPropagation()
  // if (!isCurrentTarget(ev, element)) return

  const { offsetX, offsetY, currentTarget } = ev
  const { clientWidth, clientHeight } = currentTarget as HTMLElement

  if (containers.includes(element.type)) {
    insertSeat = 'inside'
    return
  }

  const isInline = isInlineBox(currentTarget as HTMLElement)
  if (isInline) {
    insertSeat = offsetX < (clientWidth / 2) ? 'previous' : 'next'
  } else {
    insertSeat = offsetY < (clientHeight / 2) ? 'previous' : 'next'
  }

  Object.assign(insertPlaceholder, {
    targetId: element.uuid,
    placement: insertSeat,
    direction: isInline ? 'vertical' : 'horizontal',
    style: {
      width: isInline ? 'initial' : (clientWidth + 'px'),
      height: isInline ? (clientHeight + 'px') : 'initial',
    }
  })
}

const dragleave = (ev: DragEvent, element: Component) => {
  const target = ev.target as HTMLElement
  target.style.background = ''
  Object.assign(insertPlaceholder, { targetId: '', placement: '', direction: '', style: {} })
}

const drop = (ev: DragEvent, element: Component) => {
  // ev.preventDefault()
  ev.stopPropagation()
  // if (!isCurrentTarget(ev, element)) return

  const targetId = element.uuid
  const target = ev.target as HTMLElement
  target.style.background = ''
  Object.assign(insertPlaceholder, { targetId: '', placement: '', direction: '', style: {} })

  const data = ev.dataTransfer!.getData('text/plain')
  const { uuid, name, offsetX, offsetY } = JSON.parse(data)

  if (uuid === targetId) return
  if (name) {
    editStore.addComponent(name)
  } else {
    editStore.setComponent(uuid)
    editStore.deleteComponent(uuid, false)
  }

  if (editStore.currentComponent?.style?.position) {
    const left = ev.pageX - 398 - offsetX
    const top = ev.pageY - 65 - offsetY
    const style = { left: left + 'px', top: top + 'px' }
    editStore.setComponentStyle(style)
  }

  if (editStore.currentComponent){
    editStore.insertComponent(targetId, insertSeat)
  }
}

const dragend = (ev: DragEvent, element: Component) => {}

const getClassNames = (element: Component) => {
  return {
    root: element.type === 'root',
    active: editStore.currentComponent?.uuid === element.uuid && element.type !== 'modal',
    'pointer-none': !containers.includes(element.type)
  }
}

const isCurrentTarget = (ev: MouseEvent | DragEvent, element: Component) => {
  const currentTarget = ev.currentTarget as HTMLElement
  return currentTarget.getAttribute('id') === element.uuid
}

const isInlineBox = (currentTarget: HTMLElement) => {
  const display = currentTarget.style.display
  const parentNode = currentTarget.parentNode
  const parentNodeDisplay = (parentNode as HTMLElement).style.display
  const parentNodeFlexDirection = (parentNode as HTMLElement).style.flexDirection
  const parentNodeIsInlineBox = ['flex'].includes(parentNodeDisplay) && parentNodeFlexDirection === 'row'
  return ['inline', 'inline-block', 'inline-flex'].includes(display) || parentNodeIsInlineBox
}
</script>

<style scoped lang="less">
.root {
  min-height: 100% !important;
  box-sizing: border-box;
}
.active {
  cursor: move;
  border: 1px solid #409eff;
  box-sizing: border-box;
}
</style>
