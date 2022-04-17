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
import { IElement } from '@/interface-type';
import { useEditStore } from '@/store/edit';

const editStore = useEditStore()

const refresh = ref(true)
const defaultProps = { label: 'name', children: 'childrens' }
const trees = computed(() => editStore.currentPage.elements)
const currentNodeKey = computed(() => editStore.currentComponent?.uuid)

const stopWatch = watch(currentNodeKey, () => {
  refresh.value = false
  nextTick(() => refresh.value = true)
}, {
  immediate: true
})

onUnmounted(() => stopWatch())

const clickNode = (node: IElement) => {
  editStore.setComponent(node.uuid)
  if (node.type === 'modal') editStore.openModal(node.uuid)
}

const dragend = () => editStore.recordSnapshot()
</script>

<style scoped>
.el-tree {
  padding: 10px 0;
}
</style>
