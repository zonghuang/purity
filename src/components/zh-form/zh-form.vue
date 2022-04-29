<template>
  <div class="zh-form">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash-es'
import { IElement } from '@/interface-type'
import { useRenderStore } from '@/store/render'
import { validComponents } from '@/mock-data'

const props = defineProps<{
  uuid: string
  modelValue: any
  propConfig: any
  childrens?: IElement[]
}>()
const emit = defineEmits(['update:modelValue', 'mount', 'action'])
const renderStore = useRenderStore()

const formData = computed(() => {
  const data: any = {}
  props.childrens?.forEach(item => {
    if (validComponents.includes(item.type))
      data[item.propConfig.field] = item.modelValue
  })
  return data
})

onBeforeMount(() => emit('action', { userAction: 'mount' }))
onMounted(() => {
  if (!renderStore.cacheData[props.uuid]) renderStore.cacheData[props.uuid] = {}
  const originData = _.cloneDeep(formData.value)
  Object.assign(renderStore.cacheData[props.uuid], { originData })
})


watch(formData, () => emit('update:modelValue', formData.value))
</script>
