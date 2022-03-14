<template>
  <div class="event-group">
    <form class="form" onsubmit="return false">

      <div v-if="level === 'first'" class="form-item user-action">
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

      <fieldset>
        <legend>
          {{ level }} level - 事件 {{ index + 1 }}
          <div class="add-remove-event">
            <el-tooltip effect="light" content="添加事件" placement="bottom">
              <span class="box-item" @click="addEvent">
                <el-icon size="16px">
                  <plus />
                </el-icon>
              </span>
            </el-tooltip>
            <el-tooltip v-if="level !== 'fifth'" effect="light" content="添加then事件" placement="bottom">
              <span class="box-item" @click="addThenEvent">
                <el-icon size="16px">
                  <plus />
                </el-icon>
              </span>
            </el-tooltip>
            <el-tooltip effect="light" content="删除事件" placement="bottom">
              <span class="box-item" @click="removeEvent">
                <el-icon size="16px">
                  <delete />
                </el-icon>
              </span>
            </el-tooltip>
          </div>
        </legend>

        <div class="form-item">
          <label class="form-label">触发条件</label>
          <div class="form-content">
            <el-button type="text">添加条件</el-button>
            <span class="tips">（默认无）</span>
          </div>
        </div>

        <div class="form-item">
          <label class="form-label">触发事件<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-select v-model="eventGroup.command" @change="handleChange" placeholder="请选择事件" clearable>
              <el-option
                v-for="item in eventOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div v-if="eventGroup.command === 'openModal' || eventGroup.command === 'closeModal'" class="form-item">
          <label class="form-label">模态框<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-select v-model="eventGroup.modalId" @change="handleChange" placeholder="请选择模态框" clearable>
              <el-option
                v-for="item in modalList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
        </div>

        <div v-if="eventGroup.command === 'link'" class="form-item">
          <label class="form-label">跳转链接<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-input v-model="eventGroup.link" @change="handleChange" placeholder="请输入链接" clearable></el-input>
          </div>
        </div>
        <div v-if="eventGroup.command === 'link'" class="form-item">
          <label class="form-label">跳转方式<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-radio-group v-model="eventGroup.aTarget" @change="handleChange">
              <el-radio label="_self">当前页面加载</el-radio>
              <el-radio label="_blank">新窗口打开</el-radio>
            </el-radio-group>
          </div>
        </div>

        <div v-if="eventGroup.command === 'request'" class="form-item">
          <label class="form-label">请求接口<abbr title="required">*</abbr></label>
          <div class="form-content">
            <el-input v-model="eventGroup.api" @change="handleChange" placeholder="请输入api" clearable></el-input>
          </div>
        </div>
        <div v-if="eventGroup.command === 'request'" class="form-item">
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
        <div v-if="eventGroup.command === 'request'" class="form-item form-item-column">
          <label class="form-label form-label-block">参数</label>
          <div class="form-content">
            <div v-for="one in eventGroup.params" class="key-value-group">
              <template v-if="one.type === 'input-keyValue'">
                <div class="key">
                  <label class="label">键</label>
                  <el-input v-model="one.key" @change="handleChange" placeholder="请输入键" clearable></el-input>
                </div>
                <div class="value">
                  <label class="label">值</label>
                  <el-input v-model="one.value" @change="handleChange" placeholder="请输入值" clearable></el-input>
                </div>
              </template>

              <template v-if="one.type === 'inputKey-selectValue'">
                <div class="key">
                  <label class="label">键</label>
                  <el-input v-model="one.key" @change="handleChange" placeholder="请输入键" clearable></el-input>
                </div>
                <div class="value">
                  <label class="label">值</label>
                  <el-select v-model="one.value" @change="handleChange" placeholder="请选择值" clearable>
                    <el-option
                      v-for="item in keyValueOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </template>

              <template v-if="one.type === 'select-keyValue'">
                <div class="value">
                  <label class="label-spec">键-值</label>
                  <el-select v-model="one.keyValue" @change="handleChange" placeholder="请选择键值" clearable>
                    <el-option
                      v-for="item in keyValueOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </template>
            </div>

            <div class="params-plus">
              <label class="form-label">添加参数</label>
              <el-tooltip effect="light" content="输入键值" placement="bottom">
                <span class="box-item" @click="addParam('input-keyValue')">
                  <el-icon size="18px">
                    <edit-pen />
                  </el-icon>
                </span>
              </el-tooltip>
              <el-tooltip effect="light" content="输入键，选择值" placement="bottom">
                <span class="box-item" @click="addParam('inputKey-selectValue')">
                  <el-icon size="18px">
                    <zoom-in />
                  </el-icon>
                </span>
              </el-tooltip>
              <el-tooltip effect="light" content="选择键值" placement="bottom">
                <span class="box-item" @click="addParam('select-keyValue')">
                  <el-icon size="18px">
                    <plus />
                  </el-icon>
                </span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
import { IElement, IEvent } from '@/interface-type';
import { userActionOptions, eventOptions, methodOptions } from '@/mock-data';
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()

const props = defineProps<{
  level: string
  index: number
  event: IEvent
}>()
const emit = defineEmits(['change', 'addEvent', 'addThenEvent', 'removeEvent'])

const eventGroup = reactive({ ...props.event })
const modalList = computed(() => editStore.currentPage.modalList)
const keyValueOptions = computed(() => 
  getKeyValueOptions(editStore.currentPage.elements, [])
)

const addEvent = () => emit('addEvent')
const addThenEvent = () => emit('addThenEvent')
const removeEvent = () => emit('removeEvent')
const handleChange = () => emit('change', eventGroup)

const getKeyValueOptions = (tree: IElement[], arr: any) => {
  tree && tree.forEach(item => {
    // label 应该取 item.propConfig.name，这里取 item.name 是临时测试
    arr.push({ label: item.name, value:item.uuid })
    if (item.childrens) getKeyValueOptions(item.childrens, arr)
  })
  return arr
}

const addParam = (type: string) => {
  if (type === 'input-keyValue') {
    // @ts-ignore
    eventGroup.params.push({ key: '', value: '', type: 'input-keyValue' })
  } else if (type === 'inputKey-selectValue') {
    // @ts-ignore
    eventGroup.params.push({ key: '', value: '', type: 'inputKey-selectValue' })
  } else if (type === 'select-keyValue') {
    // @ts-ignore
    eventGroup.params.push({ keyValue: '', type: 'select-keyValue' })
  }
}
</script>

<style scoped lang="less">
.el-select {
  width: 100%;
}
.el-radio {
  margin-right: 15px;
}

.event-group {
  padding: 16px 0;
}

.box-item {
  margin-right: 22px;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}

abbr {
  color: #f56c6c;
}

.form {
  font-size: 14px;

  .user-action {
    margin-bottom: 22px;
  }

  fieldset {
    display: flex;
    flex-direction: column;
    row-gap: 22px;
    margin: 0;
    padding: 0;
    border: none;

    legend {
      display: flex;
      align-items: center;
      column-gap: 22px;
      width: 100%;
      height: 25px;
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

      .tips {
        font-size: 12px;
        color: #888;
      }

      .params-plus {
        display: flex;
        align-items: center;
      }

      .key-value-group {
        display: flex;
        margin-bottom: 15px;

        .label {
          width: 22px;
          display: flex;
          align-items: center;
        }
        .label-spec {
          width: 55px;
          display: flex;
          align-items: center;
        }

        .key {
          display: flex;
          margin-right: 10px;
          .el-input {
            width: 100px;
          }
        }

        .value {
          display: flex;
          flex: 1;
        }
      }
    }
  }

  .form-item-column {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
