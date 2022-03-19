<template>
  <div class="zh-form">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { IElement } from '@/interface-type';

const props = defineProps<{
  modelValue: any
  propConfig: any
  childrens?: any
}>()
const emit = defineEmits(['update', 'mount'])

const formData: any = reactive({a: 1})
const childValue = computed(() => {    
  const data: any = {}
  props.childrens.forEach((item: IElement) => {
    data[item.propConfig.field] = item.modelValue
  })
  return data;
})

onMounted(() => {
  emit('mount')

  // 模拟请求到数据，赋值给 formData
  // formData.value = { lastname: 'zonghaung', firstname: 'li' }
  // emit('update', formData.value)
})

const stopWatch = watch(childValue, () => {
  const newValue = Object.assign(toRaw(formData), childValue.value)
  emit('update', newValue)
})
onUnmounted(() => stopWatch())
</script>
