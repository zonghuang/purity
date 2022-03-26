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
      />
      <el-table-column v-if="showOperations" label="操作" width="180" :align="align" :fixed="operationsColumnFixed">
        <template #default="scope">
          <el-button
            v-for="item in operations"
            type="text"
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
import { useRenderStore } from '@/store/render';

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
const operations = computed(() => props.propConfig.operations)
const selectionColumnFixed = computed(() => props.propConfig.selectionColumnFixed)
const operationsColumnFixed = computed(() => props.propConfig.operationsColumnFixed)
const columns = computed(() => props.propConfig.columns)
const align = computed(() => props.propConfig.align)
const tableData = computed(() => props.modelValue)

const selectionChange = (val: any[]) => {
  const selectedRows = val.map(item => toRaw(item))
  const rowsKey = val.map(item => item[primaryKey.value])
  if (!renderStore.tempData[props.uuid]) renderStore.tempData[props.uuid] = {}
  Object.assign(renderStore.tempData[props.uuid], { selectedRows, rowsKey})
}

const handleClick = (item: any, row: any) => {
  const currentRow = toRaw(row)
  const rowKey = row[primaryKey.value]
  if (!renderStore.tempData[props.uuid]) renderStore.tempData[props.uuid] = {}
  Object.assign(renderStore.tempData[props.uuid], { currentRow, rowKey})
  emit('action', { userAction: 'click', bind: item.code })
}
</script>

<style scoped>

</style>
