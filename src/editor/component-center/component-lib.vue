<template>
  <div class="component-lib">
    <el-collapse v-model="activeNames">
      <el-collapse-item v-for="item in libs" :key="item.name" :title="item.label" :name="item.name">
        <div
          class="component-item"
          v-for="one in item.children"
          :key="one.icon"
          draggable="true"
          @dragstart="dragstart($event, one.icon)"
        >
          <svg :width="one.width" :height="one.height">
            <use :href="`#icon-${one.icon}`" />
          </svg>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { components } from 'mock/component-list'

const libs = ref(components)
const activeNames = ref(['button'])

const dragstart = (ev: DragEvent, name: string) => {
  ev.dataTransfer?.clearData()
  const { offsetX, offsetY } = ev
  const data = { name: `zh-${name}`, offsetX, offsetY }
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', JSON.stringify(data))
}
</script>

<style scoped lang="less">
:deep(.el-collapse-item__content) {
  display: flex;
  flex-wrap: wrap;
  row-gap: 8px;
  justify-content: center;
}

.component-item {
  min-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
