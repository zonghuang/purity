<template>
  <div class="prop-config">
    <el-form v-if="propConfig" class="prop-config-form" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="标签名">
        <el-input v-model="propConfig.label" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input v-model="propConfig.labelWidth" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="propConfig.labelPosition" placeholder="Select">
          <el-option
            v-for="item in labelPositionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input v-model="propConfig.field" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="占位符文本">
        <el-input v-model="propConfig.placeholder" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { labelPositionOptions } from '@/mock-data'

const editStore = useEditStore()
const propConfig = computed(() => editStore.currentComponent?.propConfig)
</script>

<style scoped>
.prop-config-form {
  padding: 16px 10px;
}
</style>