<template>
  <div v-if="style" class="style-config">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="category in categorys"
        :key="category.value"
        :title="category.label"
        :name="category.value"
      >
        <div v-if="category.value === 'elementplus'"></div>

        <div v-else-if="category.value === 'placement'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="position">
              <el-select v-model="style.position" placeholder="Select">
                <el-option
                  v-for="item in positions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="top">
              <el-input v-model="style.top"></el-input>
            </el-form-item>
            <el-form-item label="right">
              <el-input v-model="style.right"></el-input>
            </el-form-item>
            <el-form-item label="bottom">
              <el-input v-model="style.bottom"></el-input>
            </el-form-item>
            <el-form-item label="left">
              <el-input v-model="style.left"></el-input>
            </el-form-item>

            <el-form-item label="display">
              <el-select v-model="style.display" placeholder="Select">
                <el-option
                  v-for="item in displays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

        <div v-if="category.value === 'boxmodel'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="宽度">
              <el-input v-model="style.width" placeholder="请输入，如 100px"></el-input>
            </el-form-item>
            <el-form-item label="高度">
              <el-input v-model="style.height"></el-input>
            </el-form-item>
            <el-form-item label="外边距">
              <el-input v-model="style.margin"></el-input>
            </el-form-item>
            <el-form-item label="内边距">
              <el-input v-model="style.padding"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useEditStore } from '../store/edit';

const editStore = useEditStore()

const activeNames = ref('boxmodel')
const categorys = [
  { label: 'Element Plus', value: 'elementplus' },
  { label: '布局', value: 'placement' },
  { label: '盒模型', value: 'boxmodel' },
  { label: '文字', value: 'font' },
  { label: '颜色/背景', value: 'color' },
  { label: '文本', value: 'text' },
  { label: 'CSS3 属性', value: 'css3' },
]

const positions = [
  { label: 'static', value: 'static' },
  { label: 'relative', value: 'relative' },
  { label: 'absolute', value: 'absolute' },
  { label: 'fixed', value: 'fixed' },
  { label: 'sticky', value: 'sticky' },
  { label: 'inherit', value: 'inherit' },
  { label: 'initial', value: 'initial' },
  { label: 'unset', value: 'unset' }
]

const displays = [
  { label: 'block', value: 'block' },
  { label: 'inline', value: 'inline' },
  { label: 'flex', value: 'flex' },
  { label: 'grid', value: 'grid' },
  { label: 'inline-block', value: 'inline-block' },
  { label: 'inline-flex', value: 'inline-flex' },
  { label: 'inline-grid', value: 'inline-grid' },
  { label: 'inherit', value: 'inherit' },
  { label: 'initial', value: 'initial' },
  { label: 'unset', value: 'unset' },
  { label: 'none', value: 'none' }
]

const style = computed(() => editStore.currentComponent.style)


function handleChange(value: string) {
  // console.log(value)
}
</script>

<style scoped lang="less">
.style-config {

}

:deep(.el-collapse-item__header) {
  padding-left: 10px;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 10px;
}
</style>