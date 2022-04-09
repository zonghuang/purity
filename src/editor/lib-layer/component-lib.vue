<template>
  <div class="lib">
    <el-collapse v-model="activeNames">
      <el-collapse-item
        v-for="category in libs"
        :key="category.name"
        :title="category.label"
        :name="category.name"
      >
        <div class="component-group" v-for="item in category.childrens" :key="item.name">
          <ul class="component-list">
            <li
              v-for="component in item.childrens"
              :key="component.name"
              :name="component.name"
              draggable="true"
              @dragstart="dragstart"
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

const dragstart = (ev: DragEvent) => {
  ev.dataTransfer?.clearData()
  const { currentTarget, offsetX, offsetY } = ev
  const name = (currentTarget as Element).getAttribute('name')
  const data = `${name},${offsetX},${offsetY},isNew`
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', data)
}
</script>

<style scoped lang="less">
:deep(.el-collapse-item__header) {
  padding-left: 10px;
  color: rgba(0, 0, 0, .6);
}
:deep(.el-collapse-item__content) {
  padding-bottom: 10px;
}
.component-list {
  margin: 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  list-style: none;

  li {
    width: 116px;
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
