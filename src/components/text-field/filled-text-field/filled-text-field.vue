<template>
  <md-filled-text-field
    :label="label"
    :name="field"
    :type="type"
    :placeholder="placeholder"
    v-model="value"
    maxlength="10"
  ></md-filled-text-field>
  <input @input="input" @change="change" />
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
  property: {
    label: string
    field: string
    type?: string
    placeholder?: string
    readonly?: boolean
  }
}>()
const emit = defineEmits(['update:modelValue', 'action'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

onBeforeMount(() => emit('action', { event: 'beforeMount' }))
onMounted(() => emit('action', { event: 'mounted' }))
onBeforeUnmount(() => emit('action', { event: 'beforeUnmount' }))

const label = computed(() => props.property.label)
const field = computed(() => props.property.field)
const type = computed(() => props.property.type)
const placeholder = computed(() => props.property.placeholder)
const readonly = (props.property.readonly)

const input = (e: any) => {
  console.log('input', e)
}
const change = (e: any) => {
  console.log('change', e)
}
</script>
