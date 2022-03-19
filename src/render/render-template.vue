<template>
  <component
    v-for="element in elements"
    :key="element.uuid"
    :is="element.name"
    :uuid="element.uuid"
    :style="element.style"
    :events="element.events"
    :modelValue="element.modelValue"
    :propConfig="element.propConfig"
    :childrens="element.childrens"
    @update="handleUpdate($event, element)"
    @action="handleAction($event, element)"
  >
    <render-template v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import { IElement, IEvent } from '@/interface-type'
import { useRenderStore } from '@/store/render';

const renderStore = useRenderStore()
const props = defineProps<{
  elements: IElement[],
}>()

function handleUpdate(value: any, element: IElement) {
  console.log('update', element)
  element.modelValue = value
  if (element.type === 'form' && element.childrens?.length) {
    element.childrens.forEach(item => {
      if (element.modelValue.hasOwnProperty(item.propConfig.field)) {
        item.modelValue = element.modelValue[item.propConfig.field]
        console.log(item);
      }
    })
  }

  const events = element.events.filter(item => item.userAction === 'update')
  events && handleEvents(events)
}

function handleAction(command: string, element: IElement) {
  console.log('action: ', command, element)
  const events = element.events.filter(item => item.userAction === command)
  events && handleEvents(events)
}

// 事件临时处理，后续完善
const handleEvents = (events: IEvent[]) => {
  events.forEach(item => {
    if (item.command === 'openModal') {
      item.modalId && renderStore.openModal(item.modalId)
    } else if (item.command === 'closeModal') {
      item.modalId && renderStore.closeModal(item.modalId)
    } else if (item.command === 'request') {
      console.log('正在请求数据, 访问 api: ', item.api, '请求方式: ', item.method, '请求参数: ', toRaw(item.params));
      console.time('request')
      setTimeout(() => {
        const responseData = { lastname: 'zonghaung', firstname: 'li' }
        console.log('正在请求数据完成了，花费时间：');
        console.timeEnd('request')
        console.log('响应数据', responseData);
        

        // 模拟请求到数据，赋值给 formData
        if (item.resDataToComp) {
          const target = renderStore.findTarget(renderStore.currentPage.elements, item.resDataToComp)
          target && handleUpdate(responseData, target.config)
        }
      }, 1500);
    } else if (item.command === 'link') {
      console.log('正在跳转链接: ', item.link, '打开方式: ', item.aTarget);
      setTimeout(() => {
        window.open(item.link, item.aTarget)
      }, 1000);
    } else if (item.command === 'update') {

    }

    // 这里还有暂停下来，判断前面的是执行完了才执行 thenEvents，这里假设执行完了
    setTimeout(() => {
      if (item.thenEvents) {
        handleEvents(item.thenEvents)
      }
    }, 2000);
  })
}


// 查找目标组件

</script>