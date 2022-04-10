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
    @update:modelValue="handleUpdate($event, element)"
    @action="handleAction($event, element)"
  >
    <render-template v-if="element.childrens && element.childrens.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import qs from 'query-string'
import { useRenderStore } from '@/store/render'
import { IElement, IEvent, IAction, IEventParams, IParamValue } from '@/interface-type'

const route = useRoute()
const router = useRouter()
const renderStore = useRenderStore()
defineProps<{
  elements: IElement[]
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
  events.forEach(async item => {
    const {
      event, modalId, link, transferMode, aTarget, api, method, params, showLoading,
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
        if (link.charAt(0) === '/') {
          if (aTarget === '_self') {
            if (transferMode === 'params') {
              const chips = link.split('/')
              const smp = { system: chips[2], module: chips[3], page: chips[4] }
              Object.assign(routeParams, smp)
              router.push({ name: 'render', params: routeParams })
            } else {
              router.push({ path: link, query: routeParams })
            }
          } else {
            const fullLink = joinRouteParams(window.location.host + link, routeParams)
            window.open(fullLink, aTarget)
          }
        } else {
          const fullLink = joinRouteParams(link, routeParams)
          window.open(fullLink, aTarget)
        }

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'request':
        const payload = getValue('object', toRaw(item.params))

        // 临时 start（为了兼容现在 sso 的分页和查询条件格式化）
        if (payload.reportCode && payload.pagination) {
          const { currentPage, pageSize } = payload.pagination
          payload.pageNo = currentPage
          payload.pageSize = pageSize
          delete payload.pagination

          // 过滤掉对象中的 '' undefined null {} []
          const obj = { ...payload.queryParams }
          const queryParams: any = Object.keys(obj)
            .filter(
              (key) =>
                obj[key] !== '' &&
                obj[key] !== null &&
                obj[key] !== undefined &&
                JSON.stringify(obj[key]) !== '{}' &&
                JSON.stringify(obj[key]) !== '[]'
            )
            .reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
          payload.queryParams = queryParams
        }
        // 临时 end


        console.log('正在请求数据, 访问 api: ', api, '请求方式: ', method, '请求参数: ', payload)
        console.time('request')
        const responseData = await renderStore.getData(api, method, payload, showLoading)
        console.log('正在请求数据完成了，花费时间：')
        console.timeEnd('request')
        console.log('响应数据', responseData)

        // 赋值给组件
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
        break;

      case 'setValue':
        if (assignmentType === 'another') {
          sourceToTarget?.forEach(one => {
            const value = getRealvalue(one.source)
            const target = renderStore.findTarget(renderStore.currentPage.elements, one.target)
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

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'resetValue':
        if (valueToComp) {
          const target = renderStore.findTarget(renderStore.currentPage.elements, valueToComp)
          const value = toRaw(renderStore.cacheData[valueToComp]?.originData)
          target && handleUpdate(value, target.config)
        }

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      default:
        break;
    }
  })
}

const joinRouteParams = (url: string = '', params: IEventParams[] = []) => {
  const routeParams = qs.stringify(params)
  const urlObj = new URL(url)
  urlObj.search += urlObj.search.startsWith('?') ? '&' : '?' + routeParams
  return urlObj.href
}

const getValue = (formatType: string, params: any[] = []) => {
  const arr: IParamValue[] = []
  params.forEach(item => {
    const { type, key, value } = item

    switch (type) {
      case 'input-keyValue':
        arr.push({ key, value })
        break;

      case 'inputKey-selectValue':
        const realvalue = getRealvalue(value)
        arr.push({ key, value: realvalue })
        break;

      case 'select-keyValue':
        const realKey = getRealkey(value)
        if (value === 'routeParams') {
          for (const [k, v] of Object.entries(route.params)) {
            arr.push({ key: k, value: v })
          }
        } else {
          const realvalue = getRealvalue(value)
          arr.push({ key: realKey, value: realvalue })
        }
        break;

      case 'inputKey-selectValueKey':
        const obj = getRealvalue(value)
        arr.push({ key, value: obj[item.valueKey] })
        break;

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

const getRealkey = (value: string = '') => {
  if (value.includes('currentRow')) {
    return 'currentRow'
  }

  if (value.includes('selectedRows')) {
    return 'selectedRows'
  }

  if (value.includes('rowKey')) {
    const tableId = value.replace('rowKey', '')
    const target = renderStore.findTarget(renderStore.currentPage.elements, tableId)
    return target?.config.propConfig.primaryKey
  }

  if (value.includes('rowsKey')) {
    const tableId = value.replace('rowsKey', '')
    const target = renderStore.findTarget(renderStore.currentPage.elements, tableId)
    return target?.config.propConfig.primaryKey
  }

  // 以上都不成立，则是取组件的值（此时参数 value 为组件的 field）
  const target = renderStore.findTarget(renderStore.currentPage.elements, value)
  return target?.config.propConfig.field
}

const getRealvalue = (value: string = '') => {
  if (value === 'routeQuery') {
    return route.query
  }

  if (value === 'routeParams') {
    return route.params
  }

  if (value.includes('currentRow')) {
    const tableId = value.replace('currentRow', '')
    const currentRow = renderStore.cacheData[tableId]?.currentRow
    return toRaw(currentRow)
  }

  if (value.includes('selectedRows')) {
    const tableId = value.replace('selectedRows', '')
    const selectedRows = renderStore.cacheData[tableId]?.selectedRows
    return toRaw(selectedRows)
  }

  if (value.includes('rowKey')) {
    const tableId = value.replace('rowKey', '')
    const rowKey = renderStore.cacheData[tableId]?.rowKey
    return toRaw(rowKey)
  }

  if (value.includes('rowsKey')) {
    const tableId = value.replace('rowsKey', '')
    const rowsKey = renderStore.cacheData[tableId]?.rowsKey
    return toRaw(rowsKey)
  }

  // 以上都不成立，则是取组件的值（此时参数 value 为组件的 uuid）
  const target = renderStore.findTarget(renderStore.currentPage.elements, value)
  return toRaw(target?.config.modelValue)
}
</script>
