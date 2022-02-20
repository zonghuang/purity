<template>
  <div
    class="shell"
    draggable=true
    :id="element.uuid"
    :key="element.uuid"
    v-for="element in elements"
    :style="shellStyle(element)"
    :isContainer="element.childrens ? true : false"
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
      :class="{ 'pointer-events': element.type !== 'container' }"
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
import { IElement } from '../interface'
import { useStore } from 'vuex'
import { key } from '../store'
import { reactive } from 'vue'

const store = useStore(key)

const props = defineProps<{
  elements: IElement[]
}>()

const draggedElement = reactive({ id: '', offsetX: 0, offsetY: 0 })
const targetElement = reactive({ id: '', clientWidth: 0, clientHeight: 0, type: '' })
const line = reactive({ direction: '', slotPosition: '', style: {} })

const dragstart = (ev: DragEvent) => {
  ev.stopPropagation()
  const { currentTarget, offsetX, offsetY } = ev
  const id = currentTarget.getAttribute('id')
  Object.assign(draggedElement, { id, offsetX, offsetY } )
  ev.effectAllowed = 'copyMove'
  ev.dataTransfer.setData('text/plain', id)
}

const dragend = (ev: DragEvent) => {
  hideLine()
  ev.dataTransfer.clearData()
}

const dragenter = (ev: DragEvent, element: IElement) => {
  ev.preventDefault()
  ev.stopPropagation()

  if (ev.currentTarget.getAttribute('id') === draggedElement.id) {
    targetElement.id = ''
    hideLine()
    return
  }

  const { currentTarget, currentTarget: { clientWidth, clientHeight } } = ev
  const id = currentTarget.getAttribute('id')
  const isContainer = element.type === 'container'
  const { display = '', flexDirection } = element.style
  const isInline = display.includes('inline') || (display === 'flex' && flexDirection === 'row')
  
  const type = isInline  && !isContainer ? 'inlineNoncontainer'
             : !isInline && !isContainer ? 'blockNoncontainer'
             : isInline  && isContainer  ? 'inlineContainer'
             : 'blockContainer'

  Object.assign(targetElement, { id, clientWidth, clientHeight, type })
}

const dragleave = (ev: DragEvent) => {
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
        setLine('vertical', 'previous', 1, clientHeight)
        // console.log('previous -> left')
      } else {
        setLine('vertical', 'next', 1, clientHeight)
        // console.log('next -> right')
      }
      break
    }
    
    case 'blockNoncontainer': {
      if (offsetY < clientHeight / 2) {
        setLine('horizontal', 'previous', clientWidth, 1)
        // console.log('previous -> up')
      } else {
        setLine('horizontal', 'next', clientWidth, 1)
        // console.log('next -> down')
      }
      break
    }
    
    case 'inlineContainer': {
      if (offsetX < 20) {
        setLine('vertical', 'previous', 1, clientHeight)
        // console.log('previous -> left')
      } else if (offsetX > clientWidth - 20) {
        setLine('vertical', 'next', 1, clientHeight)
        // console.log('next -> right')
      } else {
        hideLine()
        // console.log('children -> center')
      }
      break
    }
    
    case 'blockContainer': {
      line.style = { width: clientWidth + 'px', height: '1px' }
      if (offsetY < 20) {
        setLine('horizontal', 'previous', clientWidth, 1)
        // console.log('previous -> up')
      } else if (offsetY > clientHeight - 20) {
        setLine('horizontal', 'next', clientWidth, 1)
        // console.log('next -> down')
      } else {
        hideLine()
        // console.log('children -> center')
      }
      break
    }
  
    default:
      break;
  }
}

const drop = (ev: DragEvent) => {
  ev.preventDefault()
  ev.stopPropagation()
  hideLine()
}

const setLine = (direction: string, slotPosition: string, width: number, height: number) => {
  Object.assign(line, {
    direction,
    slotPosition,
    style: { width: width + 'px', height: height + 'px'}
  })
}
const hideLine = () => {
  Object.assign(line, { direction: '', slotPosition: '', style: {} })
}
const shellStyle = (element: IElement) => {
  return { display: element.style.display }
}
</script>

<style scoped lang="less">
.pointer-events {
  pointer-events: none;
}
.shell {
  cursor: move;
  margin: 1px;
}

.component {
  border: 1px dashed red;
}
</style>