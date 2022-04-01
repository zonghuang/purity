<template>
  <div class="lib">
    <div style="padding: 10px;">
      临时测试
      <el-button type="text" @click="handleExample1">示例1</el-button>
    </div>
    

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="category in libs"
        :key="category.name"
        :title="category.label"
        :name="category.name"
      >
        <div class="component-group" v-for="item in category.childrens" :key="item.name">
          <!-- <label class="title">{{ item.label }}</label> -->
          <ul class="component-list">
            <li
              v-for="component in item.childrens"
              :key="component.name"
              :name="component.name"
              draggable="true"
              @dragstart="dragstart"
              @dragend="dragend"
            >
              {{ component.label }}
            </li>
          </ul>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit';
import type { CollapseModelValue } from 'element-plus';
import { componentLibs } from '@/mock-data'
import { appData } from '../../../mock/app-manage';

const editStore = useEditStore()

// 临时测试数据
const mackAppData: any = reactive(appData)
const handleExample1 = () => {
  editStore.currentPage.elements = toRaw(mackAppData).elements
}

const libs = ref(componentLibs)

const activeNames = ref(['test'])
function handleChange(value: CollapseModelValue) {
  // console.log(value)
}

const dragstart = (ev: DragEvent) => {
  const { currentTarget, offsetX, offsetY } = ev
  const name = (currentTarget as Element).getAttribute('name')
  const data = `${name},${offsetX},${offsetY},isNew`
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', data)
}

const dragend = (ev: DragEvent) => ev.dataTransfer?.clearData()
</script>

<style scoped lang="less">
.component-list {
  margin: 0;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  list-style: none;
  // box-shadow: 0 1px 1px rgba(100, 100, 100, .1);

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

:deep(.el-collapse-item__header) {
  padding-left: 10px;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 10px;
}
</style>
