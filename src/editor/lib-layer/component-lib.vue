<template>
  <div class="lib">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="category in libs"
        :key="category.name"
        :title="category.label"
        :name="category.name"
      >
        <div class="component-group" v-for="item in category.children" :key="item.name">
          <!-- <label class="title">{{ item.label }}</label> -->
          <ul class="component-list">
            <li
              v-for="component in item.children"
              :key="component.name"
              :id="component.name"
              draggable="true"
              @mousedown="onMousedown"
              @dragstart="onDragstart"
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
import { useStore } from 'vuex'
import { key } from '../store'
import { componentLibs } from '../mock-data';

const store = useStore(key)
const libs = ref(componentLibs)

const activeNames = ref(['basic'])
function handleChange(value: string) {
  console.log(value)
}

// 记录拖拽前鼠标按下时的（相对自身）偏移量
const onMousedown = (ev: MouseEvent) => {
  const dragBeforeDownOffset = { x: ev.offsetX, y: ev.offsetY }
  store.commit('dragstartMousedown', dragBeforeDownOffset)
}

const onDragstart = (ev: DragEvent) => {
  ev.dataTransfer.setData('text/plain', ev.target.id)
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
    width: 104px;
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