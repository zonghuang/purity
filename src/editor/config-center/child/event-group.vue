<template>
  <div class="form-item form-item--inline">
    <label class="form-item_label">触发条件</label>
    <div class="form-item_content">
      <el-tooltip content="添加条件后，只有当符合条件，才触发该事件" placement="top">
        <el-button type="text" @click="addCondition">添加条件</el-button>
      </el-tooltip>
      <span class="text-note">（默认无条件触发）</span>
    </div>
  </div>

  <div class="form-item form-item--inline">
    <label class="form-item_label">触发事件<abbr title="required">*</abbr></label>
    <div class="form-item_content">
      <el-select v-model="event.action" @change="changeEvent" placeholder="请选择事件" clearable>
        <el-option v-for="item in actionOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>

  <div v-if="event.action === 'openModal' || event.action === 'closeModal'" class="form-item form-item--inline">
    <label class="form-item_label">模态框<abbr title="required">*</abbr></label>
    <div class="form-item_content">
      <el-select v-model="event.option.target" placeholder="请选择模态框" clearable>
        <el-option v-for="item in modalList" :key="item.uuid" :label="item.propConfig.label" :value="item.uuid">
        </el-option>
      </el-select>
    </div>
  </div>

  <template v-if="event.action === 'link'">
    <div class="form-item form-item--inline">
      <label class="form-item_label">跳转链接<abbr title="required">*</abbr></label>
      <div class="form-item_content">
        <el-input v-model="event.option.url" placeholder="请输入链接" clearable />
      </div>
    </div>
    <div class="form-item form-item--inline">
      <label class="form-item_label">跳转方式<abbr title="required">*</abbr></label>
      <div class="form-item_content">
        <el-radio-group v-model="event.option.tab">
          <el-radio label="_self">当前页面加载</el-radio>
          <el-radio label="_blank">新窗口打开</el-radio>
        </el-radio-group>
      </div>
    </div>
    <div v-if="event.option.tab === '_self'" class="form-item form-item--inline">
      <label class="form-item_label">传参方式</label>
      <div class="form-item_content">
        <el-radio-group v-model="event.option.mode">
          <el-radio label="query">query 传参方式</el-radio>
          <el-radio label="params">params 传参方式</el-radio>
        </el-radio-group>
      </div>
    </div>
    <!-- 携带路由参数 -->
  </template>

  <template v-if="event.action === 'fetch'">
    <div class="form-item form-item--inline">
      <label class="form-item_label">请求接口<abbr title="required">*</abbr></label>
      <div class="form-item_content">
        <el-input v-model="event.option.url" placeholder="请输入api" clearable />
      </div>
    </div>
    <div class="form-item form-item--inline">
      <label class="form-item_label">请求方式<abbr title="required">*</abbr></label>
      <div class="form-item_content">
        <el-select v-model="event.option.method" placeholder="请选择请求方式" clearable>
          <el-option v-for="item in methodOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="form-item form-item--inline">
      <label class="form-item_label">Loading</label>
      <div class="form-item_content">
        <el-switch v-model="event.option.loading" />
      </div>
    </div>
  </template>

  <!-- 携带路由参数/请求参数/源数据 -->
  <div v-if="['link', 'fetch', 'set'].includes(event.action)" class="form-item">
    <label class="form-item_label">
      {{ event.action === 'link' ? '携带路由参数' : event.action === 'fetch' ? '请求参数' : '源数据' }}
    </label>
    <div class="form-item_content">
      <div v-if="event.option.params?.length" class="list-head">
        <label class="list-head_label">键</label>
        <label class="list-head_label">值</label>
        <span class="icon-box">
          <el-icon size="16px"></el-icon>
        </span>
      </div>
      <div v-for="(one, i) in event.option.params" class="list-body">
        <template v-if="one.type === 'input'">
          <el-input v-model="one.key" placeholder="请输入键" />
          <el-input v-model="one.value" placeholder="请输入值" />
        </template>

        <template v-if="one.type === 'inputSelect'">
          <el-input v-model="one.key" placeholder="请输入键" />
          <el-select v-model="one.value" placeholder="请选择值">
            <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>

        <template v-if="one.type === 'select'">
          <el-select v-model="one.value" placeholder="请选择键值">
            <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </template>

        <template v-if="one.type === 'inputSelectInput'">
          <el-input v-model="one.key" placeholder="请输入键" />
          <el-select v-model="one.value" placeholder="请选择对象">
            <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-input v-model="one.path" placeholder="对象属性" />
        </template>

        <span class="icon-box icon-box-delete" @click="deleteParam(i)">
          <el-icon size="16px"><delete /></el-icon>
        </span>
      </div>

      <div class="params-plus">
        <label class="form-item_label" style="width: unset;">添加参数</label>
        <el-tooltip content="输入键值" placement="top">
          <span class="icon-box" @click="addParam('input')">
            <el-icon size="16px"><edit-pen /></el-icon>
          </span>
        </el-tooltip>
        <el-tooltip content="输入键，选择值" placement="top">
          <span class="icon-box" @click="addParam('inputSelect')">
            <el-icon size="16px"><circle-plus /></el-icon>
          </span>
        </el-tooltip>
        <el-tooltip content="选择键值" placement="top">
          <span class="icon-box" @click="addParam('select')">
            <el-icon size="16px"><plus /></el-icon>
          </span>
        </el-tooltip>
        <el-tooltip content="输入键，选择对象的属性" placement="top">
          <span class="icon-box" @click="addParam('inputSelectInput')">
            <el-icon size="16px"><zoom-in /></el-icon>
          </span>
        </el-tooltip>
      </div>
    </div>
  </div>

  <!-- 赋值方式 -->
  <div v-if="event.action === 'set' || event.action === 'fetch'" class="form-item form-item--inline">
    <label class="form-item_label">{{ event.action === 'fetch' ? '响应数据赋值' : '赋值方式' }}</label>
    <div class="form-item_content">
      <el-select v-model="event.option.assign" placeholder="请选择赋值方式" clearable>
        <el-option v-for="item in assignOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>

  <!-- 赋值给组件/重置组件 -->
  <div class="form-item"
    v-if="['fetch', 'set', 'reset'].includes(event.action) &&
    !['cacheData', 'components'].includes(event.option.assign!)"
  >
    <label class="form-item_label">
      {{ event.action === 'fetch' ? '响应的数据赋值给哪个组件?' : event.action === 'reset' ? '重置组件' : '值赋值给哪个组件?' }}
    </label>
    <div class="form-item_content">
      <el-select v-model="event.option.target" placeholder="请选择组件" clearable>
        <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
    </div>
  </div>

  <div v-if="event.action === 'fetch' && ['cacheData', 'components'].includes(event.option.assign!)" class="form-item">
    <div v-if="event.option.targets?.length" class="list-head">
      <label class="list-head_label">键</label>
      <label class="list-head_label">组件</label>
      <span class="icon-box">
        <el-icon size="16px"></el-icon>
      </span>
    </div>

    <div v-for="(one, i) in event.option.targets" class="list-body">
      <el-input v-model="one.source" placeholder="请输入键" />
      <el-select v-model="one.target" placeholder="请选择组件">
        <el-option v-for="item in sourceOptions" :key="item.value" :label="item.label" :value="item.value">
        </el-option>
      </el-select>
      <span class="icon-box icon-box-delete" @click="deleteTarget(i)">
        <el-icon size="16px"><delete /></el-icon>
      </span>
    </div>
    <span class="icon-box" @click="addTarget">
      <el-icon size="16px"><plus /></el-icon>
    </span>
  </div>

  <div v-if="event.action === 'set' && event.option.assign === 'cacheData'" class="form-item form-item--inline">
    <label class="form-item_label">缓存key</label>
    <div class="form-item_content">
      <el-input v-model="event.option.target" placeholder="请输入键" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { IElement, IEvent, IOptions, IEventOption } from '@/interface-type'
import { actionOptions, methodOptions, assignOptions, validComponents } from '@/mock-data'

const editStore = useEditStore()
const props = defineProps<{
  modelValue: IEvent
}>()
const emit = defineEmits(['update:modelValue'])

const event = computed({
  get: () => props.modelValue,
  set: newValue => emit('update:modelValue', newValue)
})

// 模态框列表
const modalList = computed(() => {
  return editStore.currentPage.elements?.filter(item => {
    if (item.type === 'modal') return item
  })
})

// 参数源选项
const sourceOptions = computed(() => {
  const params = getValidComponent(editStore.currentPage.elements, [])
  params.push(
    { label: '路由参数 (query)', value: 'routeQuery' },
    { label: '路由参数 (params)', value: 'routeParams' },
    { label: 'cacheData', value: 'cacheData' }
  )
  return params
})

// 获取可选组件选项
const getValidComponent = (tree: IElement[], options: IOptions[]) => {
  tree.forEach(item => {
    const label = item.propConfig.alias ?? item.propConfig.label
    validComponents.includes(item.type) && options.push({ label: label, value: item.uuid })

    // 特殊：表格当前行、多选行、当前行主键、多选行主键
    if (item.type === 'table') {
      const currentRow = { label: label + '当前行', value: item.uuid + 'currentRow' }
      const selectedRows = { label: label + '多选行', value: item.uuid + 'selectedRows' }
      const currentRowKey = { label: label + '当前行主键', value: item.uuid + 'rowKey' }
      const selectedRowsKey = { label: label + '多选行主键', value: item.uuid + 'rowsKey' }
      options.push(currentRow, selectedRows, currentRowKey, selectedRowsKey)
    }

    if (item.childrens?.length) getValidComponent(item.childrens, options)
  })

  return options
}

const addCondition = () => {
  ElMessage('此功能正在开发中...')
}

const addParam = (type: string) => event.value.option.params?.push({ key: '', value: '', type })
const deleteParam = (index: number) => event.value.option.params?.splice(index, 1)

const changeEvent = () => {
  let option: IEventOption = {}
  switch (event.value.action) {
    case 'openModal':
    case 'closeModal':
      option = { target: '' }
      break;

    case 'link':
      option = { url: '', tab: '', mode: '', params: [] }
      break;

    case 'fetch':
      option = { url: '', method: '', loading: false, params: [], assign: '', target: '', targets: [] }
      break;

    case 'set':
      option = { assign: '', params: [], target: '', targets: [] }
      break;

    case 'reset':
      option = { target: '' }
      break;

    default:
      break;
  }

  event.value.option = option
}

const addTarget = () => event.value.option.targets?.push({ target: '', source: '' })
const deleteTarget = (index: number) => event.value.option.targets?.splice(index, 1)
</script>

<style scoped lang="less">
.params-plus {
  display: flex;
  gap: 10px;
}
</style>
