<template>
  <svg
    class="svg-icon"
    :width="width"
    :height="height"
    @mouseenter="currentColor = activeColor"
    @mouseleave="currentColor = color"
    aria-hidden="true"
  >
    <use
      :href="symbolId"
      :fill="isActive ? activeColor : currentColor"
      :stroke="isActive ? activeColor : currentColor"
    />
  </svg>
</template>

<script setup lang="ts">
interface ISvgProps {
  prefix?: string
  name: string
  width?: string
  height?: string
  color?: string
  activeColor?: string
  isActive?: boolean
}

const props: ISvgProps = withDefaults(defineProps<ISvgProps>(), {
  prefix: 'icon',
  name: '',
  width: '20px',
  height: '20px',
  color: '#666',
  activeColor: '#409eff',
  isActive: false
})

const currentColor = ref(props.color)
const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style scoped>
.svg-icon:hover {
  cursor: pointer;
}
</style>
