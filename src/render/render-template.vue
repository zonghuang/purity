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
import { useRenderStore } from '@/store/render'
import qs from 'query-string'

const route = useRoute()
const renderStore = useRenderStore()
const props = defineProps<{
  elements: IElement[],
}>()

function handleUpdate(value: any, element: IElement) {
  console.log('update', value, element)
  element.modelValue = value
  if (element.type === 'form' && element.childrens?.length) {
    element.childrens.forEach(item => {
      if (element.modelValue.hasOwnProperty(item.propConfig.field)) {
        item.modelValue = element.modelValue[item.propConfig.field]
      }
    })
  }

  const events = element.events.filter(item => item.userAction === 'update')
  events && handleEvents(events)
}

function handleAction(ev: any, element: IElement) {
  console.log('action: ', ev.userAction, toRaw(element))
  const events = element.events.filter(item => item.userAction === ev.userAction)
  if (ev.bindCode) {
    const bindCodeEvents = events.filter(item => item.bindCode === ev.bindCode)
    bindCodeEvents && handleEvents(bindCodeEvents)
  } else {
    events && handleEvents(events)
  }
}

const handleEvents = (events: IEvent[]) => {
  events.forEach(item => {
    switch (item.command) {
      case 'openModal':
        item.modalId && renderStore.openModal(item.modalId)
        if (item.thenEvents) handleEvents(item.thenEvents)
        break;

      case 'openModal':
        item.modalId && renderStore.closeModal(item.modalId)
        if (item.thenEvents) handleEvents(item.thenEvents)
        break;

      case 'link':
        const routeParams = getValue('object', toRaw(item.params))
        console.log('正在跳转链接: ', item.link, '打开方式: ', item.aTarget, '携带路由参数', routeParams);
        const link = joinRouteParams(item.link, routeParams)
        window.open(link, item.aTarget)
        if (item.thenEvents) handleEvents(item.thenEvents)
        break;

      case 'request':
        const params = getValue('object', toRaw(item.params))
        console.log('正在请求数据, 访问 api: ', item.api, '请求方式: ', item.method, '请求参数: ', params);
        console.time('request')
        setTimeout(() => {
          const responseData: any = { lastname: 'zonghaung', firstname: 'li' }
          console.log('正在请求数据完成了，花费时间：');
          console.timeEnd('request')
          console.log('响应数据', responseData);

          // 模拟请求到数据，赋值给组件
          if (item.singleAssignment && item.valueToComp) {
            const target = renderStore.findTarget(renderStore.currentPage.elements, item.valueToComp)
            target && handleUpdate(responseData, target.config)
          } else if (item.valueToComps?.length) {
            item.valueToComps.forEach(one => {
              const target = renderStore.findTarget(renderStore.currentPage.elements, one.target)
              const value = responseData[one.source]
              target && handleUpdate(value, target.config)
            })
          }

          if (item.thenEvents) handleEvents(item.thenEvents)
        }, 150);
        break;

      case 'setValue':
        if (item.assignmentType === '1') {
          item.sourceToTarget?.forEach(one => {
            const source = renderStore.findTarget(renderStore.currentPage.elements, one.source)
            const target = renderStore.findTarget(renderStore.currentPage.elements, one.target)
            const value = source?.config.modelValue
            target && handleUpdate(value, target.config)
          })
        } else if (item.assignmentType === '2') {
          const value = getValue('object', toRaw(item.params))
          const target = renderStore.findTarget(renderStore.currentPage.elements, item.valueToComp)
          target && handleUpdate(value, target.config)
        } else if (item.assignmentType === '3') {
          const value = getValue('array', toRaw(item.params))
          const target = renderStore.findTarget(renderStore.currentPage.elements, item.valueToComp)
          target && handleUpdate(value, target.config)
        }
        break;

      case 'resetValue':
        if (item.resetComponent) {
          const uuid = item.resetComponent
          const target = renderStore.findTarget(renderStore.currentPage.elements, uuid)
          const value = toRaw(renderStore.tempData[uuid]?.originData)
          target && handleUpdate(value, target.config)
        }
        break;
    
      default:
        break;
    }
  })
}

const getValue = (formatType: string, params: any[] = []) => {
  const arr: any = []
  params.forEach((item: any) => {
    const type = item.type
    const key = item.key
    const value = item.value
    
    /**
     * 路由参数
     * 1  { key: key, value: route.params[key] }
     * 2  { key: key, value: route.params }
     * 3  解构路由参数
     * 
     * 表格当前行、多选行、当前行主键、多选行主键
     * 4  { key: key, value: currentRow }
     * 5  { key: key, value: selectedRows }
     * 6  { key: key, value: rowKey }
     * 7  { key: key, value: rowsKey }
     * 
     * 其他情况
     * 8  { key: key, value: value }
     * 9  { key: key, value: component.modelValue }
     * 10 { key: component.field, value: component.modelValue }
     */
    const condition = type === 'inputKey-inputRouteKey' ? 1
                    : type === 'inputKey-selectValue' && value === 'routeParams' ? 2
                    : type === 'select-keyValue' && value === 'routeParams' ? 3
                    : value?.includes('currentRow') ? 4
                    : value?.includes('selectedRows') ? 5
                    : value?.includes('rowKey') ? 6
                    : value?.includes('rowsKey') ? 7
                    : type === 'input-keyValue' ? 8
                    : type === 'inputKey-selectValue' ? 9
                    : type === 'select-keyValue' ? 10
                    : -1

    switch (condition) {
      case 1: {
        arr.push({ key, value: route.params[key] })
        break;
      }
      case 2: {
        arr.push({ key, value: route.params })
        break;
      }
      case 3: {
        for (const [k, v] of Object.entries(route.params)) {
          arr.push({ key: k, value: v })
        }
        break;
      }

      case 4: {
        const tableId = value.replace('currentRow', '')
        const v = renderStore.tempData[tableId]?.currentRow
        arr.push({ key, value: toRaw(v) })
        break;
      }
      case 5: {
        const tableId = value.replace('selectedRows', '')
        const v = renderStore.tempData[tableId]?.selectedRows
        arr.push({ key, value: toRaw(v) })
        break;
      }
      case 6: {
        const tableId = value.replace('rowKey', '')
        const v = renderStore.tempData[tableId]?.rowKey
        arr.push({ key, value: toRaw(v) })
        break;
      }
      case 7: {
        const tableId = value.replace('rowsKey', '')
        const v = renderStore.tempData[tableId]?.rowsKey
        arr.push({ key, value: toRaw(v) })
        break;
      }

      case 8: {
        arr.push({ key, value })
        break;
      }
      case 9: {
        const componentId = value
        const target = renderStore.findTarget(renderStore.currentPage.elements, componentId)
        const v = target?.config.modelValue
        arr.push({ key, value: v })
        break;
      }
      case 10: {
        const componentId = item.keyValue
        const target = renderStore.findTarget(renderStore.currentPage.elements, componentId)
        const k = target?.config.propConfig.field
        const v = target?.config.modelValue
        arr.push({ key: k, value: v })
        break;
      }

      default:
        break;
    }
  })

  let result = null
  if (formatType === 'object') {
    result = {}
    arr.forEach((item: any) => result[item.key] = item.value)
  } else if (formatType === 'array') {
    result = []
    arr.forEach((item: any) => result.push(item.value))
  }

  return result
}

const joinRouteParams = (url: string = '', params: any) => {
  const routeParams = qs.stringify(params)
  const urlObj = new URL(url)
  urlObj.search += urlObj.search.startsWith('?') ? '&' : '?' + routeParams
  return urlObj.href
}

</script>
