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
import { IElement, IEvent } from '@/interface-type'
import router from '@/router';
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
  const id = (ev.currentTarget as Element).getAttribute('uuid')
  if (id !== element.uuid) return
  const events = element.events.filter(item => item.userAction === 'click')  
  handleEvents(events)
}

// 事件临时处理，后续完善
const handleEvents = (events: IEvent[]) => {
  events.forEach(item => {
    if (item.command === 'openModal') {
      item.modalId && editStore.openModal(item.modalId)
    } else if (item.command === 'closeModal') {
      item.modalId && editStore.closeModal(item.modalId)
    } else if (item.command === 'request') {
      console.log('正在请求数据, 访问 api: ', item.api, '请求方式: ', item.method, '请求参数: ', item.params);
      console.time('request')
      setTimeout(() => {
        console.log('正在请求数据完成了，花费时间：');
        console.timeEnd('request')
      }, 1500);
    } else if (item.command === 'link') {
      console.log('正在跳转链接: ', item.link, '打开方式: ', item.aTarget);
      setTimeout(() => {
        window.open(item.link, item.aTarget)
      }, 1000);
    }

    // 这里还有暂停下来，判断前面的是执行完了才执行 thenEvents，这里假设执行完了
    setTimeout(() => {
      if (item.thenEvents) {
        handleEvents(item.thenEvents)
      }
    }, 2000);
  })
}
</script>