<template>
  <div class="event-group">
    <form class="form" onsubmit="return false">
      <fieldset>
        <legend>
          {{ level }} level - 事件 {{ index + 1 }}
          <div class="add-remove-event">
            <el-tooltip content="添加事件" placement="top">
              <span class="icon-box" @click="addEvent">
                <el-icon size="16px"><plus /></el-icon>
              </span>
            </el-tooltip>
            <el-tooltip v-if="level !== 'fifth'" content="添加 then 事件" placement="top">
              <span class="icon-box" @click="addThenEvent">
                <el-icon size="16px"><circle-plus /></el-icon>
              </span>
            </el-tooltip>
            <el-tooltip v-if="level === 'first'" content="选择其他组件的事件" placement="top">
              <span class="icon-box" @click="showOtherEvent = !showOtherEvent">
                <el-icon size="16px"><zoom-in /></el-icon>
              </span>
            </el-tooltip>
            <el-tooltip content="删除事件" placement="top">
              <span class="icon-box icon-box-delete" @click="removeEvent">
                <el-icon size="16px"><delete /></el-icon>
              </span>
            </el-tooltip>
          </div>
        </legend>

        <template v-if="level === 'first'">
          <div v-if="showOtherEvent" class="form-item">
            <label class="form-label">选择已有事件</label>
            <div class="form-content">
              <el-select v-model="otherEvent" @change="selectOtherEvent" placeholder="请选择" clearable>
                <el-option
                  v-for="item in otherEventOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">用户操作<abbr title="required">*</abbr></label>
            <div class="form-content">
              <el-select v-model="eventGroup.userAction" @change="handleChange" placeholder="请选择操作" clearable>
                <el-option
                  v-for="item in userActionOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
        </template>

        <div v-if="bindCodeOptions?.length" class="form-item">
          <label class="form-label">绑定事件
            <el-tooltip content="绑定事件后，只有用户操作了绑定事件，才触发该事件" placement="top">
              <span class="icon-box icon-box-tips">
                <el-icon size="14"><info-filled /></el-icon>
              </span>
            </el-tooltip>
          </label>
          <div class="form-content">
            <el-select v-model="eventGroup.bindCode" @change="handleChange" placeholder="请选择操作" clearable>
              <el-option
                v-for="item in bindCodeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">触发条件</label>
          <div class="form-content">
            <el-tooltip content="添加条件后，只有当符合条件，才触发该事件" placement="top">
              <el-button type="text" @click="addCondition">添加条件</el-button>
            </el-tooltip>
            <span class="text-note">（默认无条件触发）</span>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">触发事件<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-select v-model="eventGroup.event" @change="changeEvent" placeholder="请选择事件" clearable>
              <el-option
                v-for="item in eventOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div v-if="eventGroup.event === 'openModal' || eventGroup.event === 'closeModal'" class="form-item">
          <label class="form-label">模态框<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-select v-model="eventGroup.modalId" @change="handleChange" placeholder="请选择模态框" clearable>
              <el-option
                v-for="item in modalList"
                :key="item.uuid"
                :label="item.propConfig.label"
                :value="item.uuid"
              ></el-option>
            </el-select>
          </div>
        </div>

        <template v-if="eventGroup.event === 'link'">
          <div class="form-item">
            <label class="form-label">跳转链接<abbr title="required">*</abbr></label>
            <div class="form-content">
              <el-input v-model="eventGroup.link" @change="handleChange" placeholder="请输入链接" clearable />
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">跳转方式<abbr title="required">*</abbr></label>
            <div class="form-content">
              <el-radio-group v-model="eventGroup.aTarget" @change="handleChange">
                <el-radio label="_self">当前页面加载</el-radio>
                <el-radio label="_blank">新窗口打开</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div v-if="eventGroup.aTarget === '_self'" class="form-item">
            <label class="form-label">传参方式</label>
            <div class="form-content">
              <el-radio-group v-model="eventGroup.transferMode" @change="handleChange">
                <el-radio label="query">query 传参方式</el-radio>
                <el-radio label="params">params 传参方式</el-radio>
              </el-radio-group>
            </div>
          </div>
          <!-- 携带路由参数 -->
        </template>

        <template v-if="eventGroup.event === 'request'">
          <div class="form-item">
            <label class="form-label">请求接口<abbr title="required">*</abbr></label>
            <div class="form-content">
              <el-input v-model="eventGroup.api" @change="handleChange" placeholder="请输入api" clearable />
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">请求方式<abbr title="required">*</abbr></label>
            <div class="form-content">
              <el-select v-model="eventGroup.method" @change="handleChange" placeholder="请选择请求方式" clearable>
                <el-option
                  v-for="item in methodOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <div class="form-item">
            <label class="form-label">Loading</label>
            <div class="form-content">
              <el-switch v-model="eventGroup.showLoading"  @change="handleChange" />
            </div>
          </div>
          <!-- 请求参数 -->
          <!-- 响应式数据赋值类型 (赋值给单个组件/赋值给多个组件) -->
          <!-- 赋值给多个组件 -->
          <!-- 赋值给单个组件 -->
        </template>

        <template v-if="eventGroup.event === 'setValue'">
          <div class="form-item">
            <label class="form-label">赋值方式<abbr title="required">*</abbr></label>
            <div class="form-content">
              <el-select v-model="eventGroup.assignmentType" @change="handleChange" placeholder="请选择赋值方式" clearable>
                <el-option
                  v-for="item in assignmentTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>
          <!-- 一个组件的值赋给另一个组件 -->
          <div v-if="eventGroup.assignmentType === 'another'" class="form-item form-item-column">
            <div class="form-content">
              <div class="option-title">
                <label class="form-label">源组件</label>
                <label class="form-label">目标组件</label>
                <span class="icon-box">
                  <el-icon size="16px"></el-icon>
                </span>
              </div>
              <div class="option-group-item" v-for="(one, i) in eventGroup.sourceToTarget">
                <el-select v-model="one.source" @change="handleChange" placeholder="请选择源组件" clearable>
                  <el-option
                    v-for="item in keyValueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-select v-model="one.target" @change="handleChange" placeholder="请选择目标组件" clearable>
                  <el-option
                    v-for="item in keyValueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="icon-box icon-box-delete" @click="deleteSourceToTarget(i)">
                  <el-icon size="16px"><delete /></el-icon>
                </span>
              </div>
              <span class="icon-box" @click="addSourceToTarget">
                <el-icon size="16px"><plus /></el-icon>
              </span>
            </div>
          </div>
          <!-- 源数据 -->
          <!-- 合并成对象赋值/合并成数组赋值 -->
        </template>

        <!-- 携带路由参数/请求参数/源数据 -->
        <div v-if="showParamsOption" class="form-item form-item-spec">
          <label class="form-label form-label-block">
            {{ eventGroup.event === 'link' ? '携带路由参数' : eventGroup.event === 'request' ? '请求参数' : '源数据' }}
          </label>
          <div class="form-content">
            <div class="option-title">
              <label class="form-label">键</label>
              <label class="form-label">值</label>
              <span class="icon-box">
                <el-icon size="16px"></el-icon>
              </span>
            </div>
            <div v-for="(one, i) in eventGroup.params" class="option-group-item">
              <template v-if="one.type === 'input-keyValue'">
                <el-input v-model="one.key" @change="handleChange" placeholder="请输入键" />
                <el-input v-model="one.value" @change="handleChange" placeholder="请输入值" />
                <span class="icon-box icon-box-delete" @click="deleteParam(i)">
                  <el-icon size="16px"><delete /></el-icon>
                </span>
              </template>

              <template v-if="one.type === 'inputKey-selectValue'">
                <el-input v-model="one.key" @change="handleChange" placeholder="请输入键" />
                <el-select v-model="one.value" @change="handleChange" placeholder="请选择值">
                  <el-option
                    v-for="item in keyValueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="icon-box icon-box-delete" @click="deleteParam(i)">
                  <el-icon size="16px"><delete /></el-icon>
                </span>
              </template>

              <template v-if="one.type === 'select-keyValue'">
                <el-select v-model="one.value" @change="handleChange" placeholder="请选择键值">
                  <el-option
                    v-for="item in keyValueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <span class="icon-box icon-box-delete" @click="deleteParam(i)">
                  <el-icon size="16px"><delete /></el-icon>
                </span>
              </template>

              <template v-if="one.type === 'inputKey-selectValueKey'" class="key-value-key">
                <el-input v-model="one.key" @change="handleChange" placeholder="请输入键" />
                <el-select v-model="one.value" @change="handleChange" placeholder="请选择对象">
                  <el-option
                    v-for="item in keyValueOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <el-input v-model="one.valueKey" @change="handleChange" placeholder="对象属性" />
                <span class="icon-box icon-box-delete" @click="deleteParam(i)">
                  <el-icon size="16px"><delete /></el-icon>
                </span>
              </template>
            </div>

            <div class="params-plus">
              <label class="form-label">添加参数</label>
              <el-tooltip content="输入键值" placement="top">
                <span class="icon-box" @click="addParam('input-keyValue')">
                  <el-icon size="16px"><edit-pen /></el-icon>
                </span>
              </el-tooltip>
              <el-tooltip content="输入键，选择值" placement="top">
                <span class="icon-box" @click="addParam('inputKey-selectValue')">
                  <el-icon size="16px"><circle-plus /></el-icon>
                </span>
              </el-tooltip>
              <el-tooltip content="选择键值" placement="top">
                <span class="icon-box" @click="addParam('select-keyValue')">
                  <el-icon size="16px"><plus /></el-icon>
                </span>
              </el-tooltip>
              <el-tooltip content="输入键，选择对象的属性" placement="top">
                <span class="icon-box" @click="addParam('inputKey-selectValueKey')">
                  <el-icon size="16px"><zoom-in /></el-icon>
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>

        <!-- 响应式数据赋值类型 -->
        <template v-if="eventGroup.event === 'request'">
          <div class="form-item">
            <label class="form-label">响应数据赋值</label>
            <div class="form-content">
              <el-select v-model="eventGroup.assignmentType" @change="handleChange" placeholder="请选择赋值方式" clearable>
                <el-option
                  v-for="item in assignmentTypeOptions2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
          </div>

          <!-- 赋值给多个组件 -->
          <div v-if="eventGroup.assignmentType === 'multiple'" class="form-item form-item-spec">
            <label class="form-label">响应的数据解构赋值给哪些组件?</label>
            <div class="option-group-item" v-for="(one, i) in eventGroup.valueToComps">
              <el-input v-model="one.source" @change="handleChange" placeholder="请输入" />
              <el-select v-model="one.target" @change="handleChange" placeholder="请选择组件" clearable>
                <el-option
                  v-for="item in componentOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="icon-box icon-box-delete" @click="deleteValueToComp(i)">
                <el-icon size="16px"><delete /></el-icon>
              </span>
            </div>
            <span class="icon-box" @click="addValueToComp">
              <el-icon size="16px"><plus /></el-icon>
            </span>
          </div>
        </template>

        <!-- 赋值给单个组件/(合并成对象赋值/合并成数组赋值)/重置组件 -->
        <div v-if="showTargetCompOption" class="form-item form-item-spec">
          <label class="form-label">
            {{ eventGroup.event === 'request' ? '响应的数据赋值给哪个组件?': eventGroup.event === 'resetValue' ? '重置组件' : '值赋值给哪个目标组件?' }}
          </label>
          <div class="form-content">
            <el-select v-model="eventGroup.valueToComp" @change="handleChange" placeholder="请选择组件" clearable>
              <el-option
                v-for="item in componentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { IElement, IEvent, IOptions } from '@/interface-type';
import {
  userActionOptions,
  eventOptions,
  methodOptions,
  validValueComponents,
  assignmentTypeOptions,
  assignmentTypeOptions2
} from '@/mock-data';

const editStore = useEditStore()
const props = defineProps<{
  level: string
  index: number
  event: IEvent
}>()
const emit = defineEmits(['change', 'addEvent', 'addThenEvent', 'removeEvent'])

const showOtherEvent = ref(false)
const otherEvent = ref('')
const eventGroup = reactive({ ...props.event })

// 是否展示参数选项
const showParamsOption = computed(() => {
  const { event,  assignmentType = '' } = eventGroup
  return event === 'link'
      || event === 'request'
      || (event === 'setValue' && (assignmentType === 'object' || assignmentType === 'array'))
})

// 是否展示(赋值)目标组件选项
const showTargetCompOption = computed(() => {
  const { event,  assignmentType = '' } = eventGroup
  return (event === 'request' && (assignmentType === 'single' || assignmentType === 'options'))
      || (event === 'setValue' && (assignmentType === 'object' || assignmentType === 'array'))
      || eventGroup.event === 'resetValue'
})

// 模态框列表
const modalList = computed(() => {
  return editStore.currentPage.elements?.filter(item => {
    if (item.type === 'modal') return item
  })
})

// 可选组件和路由选项
const keyValueOptions = computed(() => {
  const params = getKeyValueOptions(editStore.currentPage.elements, [])
  params.push({ label: '路由参数 (query)', value: 'routeQuery' })
  params.push({ label: '路由参数 (params)', value: 'routeParams' })
  return params
})

// 可选组件选项
const componentOptions = computed(() => {
  return keyValueOptions.value.filter(item => {
    if (!isNaN(Number(item.value))) return item
  })
})

// 其他组件的事件选项
const otherEventOptions = computed(() => {
  return getOtherEvents(editStore.currentPage.elements, [])
})

// 表格操作列按钮选项
const bindCodeOptions = computed(() => {
  return editStore.currentComponent?.propConfig?.operations?.map((item: any) => {
    return { label: item.name, value: item.code }
  })
})

const stopWatch = watch(props, (newValue) => Object.assign(eventGroup, newValue.event))
onUnmounted(() => stopWatch())

const addEvent = () => emit('addEvent')
const addThenEvent = () => emit('addThenEvent')
const removeEvent = () => emit('removeEvent')
const handleChange = () => emit('change', eventGroup)
const changeEvent = () => {
  Object.assign(eventGroup, {
    modalId: '',
    link: '',
    aTarget: '',
    api: '',
    method: '',
    params: [],
    assignmentType: '',
    valueToComp: '',
    valueToComps: [],
    sourceToTarget: []
  })
  handleChange()
}

const selectOtherEvent = () => {
  const item = otherEventOptions.value.find(item => item.value === otherEvent.value)
  Object.assign(eventGroup, item.event)
  otherEvent.value = ''
  showOtherEvent.value = false
  handleChange()
}

const addCondition = () => {
  ElMessage('此功能正在开发中...')
}

const addParam = (type: string) => eventGroup.params?.push({ key: '', value: '', type })
const deleteParam = (index: number) => eventGroup.params?.splice(index, 1)

const addSourceToTarget = () => eventGroup.sourceToTarget?.push({ source: '', target: '' })
const deleteSourceToTarget = (index: number) => eventGroup.sourceToTarget?.splice(index, 1)

const addValueToComp = () => eventGroup.valueToComps?.push({ source: '', target: '' })
const deleteValueToComp = (index: number) => eventGroup.valueToComps?.splice(index, 1)

// 获取其他组件的事件
const getOtherEvents = (tree: IElement[], options: any[]) => {
  tree.forEach(item => {
    item.events.forEach((one, indey) => {
      const label = (item.propConfig.alias ?? item.propConfig.label) + '事件' + indey
      options.push({ label, value: item.uuid + '-' + indey, event: one })
    })

    if (item.childrens?.length) getOtherEvents(item.childrens, options)
  })
  
  return options
}

// 获取可选组件选项
const getKeyValueOptions = (tree: IElement[], options: IOptions[]) => {
  tree.forEach(item => {
    const label = item.propConfig.alias ?? item.propConfig.label
    validValueComponents.includes(item.type) && options.push({ label: label, value: item.uuid })
    
    // 特殊：表格当前行、多选行、当前行主键、多选行主键
    if (item.type === 'table') {
      const currentRow = { label: label + '当前行', value:  item.uuid + 'currentRow' }
      const selectedRows = { label: label + '多选行', value: item.uuid + 'selectedRows' }
      const currentRowKey = { label: label + '当前行主键', value: item.uuid + 'rowKey' }
      const selectedRowsKey = { label: label + '多选行主键', value: item.uuid + 'rowsKey' }
      options.push(currentRow, selectedRows, currentRowKey, selectedRowsKey)
    }

    if (item.childrens?.length) getKeyValueOptions(item.childrens, options)
  })

  return options
}
</script>

<style scoped lang="less">
// 必填
abbr {
  color: #f56c6c;
}

// 操作按钮
.icon-box {
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}
.icon-box-delete {
  &:hover {
    color: #ff5252;
  }
}
.icon-box-tips {
  display: inline-block;
  margin-right: 0;
  color: #888;
}

// 选项组
.option-title {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 32px;
  
  .form-label {
    flex: 1;
  }

  .icon-box {
    visibility: hidden;
  }
}
.option-group-item {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

// fieldset
fieldset {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0 0 22px 0;
  border: none;

  legend {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding-bottom: 18px;
    font-weight: 500;
    color: rgba(0, 0, 0, .6);
  }
}

.form-item {
  display: flex;
  align-items: center;

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

.form-item-spec {
  flex-direction: column;
  align-items: flex-start;
  .form-label {
    width: unset;
  }
}

.params-plus {
  display: flex;
  align-items: center;
  gap: 10px;
}

.add-remove-event {
  display: flex;
  gap: 10px;
}
</style>
