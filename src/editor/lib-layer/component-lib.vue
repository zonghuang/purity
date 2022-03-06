<template>
  <div class="lib">
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
import { ref } from 'vue';
import { componentLibs } from '../mock-data';

const libs = ref(componentLibs)

const activeNames = ref(['test'])
function handleChange(value: string) {
  // console.log(value)
}

const dragstart = (ev: DragEvent) => {
  const { currentTarget, offsetX, offsetY } = ev
  const name = (currentTarget as Element).getAttribute('name')
  const data = `${name},${offsetX},${offsetY},isNew`
  ev.dataTransfer!.effectAllowed = 'copyMove'
  ev.dataTransfer!.setData('text/plain', data)
}

const dragend = (ev: DragEvent) => {
  ev.dataTransfer!.clearData()
}
</script>

<style scoped lang="less">
.component-list {
  margin: 0;
  padding: 10px 0 10px 10px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  list-style: none;
  // box-shadow: 0 1px 1px rgba(100, 100, 100, .1);

  li {
    width: 111px;
    height: 32px;
    line-height: 32px;
    padding-left: 8px;
    background: #ecf5ff;

    &:hover {
      cursor: pointer;
      color: #409eff;
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