<template>
  <md-switch
    :label="label"
    :name="field"
    v-model="value"
    showOnlySelectedIcon="true"
    ariaLabel="1"
    ariaLabelledBy="2"
    selected="true"
  ></md-switch>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number | boolean
  property: {
    label: string
    field: string
  }
}>()
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})

const label = computed(() => props.property.label)
const field = computed(() => props.property.field)
</script>
