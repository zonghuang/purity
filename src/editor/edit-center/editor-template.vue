<template>
  <template v-for="component in components" :key="component.uuid">
    <line-insert-placeholder
      v-if="insertPlaceholder.targetId === component.uuid && insertPlaceholder.placement === 'previous'"
      :direction="insertPlaceholder.direction"
      :style="insertPlaceholder.style"
    ></line-insert-placeholder>

    <component
      :id="component.uuid"
      :class="getClassNames(component)"
      :draggable="!['root', 'modal'].includes(component.type)"
      :is="component.name"
      :uuid="component.uuid"
      :style="component.style"
      :modelValue="component.modelValue"
      :property="component.property"
      @mousedown="mousedown($event, component)"
      @dragstart="dragstart($event, component)"
      @drag="drag($event, component)"
      @dragenter="dragenter($event, component)"
      @dragover="dragover($event, component)"
      @dragleave="dragleave($event, component)"
      @drop="drop($event, component)"
      @dragend="dragend($event, component)"
    >
      <editor-template v-if="component.children?.length" :components="component.children" />

      <template v-for="slot in component.slots" :key="slot.name" v-slot:[slot.name]>
        <render-template :components="slot.children" />
      </template>
    </component>

    <line-insert-placeholder
      v-if="insertPlaceholder.targetId === component.uuid && insertPlaceholder.placement === 'next'"
      :direction="insertPlaceholder.direction"
      :style="insertPlaceholder.style"
    ></line-insert-placeholder>
  </template>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/editor'
import { containers } from '../../../temp/mock-data'

defineProps<{
  components: Component[]
}>()

const editStore = useEditStore()

let insertSeat: InsertSeat = 'next'
const insertPlaceholder = reactive({ targetId: '', placement: '', direction: '', style: {} })

const mousedown = (ev: MouseEvent, component: Component) => {
  ev.stopPropagation()
  // if (!isCurrentTarget(ev, component)) return

  editStore.currentComponent = component
}

const dragstart = (ev: DragEvent, component: Component) => {
  ev.stopPropagation()
  ev.dataTransfer?.clearData()
  // if (!isCurrentTarget(ev, component)) return

  const data = { uuid: component.uuid, offsetX: ev.offsetX, offsetY: ev.offsetY }
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', JSON.stringify(data))
}

const drag = (ev: DragEvent, component: Component) => {}

const dragenter = (ev: DragEvent, component: Component) => {
  ev.preventDefault()
  // ev.stopPropagation()
  // if (!isCurrentTarget(ev, component)) return

  const target = ev.target as HTMLElement
  target.style.background = 'rgb(234, 242, 253)'
}

const dragover = (ev: DragEvent, component: Component) => {
  ev.preventDefault()
  // ev.stopPropagation()
  // if (!isCurrentTarget(ev, component)) return

  const { offsetX, offsetY, currentTarget } = ev
  const { clientWidth, clientHeight } = currentTarget as HTMLElement

  if (containers.includes(component.type)) {
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
    targetId: component.uuid,
    placement: insertSeat,
    direction: isInline ? 'vertical' : 'horizontal',
    style: {
      width: isInline ? 'initial' : (clientWidth + 'px'),
      height: isInline ? (clientHeight + 'px') : 'initial',
    }
  })
}

const dragleave = (ev: DragEvent, component: Component) => {
  const target = ev.target as HTMLElement
  target.style.background = ''
  Object.assign(insertPlaceholder, { targetId: '', placement: '', direction: '', style: {} })
}

const drop = (ev: DragEvent, component: Component) => {
  // ev.preventDefault()
  ev.stopPropagation()
  // if (!isCurrentTarget(ev, component)) return

  const targetId = component.uuid
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

const dragend = (ev: DragEvent, component: Component) => {}

const getClassNames = (component: Component) => {
  return {
    root: component.type === 'root',
    active: editStore.currentComponent?.uuid === component.uuid && component.type !== 'modal',
    'pointer-none': !containers.includes(component.type)
  }
}

const isCurrentTarget = (ev: MouseEvent | DragEvent, component: Component) => {
  const currentTarget = ev.currentTarget as HTMLElement
  return currentTarget.getAttribute('id') === component.uuid
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
