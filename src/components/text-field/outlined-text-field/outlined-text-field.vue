<template>
  <md-outlined-text-field
    :label="label"
    :name="field"
    :type="type"
    :placeholder="placeholder"
    v-model="value"
  ></md-outlined-text-field>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string | number
  property: {
    label: string
    field: string
    type?: string
    placeholder?: string
  }
}>()
const emit = defineEmits(['update:modelValue', 'action'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

onBeforeMount(() => {
  emit('action', { event: 'beforeMount', data: undefined })
})

const label = computed(() => props.property.label)
const field = computed(() => props.property.field)
const type = computed(() => props.property.type)
const placeholder = computed(() => props.property.placeholder)
</script>
