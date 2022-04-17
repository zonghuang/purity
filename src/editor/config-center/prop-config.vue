<template>
  <!-- 临时的，后面会抽离封装 -->
  <div class="prop-config" v-if="propConfig">
    <el-form v-if="type === 'button'" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="按钮名称">
        <el-input v-model="propConfig.label" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="propConfig.alias" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="propConfig.type" placeholder="Select" clearable>
          <el-option
            v-for="item in buttonTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="按钮图标">
        <el-input v-model="propConfig.icon" placeholder="请输入" clearable />
      </el-form-item>
    </el-form>

    <el-form
      v-if="['input', 'select', 'radio', 'datepicker', 'picture', 'text'].includes(type)"
      :model="propConfig"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="标签名称">
        <el-input v-model="propConfig.label" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="propConfig.alias" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input v-model="propConfig.labelWidth" placeholder="请输入" />
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
        <el-input v-model="propConfig.field" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="默认值" v-if="editStore.currentComponent">
        <el-input v-model="editStore.currentComponent.modelValue" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="必填">
        <el-switch v-model="propConfig.required" />
      </el-form-item>
      <el-form-item label="占位符文本">
        <el-input v-model="propConfig.placeholder" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="选项">
        <div class="list-head">
          <label class="list-head_label">label</label>
          <label class="list-head_label">value</label>
          <span class="icon-box">
            <el-icon size="16px"><delete /></el-icon>
          </span>
        </div>
        <div v-for="(item, index) in propConfig.options" class="list-body">
          <el-input v-model="item.label" placeholder="请输入" />
          <el-input v-model="item.value" placeholder="请输入" />
          <span class="icon-box icon-box-delete" @click="deleteOptions(index)">
            <el-icon size="16px"><delete /></el-icon>
          </span>
        </div>
        <span class="icon-box" @click="addOptions">
          <el-icon size="16px"><plus /></el-icon>
        </span>
      </el-form-item>

      <template v-if="type === 'datepicker'">
        <el-form-item label="日期范围">
          <el-switch v-model="propConfig.type" />
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="propConfig.format" />
        </el-form-item>
        <el-form-item label="绑定格式">
          <el-input v-model="propConfig.valueFormat" />
        </el-form-item>
        <el-form-item label="分隔符">
          <el-input v-model="propConfig.rangeSeparator" />
        </el-form-item>
        <el-form-item label="start 占位符">
          <el-input v-model="propConfig.startPlaceholder" />
        </el-form-item>
        <el-form-item label="end 占位符">
          <el-input v-model="propConfig.endPlaceholder" />
        </el-form-item>
      </template>
    </el-form>

    <el-form v-if="type === 'form'" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="表单名称">
        <el-input v-model="propConfig.label" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="propConfig.alias" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input v-model="propConfig.field" placeholder="请输入" />
      </el-form-item>
      <el-form-item label="表单项宽度">
        <el-input v-model="propConfig.formItemWidth" placeholder="请输入" @change="changeFormItemWidth" />
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input v-model="propConfig.labelWidth" placeholder="请输入" @change="changeLabelWidth" />
      </el-form-item>
      <el-form-item label="标签对齐方式">
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

    <el-form v-if="type === 'table'" class="table" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="表格名称">
        <el-input v-model="propConfig.label" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="高度">
        <el-input v-model="propConfig.height" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="最大高度">
        <el-input v-model="propConfig.maxHeight" placeholder="请输入" />
      </el-form-item>

      <div class="form-item-inline">
        <div class="item-group">
          <label class="label">带边框表格</label>
          <el-switch v-model="propConfig.showBorder" />
        </div>
        <div class="item-group">
          <label class="label">显示斑马纹</label>
          <el-switch v-model="propConfig.showStripe" />
        </div>
      </div>

      <div class="form-item-inline">
        <div class="item-group">
          <label class="label">显示多选</label>
          <el-switch v-model="propConfig.showSelection" />
        </div>
        <div class="item-group">
          <label class="label">显示操作列</label>
          <el-switch v-model="propConfig.showOperations" />
        </div>
      </div>

      <el-form-item label="固定列">
        <div class="form-content-inline">
          <el-select v-model="propConfig.frontFixed" @change="setColumnFixed" placeholder="Select" clearable>
            <el-option
              v-for="item in frontFixedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="propConfig.endFixed" @change="setColumnFixed" placeholder="Select" clearable>
            <el-option
              v-for="item in endFixedOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </el-form-item>

      <div class="form-item">
        <label class="form-item_label">操作列按钮
          <span class="text-note">(按钮事件在事件配置面板中绑定)</span>
        </label>
        <div class="form-item_content">
          <div class="list-head">
            <label class="list-head_label">名称</label>
            <label class="list-head_label">code</label>
            <span class="icon-box">
              <el-icon size="16px"></el-icon>
            </span>
          </div>
          <div v-for="(item, index) in propConfig.operations" class="list-body">
            <el-input v-model="item.name" placeholder="请输入" />
            <el-input v-model="item.code" placeholder="请输入" />
            <span class="icon-box icon-box-delete" @click="deleteOperation(index)">
              <el-icon size="16px"><delete /></el-icon>
            </span>
          </div>
          <span class="icon-box" @click="addOperation">
            <el-icon size="16px"><plus /></el-icon>
          </span>
        </div>
      </div>

      <el-form-item label="操作列宽度">
        <el-input v-model="propConfig.operationsColumnWidth" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="表格列拖拽排序">
        <div class="text-note">此功能正在开发中...</div>
      </el-form-item>

      <el-form-item label="表格列主键">
        <el-input v-model="propConfig.primaryKey" placeholder="请输入" />
      </el-form-item>

      <el-form-item label="表格列" class="last-form-item">
        <div v-for="(column, index) in propConfig.columns" class="column-group">
          <div class="column-group-item">
            <label class="form-item_label">标签名称</label>
            <div class="form-item_content">
              <el-input v-model="column.label" placeholder="请输入" />
            </div>
          </div>
          <div class="column-group-item">
            <label class="form-item_label">字段名称</label>
            <div class="form-item_content">
              <el-input v-model="column.field" placeholder="请输入" />
            </div>
          </div>
          <div class="column-group-item">
            <label class="form-item_label">宽度</label>
            <div class="form-item_content">
              <el-input v-model="column.width" placeholder="请输入" />
            </div>
          </div>
          <div class="form-operation">
            <el-button type="text" :size="'small'">更多属性配置</el-button>
            <span class="icon-box icon-box-delete" @click="deleteColumn(index)">
              <el-icon size="16px"><delete /></el-icon>
            </span>
          </div>
        </div>
        <div class="add-column">
          <span class="icon-box" @click="addColumn">
            <el-icon size="16px"><plus /></el-icon>
          </span>
        </div>
      </el-form-item>
    </el-form>

    <el-form v-if="type === 'modal'" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="模态名称">
        <el-input v-model="propConfig.label" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="模态宽度">
        <el-input v-model="propConfig.width" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="遮罩层">
        <el-switch v-model="propConfig.modal"></el-switch>
      </el-form-item>
      <el-form-item label="点击遮罩层关闭">
        <el-switch v-model="propConfig.closeOnClickModal"></el-switch>
      </el-form-item>
      <el-form-item label="全屏">
        <el-switch v-model="propConfig.fullscreen"></el-switch>
      </el-form-item>
    </el-form>

    <el-form v-if="type === 'pagination'" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="标签名称">
        <el-input v-model="propConfig.label" placeholder="请输入" clearable />
      </el-form-item>
      <el-form-item label="字段名称">
        <el-input v-model="propConfig.field" placeholder="请输入" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import {
  buttonTypeOptions,
  labelPositionOptions,
  frontFixedOptions,
  endFixedOptions
} from '@/mock-data'

const editStore = useEditStore()
const propConfig = computed(() => editStore.currentComponent?.propConfig)
const type = computed(() => editStore.currentComponent?.type || '')

// 表单: 表单项宽度、表单项标签宽度、表单项标签对齐方式
const changeFormItemWidth = () => {
  editStore.currentComponent?.childrens?.forEach(item => {
    item.style.width = propConfig.value.formItemWidth
  })
}
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

// 添加选项、删除选项
const addOptions = () => {
  propConfig.value.options?.push({ label: '', value: '' })
}
const deleteOptions = (index: number) => {
  propConfig.value.options.splice(index, 1)
}

// 添加操作列按钮、删除操作列按钮
const addOperation = () => {
  propConfig.value.operations?.push({ name: '', code: '' })
}
const deleteOperation = (index: number) => {
  propConfig.value.operations.splice(index, 1)
}

// 添加表格列、删除表格列
const addColumn = () => {
  propConfig.value.columns?.push({ label: '', field: '', width: '' })
  setColumnFixed()
}
const deleteColumn = (index: number) => {
  propConfig.value.columns.splice(index, 1)
  setColumnFixed()
}

// 表格大于 9 列才设置列固定
const setColumnFixed = () => {
  const length = propConfig.value.columns.length
  propConfig.value.selectionColumnFixed = undefined
  propConfig.value.columns[0].fixed = undefined
  propConfig.value.columns[1].fixed = undefined
  propConfig.value.operationsColumnFixed = undefined
  propConfig.value.columns[length - 1].fixed = undefined
  propConfig.value.columns[length - 2].fixed = undefined

  if (length < 9) return

  const frontFixed = propConfig.value.frontFixed
  const endFixed = propConfig.value.endFixed

  // 前三列固定判断
  if (frontFixed > 0) propConfig.value.selectionColumnFixed = 'left'
  if (frontFixed > 1) propConfig.value.columns[0].fixed = 'left'
  if (frontFixed > 2) propConfig.value.columns[1].fixed = 'left'

  // 后三列固定判断
  if (endFixed > 0) propConfig.value.operationsColumnFixed = 'right'
  if (endFixed > 1) propConfig.value.columns[length - 1].fixed = 'right'
  if (endFixed > 2) propConfig.value.columns[length - 2].fixed = 'right'
}
</script>

<style scoped lang="less">
.prop-config {}

.form-item {
  margin-bottom: 18px;
}

.last-form-item {
  margin-bottom: 0px;
}

// 表格配置
.table {
  .form-item-inline {
    display: flex;
    column-gap: 10px;
    margin-bottom: 18px;

    .item-group {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      row-gap: 4px;
    }
  }

  .form-content-inline {
    display: flex;
    flex-wrap: nowrap;
    column-gap: 8px;
  }

  .column-group {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 8px 0px 4px 0px;
    border-bottom: 1px solid #eee;

    .column-group-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .form-operation {
      display: flex;

      .icon-box {
        flex: 1;
        justify-content: flex-end;
      }
    }
  }

  .add-column {
    margin-top: 8px;
  }
}
</style>
