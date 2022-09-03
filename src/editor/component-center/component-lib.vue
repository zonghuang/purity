<template>
  <div class="component-lib">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="category in libs"
        :key="category.name"
        :title="category.label"
        :name="category.name"
      >
        <div class="component-group" v-for="(item, index) in category.childrens" :key="item.name">
          <ul class="component-list">
            <li
              v-for="component in item.childrens"
              :key="component.name"
              :name="component.name"
              draggable="true"
              @dragstart="dragstart($event, component.name)"
            >{{ component.label }}</li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { componentLibs } from '@/mock-data'

const libs = ref(componentLibs)
const activeNames = ref(['test'])

const dragstart = (ev: DragEvent, name: string) => {
  ev.dataTransfer?.clearData()
  const { offsetX, offsetY } = ev
  const data = { name, offsetX, offsetY }
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', JSON.stringify(data))
}
</script>

<style scoped lang="less">
.component-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  justify-content: center;
  list-style: none;
  padding: 0;

  li {
    width: 115px;
    height: 32px;
    line-height: 32px;
    padding-left: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: move;

    &:hover {
      color: #409eff;
      border: 1px solid #409eff;
    }
  }
}
</style>
