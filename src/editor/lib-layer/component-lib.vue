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
          <ul class="component-list" :style="{ marginBottom: index+1 === (category.childrens?.length) ? '8px' : '' }">
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
.component-list {
  margin: 0 0 20px;
  padding: 0;
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
