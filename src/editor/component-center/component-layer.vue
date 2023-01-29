<template>
  <div class="component-layer">
    <el-tree
      v-if="refresh"
      draggable
      node-key="uuid"
      :data="trees"
      :props="defaultProps"
      :current-node-key="currentNodeKey"
      highlight-current
      default-expand-all
      @node-click="clickNode"
      @node-drag-end="dragend"
    ></el-tree>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/editor'

const editStore = useEditStore()

const refresh = ref(true)
const defaultProps = { label: 'name', children: 'childrens' }
const trees = computed(() => editStore.currentPage.components)
const currentNodeKey = computed(() => editStore.currentComponent?.uuid)

watch(currentNodeKey, () => {
  refresh.value = false
  nextTick(() => refresh.value = true)
}, {
  immediate: true
})

const clickNode = (node: Component) => {
  editStore.setComponent(node.uuid)
  if (node.type === 'modal') editStore.openModal(node.uuid)
}

const dragend = () => editStore.recordSnapshot()
</script>
