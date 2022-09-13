<template>
  <md-outlined-text-field
    :label="label"
    :name="field"
    v-model="value"
  ></md-outlined-text-field>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | number
  propConfig: {
    label: string
    field: string
  }
}>()

const emit = defineEmits(['update:modelValue'])

const label = computed(() => props.propConfig.label)
const field = computed(() => props.propConfig.field)

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue)
})
</script>
