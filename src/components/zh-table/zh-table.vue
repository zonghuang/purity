<template>
  <div class="zh-table">
    <!-- 临时的，到时候会用具名插槽或动态插槽插入表格的行/列，这样每个表格的每列都可以配置 -->
    <h4>{{ title }}</h4>
    <el-table
      :data="tableData"
      :border="showBorder"
      :height="height"
      :max-height="maxHeight"
      :stripe="showStripe"
      :row-class-name="tableRowClassName"
      @header-click="thClick"
      @header-contextmenu="thContextmenu">
      <el-table-column v-if="showSelection" type="selection" width="55" />
      <el-table-column 
        v-for="item in columns"
        :prop="item.field"
        :label="item.label"
        :width="item.width"
        :fixed="item.fixed"
      />
      <el-table-column v-if="showOperations" label="操作" width="120">
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

const props = defineProps<{
  uuid: string
  modelValue: any
  propConfig: any
}>()
const emit = defineEmits(['action'])

const title = computed(() => props.propConfig.label)
const showBorder = computed(() => props.propConfig.showBorder)
const height = computed(() => props.propConfig.height)
const maxHeight = computed(() => props.propConfig.maxHeight)
const showSelection = computed(() => props.propConfig.showSelection)
const showStripe = computed(() => props.propConfig.showStripe)
const showOperations = computed(() => props.propConfig.showOperations)
const operations = computed(() => props.propConfig.operations)
const columns = computed(() => props.propConfig.columns)
// const 

const tableData: any = reactive([
  {name: 'zonghuang' },
  {name: 'zonghuang' }
])

const handleClick = (item: any, row: any) => {
  console.log(item, row);
  
  emit('action', item.events, row)
}

const thContextmenu = (column: any, ev: MouseEvent) => {
  ev.preventDefault()
  ev.stopPropagation()
  console.log(column);
}

const tableRowClassName = ({ row, rowIndex }: { row: any, rowIndex: number }) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}

const thClick = (column: any, event: any) => {
  console.log('column, event', column, event);
}
</script>

<style scoped>
/* :deep(.el-table .warning-row) {
  --el-table-tr-bg-color: #fdf6ec !important;
}
:deep(.el-table .success-row) {
  --el-table-tr-bg-color: #f0f9eb !important;
} */

</style>
