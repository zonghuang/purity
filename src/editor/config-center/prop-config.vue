<template>
  <!-- 临时的，后面会抽离封装 -->
  <div class="prop-config">
    <el-form
      v-if="type === 'button' && propConfig"
      class="prop-config-form"
      :model="propConfig"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="按钮名称">
        <el-input v-model="propConfig.label" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>

    <el-form
      v-if="(type === 'input' || type === 'select') && propConfig"
      class="prop-config-form"
      :model="propConfig"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="标签名称">
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
      <el-form-item label="默认值" v-if="editStore.currentComponent">
        <el-input v-model="editStore.currentComponent.modelValue" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="propConfig.required" />
      </el-form-item>
      <el-form-item label="占位符文本">
        <el-input v-model="propConfig.placeholder" placeholder="请输入"></el-input>
      </el-form-item>
    </el-form>

    <el-form v-if="type === 'form' && propConfig" class="prop-config-form" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="标签宽度">
        <el-input v-model="propConfig.labelWidth" placeholder="请输入" @change="changeLabelWidth"></el-input>
      </el-form-item>
      <el-form-item label="对齐方式">
        <el-select v-model="propConfig.labelPosition" @change="changeLabelPosition" placeholder="Select">
          <el-option
            v-for="item in labelPositionOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    

    <el-form v-if="type === 'table' && propConfig" class="prop-config-form" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="表格名称">
        <el-input v-model="propConfig.label" placeholder="请输入"></el-input>
      </el-form-item>
      <!-- <el-form-item label="表格高度">
        <el-input v-model="propConfig.height" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="表格最大高度">
        <el-input v-model="propConfig.maxHeight" placeholder="请输入"></el-input>
      </el-form-item> -->
      <el-form-item label="带边框表格">
        <el-switch v-model="propConfig.showBorder" />
      </el-form-item>
      <el-form-item label="显示多选">
        <el-switch v-model="propConfig.showSelection" />
      </el-form-item>
      <el-form-item label="显示斑马纹">
        <el-switch v-model="propConfig.showStripe" />
      </el-form-item>
      <el-form-item label="显示操作列">
        <el-switch v-model="propConfig.showOperations" />
      </el-form-item>

      <el-form-item label="操作列按钮">
        <div v-for="(item, index) in propConfig.operations" class="group">
          <div class="form-item">
            <label class="form-label">名称</label>
            <div class="form-content">
              <el-input v-model="item.name" placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">command</label>
            <div class="form-content">
              <el-input v-model="item.command" placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">事件</label>
            <div class="form-content">
              <el-input v-model="item.events" placeholder="请输入"></el-input>
            </div>
          </div>
          <div>
            <el-tooltip effect="light" content="删除" placement="bottom">
            <span class="box-item" @click="deleteOperation(index)">
              <el-icon size="18px">
                <delete />
              </el-icon>
            </span>
          </el-tooltip>
          </div>
        </div>

        <div style="width: 100%;">
          <el-tooltip effect="light" content="添加按钮" placement="bottom">
            <span class="box-item" @click="addOperation">
              <el-icon size="18px">
                <plus />
              </el-icon>
            </span>
          </el-tooltip>
        </div>
      </el-form-item>

      <el-form-item label="表格列拖拽排序">
        此功能正在开发中...
      </el-form-item>

      <el-form-item label="表格列">
        <div v-for="(column, index) in propConfig.columns" class="group">
          <div class="form-item">
            <label class="form-label">标签名称</label>
            <div class="form-content">
              <el-input v-model="column.label" placeholder="请输入"></el-input>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">字段名称</label>
            <div class="form-content">
              <el-input v-model="column.field" placeholder="请输入"></el-input>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">宽度</label>
            <div class="form-content">
              <el-input v-model="column.width" placeholder="请输入"></el-input>
            </div>
          </div>

          <!-- <div class="form-item">
            <label class="form-label">固定列</label>
            <div class="form-content">
              <el-select v-model="column.fixed" placeholder="请选择" clearable>
                <el-option
                  v-for="item in fixedOptiosn"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div> -->

          <div>
            <el-tooltip effect="light" content="删除" placement="bottom">
            <span class="box-item" @click="deleteColumn(index)">
              <el-icon size="18px">
                <delete />
              </el-icon>
            </span>
          </el-tooltip>
          </div>
        </div>
        <div style="width: 100%;">
          <el-tooltip effect="light" content="添加列" placement="bottom">
            <span class="box-item" @click="addColumn">
              <el-icon size="18px">
                <plus />
              </el-icon>
            </span>
          </el-tooltip>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { labelPositionOptions, fixedOptiosn } from '@/mock-data'

const editStore = useEditStore()
const propConfig: any = computed(() => editStore.currentComponent?.propConfig)
const type = computed(() => editStore.currentComponent?.type)

const changeLabelWidth = () => {
  editStore.currentComponent?.childrens?.forEach(item => {
    item.propConfig.labelWidth = propConfig.value.labelWidth
  })
}

const changeLabelPosition = () => {  
  editStore.currentComponent?.childrens?.forEach(item => {
    item.propConfig.labelPosition = propConfig.value.labelPosition
  })
}

const addOperation = () => {
  propConfig.value.operations?.push({
    name: '',
    command: '',
    events: [],
  })
}

const deleteOperation = (index: number) => {
  propConfig.value.operations.splice(index, 1)
}

const addColumn = () => {
  propConfig.value.columns?.push({
    label: '',
    field: '',
    width: '',
    // fixed: '',
  })
}

const deleteColumn = (index: number) => {
  propConfig.value.columns.splice(index, 1)
}
</script>

<style scoped lang="less">
.prop-config-form {
  padding: 16px 10px;
}

.group {
  width: 100%;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  padding: 4px;
  .form-item {
    display: flex;
    align-items: center;
    row-gap: 10px;

    .form-label {
      display: inline-block;
      width: 90px;
      height: 32px;
      line-height: 32px;
    }
    .form-content {
      flex: 1;
      width: 100%;
    }
  }

  .box-item {
    &:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
}
</style>
