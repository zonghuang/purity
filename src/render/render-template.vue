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
    <render-template v-if="element.childrens?.length" :elements="element.childrens" />
  </component>
</template>

<script setup lang="ts">
import qs from 'query-string'
import { useRenderStore } from '@/store/render'
import { IElement, IEvent, IAction } from '@/interface-type'

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
    const { event, option, thenEvents } = item
    const { modalId, url, window: linkWindow, transferMode, params, api, method, loading, assign, target, targets } = option
    switch (event) {
      case 'openModal':
        renderStore.openModal(modalId!)
        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'closeModal':
        renderStore.closeModal(modalId!)
        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'link':
        const routeParams = getValue(toRaw(params))
        console.log('正在跳转链接: ', url, '打开方式: ', linkWindow, '携带路由参数', routeParams)
        if (url!.charAt(0) === '/') {
          if (linkWindow === '_self') {
            if (transferMode === 'params') {
              const chips = url!.split('/')
              const smp = { system: chips[2], module: chips[3], page: chips[4] }
              Object.assign(routeParams, smp)
              router.push({ name: 'render', params: routeParams })
            } else {
              router.push({ path: url, query: routeParams })
            }
          } else {
            const fullUrl = joinRouteParams(window.location.host + url, routeParams)
            window.open(fullUrl, linkWindow)
          }
        } else {
          const fullUrl = joinRouteParams(url, routeParams)
          window.open(fullUrl, linkWindow)
        }

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'request':
        const payload = getValue(toRaw(params))

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
        const responseData = await renderStore.getData(api!, method!, payload, loading)
        console.log('正在请求数据完成了，花费时间：')
        console.timeEnd('request')
        console.log('响应数据', responseData)

        // 赋值给组件
        if (assign === 'component') {
          const component = renderStore.findComponent(renderStore.currentPage.elements, target)
          component && handleUpdate(responseData, component.config)
        } else if (assign === 'componentOptions') {
          const component = renderStore.findComponent(renderStore.currentPage.elements, target)
          component!.config.propConfig.options = responseData
        } else if (assign === 'components') {
          targets?.forEach(one => {
            const component = renderStore.findComponent(renderStore.currentPage.elements, one.target)
            component && handleUpdate(responseData[one.source], component.config)
          })
        } else if (assign === 'cacheData') {
          targets?.forEach(one => {
            renderStore.cacheData[one.source] = responseData[one.source]
          })
        }

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'set':
        let val = getValue(toRaw(params))
        if (params?.length === 1 && !params[0]?.key) val = Object.values(val)[0]

        if (assign === 'component') {
          const component = renderStore.findComponent(renderStore.currentPage.elements, target)
          component && handleUpdate(val, component.config)
        } else if (assign === 'componentOptions') {
          const component = renderStore.findComponent(renderStore.currentPage.elements, target)
          component!.config.propConfig.options = val
        } else if (assign === 'cacheData') {
          renderStore.cacheData[target!] = val
        }

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      case 'reset':
        if (target) {
          const component = renderStore.findComponent(renderStore.currentPage.elements, target)
          const value = toRaw(renderStore.cacheData[target]?.originData)
          component && handleUpdate(value, component.config)
        }

        if (thenEvents?.length) handleEvents(thenEvents)
        break;

      default:
        break;
    }
  })
}

const joinRouteParams = (url: string = '', params: any[]) => {
  const routeParams = qs.stringify(params)
  const urlObj = new URL(url)
  urlObj.search += urlObj.search.startsWith('?') ? '&' : '?' + routeParams
  return urlObj.href
}

const getValue = (params: { type: string; key: string; value: string; deepProp?: string }[] = []) => {
  let result: any = {}
  params.forEach(item => {
    const { type, key, value, deepProp } = item
    switch (type) {
      case 'input':
        result[key] = value
        break;

      case 'inputSelect':
        result[key] = getRealvalue(value)
        break;

      case 'select':
        result[getRealkey(value)] = getRealvalue(value)
        break;

      case 'inputSelectInput':
         const obj = getRealvalue(value)
        result[key] = obj[deepProp!]
        break;

      default:
        break;
    }
  })

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
    const component = renderStore.findComponent(renderStore.currentPage.elements, tableId)
    return component?.config.propConfig.primaryKey
  }

  if (value.includes('rowsKey')) {
    const tableId = value.replace('rowsKey', '')
    const component = renderStore.findComponent(renderStore.currentPage.elements, tableId)
    return component?.config.propConfig.primaryKey
  }

  // 以上都不成立，则是取组件的值（此时参数 value 为组件的 field）
  const component = renderStore.findComponent(renderStore.currentPage.elements, value)
  return component?.config.propConfig.field
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
  const component = renderStore.findComponent(renderStore.currentPage.elements, value)
  return toRaw(component?.config.modelValue)
}
</script>
