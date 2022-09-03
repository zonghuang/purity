<template>
  <div class="zh-table">
    <!-- <h4 v-if="label">{{ label }}</h4> -->
    <el-table
      :data="tableData"
      :border="showBorder"
      :height="height"
      :max-height="maxHeight"
      :stripe="showStripe"
      @selection-change="selectionChange"
    >
      <el-table-column v-if="showSelection" type="selection" width="55" :fixed="selectionColumnFixed" />
      <el-table-column
        v-for="item in columns"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
        :align="item.align"
        :show-overflow-tooltip="true"
      >
        <template #default="scope">
          <div v-if="item.type === 'image'" :class="{ 'align-center': item.align === 'center' }">
            <el-image style="width: 32px; height: 32px" :src="scope.row[item.field]" :fit="'cover'" />
          </div>
          <template v-else>{{ scope.row[item.field] }}</template>
        </template>
      </el-table-column>

      <el-table-column v-if="showOperations" label="操作" :width="operationsColumnWidth" :align="'center'" :fixed="operationsColumnFixed">
        <template v-if="operations.length > 3" #default="scope">
          <el-button
            v-for="item in operations.slice(0, 2)"
            type="primary"
            size="small"
            @click="handleClick(item, scope.row)"
          >
            {{ item.name }}
          </el-button>
          <el-dropdown class="more-button" size="small">
            <span class="el-dropdown-link">
              <el-button type="primary" size="small">更多</el-button>
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="item in operations.slice(2)"
                  @click="handleClick(item, scope.row)">
                  {{ item.name }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
        <template v-else #default="scope">
          <el-button
            v-for="item in operations"
            type="primary"
            size="small"
            @click="handleClick(item, scope.row)"
            >{{item.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { useRenderStore } from '@/store/render'

const props = defineProps<{
  uuid: string
  modelValue: any
  propConfig: any
}>()
const emit = defineEmits(['action'])
const renderStore = useRenderStore()

const label = computed(() => props.propConfig.label)
const primaryKey = computed(() => props.propConfig.primaryKey)
const showBorder = computed(() => props.propConfig.showBorder)
const height = computed(() => props.propConfig.height) || undefined
const maxHeight = computed(() => props.propConfig.maxHeight) || undefined
const showSelection = computed(() => props.propConfig.showSelection)
const showStripe = computed(() => props.propConfig.showStripe)
const showOperations = computed(() => props.propConfig.showOperations)
const operationsColumnWidth = computed(() => props.propConfig.operationsColumnWidth)
const operations = computed(() => props.propConfig.operations)
const selectionColumnFixed = computed(() => props.propConfig.selectionColumnFixed)
const operationsColumnFixed = computed(() => props.propConfig.operationsColumnFixed)
const columns = computed(() => props.propConfig.columns)
const tableData = computed(() => props.modelValue)

const selectionChange = (val: any[]) => {
  const selectedRows = val.map(item => toRaw(item))
  const rowsKey = val.map(item => item[primaryKey.value])
  if (!renderStore.cacheData[props.uuid]) renderStore.cacheData[props.uuid] = {}
  Object.assign(renderStore.cacheData[props.uuid], { selectedRows, rowsKey, primaryKey })
}

const handleClick = (item: any, row: any) => {
  const currentRow = toRaw(row)
  const rowKey = row[primaryKey.value]
  if (!renderStore.cacheData[props.uuid]) renderStore.cacheData[props.uuid] = {}
  Object.assign(renderStore.cacheData[props.uuid], { currentRow, rowKey, primaryKey })
  emit('action', { event: 'click', bindCode: item.code })
}
</script>

<style lang="less" scoped>
.more-button {
  margin-left: 12px;
  .el-icon--right {
    color: #409eff;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}

:deep(.el-table__body) {
  .el-table__row {
    height: 42px;
  }

  .el-table__cell {
    padding: 0;
  }

  .cell {
    .el-image {
      display: block;
    }
  }

  .align-center {
    display: flex;
    justify-content: center;
  }
}
</style>
