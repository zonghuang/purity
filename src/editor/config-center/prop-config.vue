<template>
  <!-- 临时的，后面会抽离封装 -->
  <div class="prop-config">
    <el-form
      v-if="type === 'button' && propConfig"
      :model="propConfig"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="按钮名称">
        <el-input v-model="propConfig.label" placeholder="请输入" clearable></el-input>
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
        <el-input v-model="propConfig.icon" placeholder="请输入" clearable></el-input>
      </el-form-item>
    </el-form>

    <el-form
      v-if="(type === 'input' || type === 'select' || type === 'datepicker') && propConfig"
      :model="propConfig"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="标签名称">
        <el-input v-model="propConfig.label" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="propConfig.alias" placeholder="请输入"></el-input>
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

      <el-form-item label="选项">
        <div v-for="(item, index) in propConfig.options" class="action-group">
          <div class="action-name">
            <label v-if="index === 0" class="form-label">label</label>
            <div class="form-content">
              <el-input v-model="item.label" placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="action-code">
            <label v-if="index === 0" class="form-label">value</label>
            <div class="form-content">
              <el-input v-model="item.value" placeholder="请输入"></el-input>
            </div>
          </div>
          <span class="action-delete" @click="deleteOptions(index)">
              <el-icon size="16px"><delete /></el-icon>
            </span>
        </div>

        <div style="width: 100%;">
          <span class="add-item" @click="addOptions">
            <el-icon size="16px"><plus /></el-icon>
          </span>
        </div>
      </el-form-item>

      <template v-if="type === 'datepicker'">
        <el-form-item label="日期范围">
          <el-switch v-model="propConfig.type" />
        </el-form-item>
        <el-form-item label="格式">
          <el-input v-model="propConfig.format"></el-input>
        </el-form-item>
        <el-form-item label="绑定格式">
          <el-input v-model="propConfig.valueFormat"></el-input>
        </el-form-item>
        <el-form-item label="分隔符">
          <el-input v-model="propConfig.rangeSeparator"></el-input>
        </el-form-item>
        <el-form-item label="start 占位符">
          <el-input v-model="propConfig.startPlaceholder"></el-input>
        </el-form-item>
        <el-form-item label="end 占位符">
          <el-input v-model="propConfig.endPlaceholder"></el-input>
        </el-form-item>
      </template>

    </el-form>

    <el-form v-if="type === 'form' && propConfig" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="表单名称">
        <el-input v-model="propConfig.label" placeholder="请输入" @change="changeFormItemWidth"></el-input>
      </el-form-item>
      <el-form-item label="别名">
        <el-input v-model="propConfig.alias" placeholder="请输入"></el-input>
      </el-form-item>
      <el-form-item label="表单项宽度">
        <el-input v-model="propConfig.formItemWidth" placeholder="请输入" @change="changeFormItemWidth"></el-input>
      </el-form-item>
      <el-form-item label="标签宽度">
        <el-input v-model="propConfig.labelWidth" placeholder="请输入" @change="changeLabelWidth"></el-input>
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

    <el-form v-if="type === 'table' && propConfig" class="table" :model="propConfig" label-position="top" label-width="120px">
      <el-form-item label="表格名称">
        <el-input v-model="propConfig.label" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="高度">
        <el-input v-model="propConfig.height" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="最大高度">
        <el-input v-model="propConfig.maxHeight" placeholder="请输入"></el-input>
      </el-form-item>

      <div class="form-item-inline">
        <div class="item-group">
          <label>带边框表格</label>
          <el-switch v-model="propConfig.showBorder" />
        </div>
        <div class="item-group">
          <label>显示斑马纹</label>
          <el-switch v-model="propConfig.showStripe" />
        </div>
      </div>

      <div class="form-item-inline">
        <div class="item-group">
          <label>显示多选</label>
          <el-switch v-model="propConfig.showSelection" />
        </div>
        <div class="item-group">
          <label>显示操作列</label>
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

      <el-form-item label="操作列按钮">
        <div class="tips ">tips: 按钮事件在事件配置面板中绑定</div>
        <div v-for="(item, index) in propConfig.operations" class="action-group">
          <div class="action-name">
            <label v-if="index === 0" class="form-label">名称</label>
            <div class="form-content">
              <el-input v-model="item.name" placeholder="请输入"></el-input>
            </div>
          </div>
          <div class="action-code">
            <label v-if="index === 0" class="form-label">code</label>
            <div class="form-content">
              <el-input v-model="item.code" placeholder="请输入"></el-input>
            </div>
          </div>
          <span class="action-delete" @click="deleteOperation(index)">
              <el-icon size="16px"><delete /></el-icon>
            </span>
        </div>

        <div style="width: 100%;">
          <span class="add-item" @click="addOperation">
            <el-icon size="16px"><plus /></el-icon>
          </span>
        </div>
      </el-form-item>

      <el-form-item label="表格列拖拽排序">
        <div class="tips">此功能正在开发中...</div>
      </el-form-item>

      <el-form-item label="表格列主键">
        <el-input v-model="propConfig.primaryKey" placeholder="请输入"></el-input>
      </el-form-item>

      <el-form-item label="表格列">
        <div v-for="(column, index) in propConfig.columns" class="column-group">
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

          <div class="form-operation">
            <el-button type="text" :size="'small'">更多属性配置</el-button>
            <span class="delete-item" @click="deleteColumn(index)">
              <el-icon size="16px"><delete /></el-icon>
            </span>
          </div>
        </div>
        <div class="add-column">
          <span class="add-item" @click="addColumn">
            <el-icon size="16px"><plus /></el-icon>
          </span>
        </div>
      </el-form-item>
    </el-form>

    <el-form
      v-if="type === 'modal' && propConfig"
      :model="propConfig"
      label-position="top"
      label-width="120px"
    >
      <el-form-item label="模态名称">
        <el-input v-model="propConfig.label" placeholder="请输入" clearable></el-input>
      </el-form-item>
      <el-form-item label="模态宽度">
        <el-input v-model="propConfig.width" placeholder="请输入" clearable></el-input>
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
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { buttonTypeOptions, labelPositionOptions, frontFixedOptions, endFixedOptions } from '@/mock-data'

const editStore = useEditStore()
const propConfig: any = computed(() => editStore.currentComponent?.propConfig)
const type = computed(() => editStore.currentComponent?.type)

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

const deleteOptions = (index: number) => {
  propConfig.value.options.splice(index, 1)
}

const addOptions = () => {
  propConfig.value.options?.push({ label: '', value: '' })
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
.prop-config {
  padding: 16px 10px;
  font-size: 14px;
  color: #606266;
}


// 临时选项样式
.action-group {
  display: flex;
  align-items: flex-end;
  margin-bottom: 10px;

  .action-code {
    margin: 0 8px;
  }

  .action-delete {
    display: flex;
    align-items: center;
    height: 32px;
    cursor: pointer;

    &:hover {
      color: #F56C6C;
    }
  }
}
.add-item {
  cursor: pointer;
  &:hover {
    color: #409eff;
  }
}


// 表格
.table {
  .tips {
    font-size: 12px;
    color: #888;
  }

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

  .action-group {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10px;

    .action-code {
      margin: 0 8px;
    }

    .action-delete {
      display: flex;
      align-items: center;
      height: 32px;
      cursor: pointer;

      &:hover {
        color: #F56C6C;
      }
    }
  }

  .add-item, .delete-item {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .add-item {
    &:hover {
      color: #409eff;
    }
  }
  .delete-item {
    &:hover {
      color: #F56C6C;
    }
  }

  .add-column {
    display: flex;
    height: 24px;
  }

  .column-group {
    width: 100%;
    border-bottom: 1px solid #eee;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    padding: 8px 4px 4px 4px;
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
  }

  .form-operation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 16px;
    .el-button {
      flex: 1;
      justify-content: flex-start;
    }
  }


}

</style>
