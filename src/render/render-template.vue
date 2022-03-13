<template>
  <component
    v-for="element in elements"
    :key="element.uuid"
    :is="element.name"
    :uuid="element.uuid"
    :style="element.style"
    :events="element.events"
    :propValue="element.propValue"
    :propConfig="element.propConfig"
    @update="handleUpdate"
    @action="handleAction"
    @click="handleClick($event, element)"
  >
    <render-template v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import { IElement } from '@/interface-type'
import { useEditStore } from '@/store/edit';

const editStore = useEditStore()
const props = defineProps<{
  elements: IElement[],
}>()

function handleUpdate() {
  console.log('update')
}

function handleAction() {
  console.log('action')
}

function handleClick(ev: MouseEvent, element: IElement) {
  console.log('click', element)

  // 临时的，用来测试事件
  const id = (ev.currentTarget as Element).getAttribute('uuid')
  if (id !== element.uuid) return
  if (element.name === 'zh-button') {
    console.log(element.name, element);
    handleEvents(element.events)
  }
}


const handleEvents = (events: any) => {
  events?.forEach((item: any) => {
    if (item.command === 'openModal') {
      editStore.openModal(item.modalId)
    } else if (item.command === 'closeModal') {
      editStore.closeModal(item.modalId)
    } else if (item.command === 'request') {
      console.log('正在请求数据, 访问 api: ', item.api);
      console.time('request')
      setTimeout(() => {
        console.log('正在请求数据完成了，花费时间：');
        console.timeEnd('request')
      }, 2000);
    } else if (item.command === 'link') {
      console.log('跳转链接: ', item.link);
    }

    // 这里还有暂停下来，判断前面的是执行完了才执行 thenEvents，这里假设执行完了
    setTimeout(() => {
      if (item.thenEvents) {
        handleEvents(item.thenEvents)
      }
    }, 3000);
  })
}
</script>