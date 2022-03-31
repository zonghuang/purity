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
import { IElement, IEvent, IAction, IEventParams, IParamValue } from '@/interface-type'
import { tableData, resData } from '@/mock/app-manage';
import { useRenderStore } from '@/store/render'
import qs from 'query-string'

const route = useRoute()
const renderStore = useRenderStore()
const props = defineProps<{
  elements: IElement[],
}>()

function handleUpdate(value: any, element: IElement) {
  console.log('update', value, element)

  if (element.type === 'pagination') {
    element.propConfig.total = value
    return
  }
  
  element.modelValue = value

  if (element.type === 'form' && element.childrens?.length) {
    element.childrens.forEach(item => {
      if (element.modelValue.hasOwnProperty(item.propConfig.field)) {
        item.modelValue = element.modelValue[item.propConfig.field]
      }
    })
  }
}

function handleAction(ev: IAction, element: IElement) {
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
    const {
      event, modalId, link, aTarget, api, method, params,
      assignmentType, valueToComps, sourceToTarget, valueToComp, thenEvents
    } = item
    switch (event) {
      case 'openModal':
        renderStore.openModal(modalId)
        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'closeModal':
        renderStore.closeModal(modalId)
        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'link':
        const routeParams = getValue('object', toRaw(params))
        console.log('正在跳转链接: ', link, '打开方式: ', aTarget, '携带路由参数', routeParams)
        const fullLink = joinRouteParams(link, routeParams)
        window.open(fullLink, aTarget)
        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'request':
        const payload = getValue('object', toRaw(item.params))
        console.log('正在请求数据, 访问 api: ', api, '请求方式: ', method, '请求参数: ', payload)
        console.time('request')
        setTimeout(() => {
          // const responseData = tableData
          const responseData: any = resData
          // const responseData: any = { lastname: 'zonghaung', firstname: 'li' }
          console.log('正在请求数据完成了，花费时间：')
          console.timeEnd('request')
          console.log('响应数据', responseData)

          // 模拟请求到数据，赋值给组件
          if (assignmentType === 'single') {
            const target = renderStore.findTarget(renderStore.currentPage.elements, valueToComp)
            target && handleUpdate(responseData, target.config)
          } else if (assignmentType === 'multiple') {
            valueToComps?.forEach(one => {
              const target = renderStore.findTarget(renderStore.currentPage.elements, one.target)
              const value = responseData[one.source]
              target && handleUpdate(value, target.config)
            })
          } else if (assignmentType === 'options') {
            const target = renderStore.findTarget(renderStore.currentPage.elements, valueToComp)
            target!.config.propConfig.options = responseData
          }

          if (thenEvents?.length) handleEvents(thenEvents)
        }, 150);
        break;

      case 'setValue':
        if (assignmentType === 'another') {
          sourceToTarget?.forEach(one => {
            const source = renderStore.findTarget(renderStore.currentPage.elements, one.source)
            const target = renderStore.findTarget(renderStore.currentPage.elements, one.target)
            const value = source?.config.modelValue
            target && handleUpdate(value, target.config)
          })
        } else if (assignmentType === 'object') {
          const value = getValue('object', toRaw(params))
          const target = renderStore.findTarget(renderStore.currentPage.elements, valueToComp)
          target && handleUpdate(value, target.config)
        } else if (assignmentType === 'array') {
          const value = getValue('array', toRaw(params))
          const target = renderStore.findTarget(renderStore.currentPage.elements, valueToComp)
          target && handleUpdate(value, target.config)
        }
        break;

      case 'resetValue':
        if (valueToComp) {
          const target = renderStore.findTarget(renderStore.currentPage.elements, valueToComp)
          const value = toRaw(renderStore.cacheData[valueToComp]?.originData)
          target && handleUpdate(value, target.config)
        }
        break;
    
      default:
        break;
    }
  })
}

const getValue = (formatType: string, params: IEventParams[] = []) => {
  const arr: IParamValue[] = []
  params.forEach(item => {
    const { type, key, value } = item
    
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
        const v = renderStore.cacheData[tableId]?.currentRow
        arr.push({ key, value: toRaw(v) })
        break;
      }
      case 5: {
        const tableId = value.replace('selectedRows', '')
        const v = renderStore.cacheData[tableId]?.selectedRows
        arr.push({ key, value: toRaw(v) })
        break;
      }
      case 6: {
        const tableId = value.replace('rowKey', '')
        const v = renderStore.cacheData[tableId]?.rowKey
        const primaryKey = renderStore.cacheData[tableId]?.primaryKey
        arr.push({ key: key ?? primaryKey, value: toRaw(v) })
        break;
      }
      case 7: {
        const tableId = value.replace('rowsKey', '')
        const v = renderStore.cacheData[tableId]?.rowsKey
        const primaryKey = renderStore.cacheData[tableId]?.primaryKey
        arr.push({ key: key ?? primaryKey, value: toRaw(v) })
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
        arr.push({ key, value: toRaw(v) })
        break;
      }
      case 10: {
        const componentId = value
        const target = renderStore.findTarget(renderStore.currentPage.elements, componentId)
        const k = target?.config.propConfig.field
        const v = target?.config.modelValue
        arr.push({ key: k, value: toRaw(v) })
        break;
      }

      default:
        break;
    }
  })

  let result: any = null
  if (formatType === 'object') {
    result = {}
    arr.forEach(item => result[item.key] = item.value)
  } else if (formatType === 'array') {
    result = []
    arr.forEach(item => result.push(item.value))
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
