<template>
  <div class="zh-form">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IElement } from '@/interface-type';
import { useRenderStore } from '@/store/render';
import { validValueComponents } from '@/mock-data';

const props = defineProps<{
  uuid: string
  modelValue: any
  propConfig: any
  childrens?: IElement[]
}>()
const emit = defineEmits(['update', 'mount', 'action'])
const renderStore = useRenderStore()

const originData = reactive({})
const formData = { ...props.modelValue }
const childValue = computed(() => {
  const data: any = {}
  props.childrens?.forEach(item => {
    if (validValueComponents.includes(item.type))
      data[item.propConfig.field] = item.modelValue
  })
  return data
})

onMounted(() => {
  emit('action', { userAction: 'mount' })
  Object.assign(originData, childValue.value)

  if (!renderStore.cacheData[props.uuid]) renderStore.cacheData[props.uuid] = {}
  Object.assign(renderStore.cacheData[props.uuid], { originData })
})

const stopWatch = watch(childValue, () => {
  const newValue = Object.assign(toRaw(formData), childValue.value)
  emit('update', newValue)
})
onUnmounted(() => stopWatch())
</script>
