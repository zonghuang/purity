<template>
  <div class="event-config">
    <el-collapse v-if="events.length">
      <el-collapse-item v-for="(firstEv, index) in events" :key="index">
        <template #title>
          <div class="title">first-level 事件 {{ index + 1 }}</div>
          <div class="add-remove-event">
            <el-tooltip content="添加 then 事件" placement="top">
              <span class="icon-box" @click="$event.stopPropagation(); addThenEvent(firstEv)">
                <el-icon size="16px"><circle-plus /></el-icon>
              </span>
            </el-tooltip>
            <el-tooltip content="选择其他组件的事件" placement="top">
              <span class="icon-box"
                @click="$event.stopPropagation(); currentIndex = index; showOtherEvent = !showOtherEvent">
                <el-icon size="16px"><zoom-in /></el-icon>
              </span>
            </el-tooltip>
            <el-tooltip content="删除事件" placement="top">
              <span class="icon-box icon-box-delete" @click="$event.stopPropagation(); removeEvent(events, index)">
                <el-icon size="16px"><delete /></el-icon>
              </span>
            </el-tooltip>
          </div>
        </template>

        <form class="form" onsubmit="return false">
          <div v-if="currentIndex === index && showOtherEvent" class="form-item form-item--inline">
            <label class="form-item_label">选择已有事件</label>
            <div class="form-item_content">
              <el-select v-model="otherEvent" @change="selectOtherEvent(firstEv)" placeholder="请选择" clearable>
                <el-option v-for="item in otherEventOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div class="form-item form-item--inline">
            <label class="form-item_label">用户操作<abbr title="required">*</abbr></label>
            <div class="form-item_content">
              <el-select v-model="firstEv.userAction" placeholder="请选择操作" clearable>
                <el-option v-for="item in userActionOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <div v-if="bindCodeOptions?.length" class="form-item form-item--inline">
            <label class="form-item_label">绑定事件
              <el-tooltip content="绑定事件后，只有用户操作了绑定事件，才触发该事件" placement="top">
                <span class="icon-box icon-box-tips">
                  <el-icon size="14"><info-filled /></el-icon>
                </span>
              </el-tooltip>
            </label>
            <div class="form-item_content">
              <el-select v-model="firstEv.bindCode" placeholder="请选择操作" clearable>
                <el-option v-for="item in bindCodeOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>

          <event-group :modelValue="firstEv" @update:modelValue="handleChange($event, firstEv)" />

          <!-- 第二层事件 -->
          <div class="second-level" v-for="(secondEv, indey) in firstEv.thenEvents" :key="indey">
            <div class="event-header">
              <div class="title">second-level 事件 {{ indey + 1 }}</div>
              <div class="add-remove-event">
                <el-tooltip content="添加 then 事件" placement="top">
                  <span class="icon-box" @click="addThenEvent(secondEv)">
                    <el-icon size="16px"><circle-plus /></el-icon>
                  </span>
                </el-tooltip>
                <el-tooltip content="删除事件" placement="top">
                  <span class="icon-box icon-box-delete" @click="removeEvent(firstEv.thenEvents, indey)">
                    <el-icon size="16px"><delete /></el-icon>
                  </span>
                </el-tooltip>
              </div>
            </div>
            <event-group :modelValue="secondEv" @update:modelValue="handleChange($event, secondEv)" />

            <!-- 第三层事件 -->
            <div class="third-level" v-for="(thirdEv, indez) in secondEv.thenEvents" :key="indey">
              <div class="event-header">
                <div class="title">third-level 事件 {{ indez + 1 }}</div>
                <div class="add-remove-event">
                  <el-tooltip content="添加 then 事件" placement="top">
                    <span class="icon-box" @click="addThenEvent(thirdEv)">
                      <el-icon size="16px"><circle-plus /></el-icon>
                    </span>
                  </el-tooltip>
                  <el-tooltip content="删除事件" placement="top">
                    <span class="icon-box icon-box-delete" @click="removeEvent(secondEv.thenEvents, indey)">
                      <el-icon size="16px"><delete /></el-icon>
                    </span>
                  </el-tooltip>
                </div>
              </div>
              <event-group :modelValue="thirdEv" @update:modelValue="handleChange($event, thirdEv)" />

              <!-- 第四层事件 -->
              <div class="fourth-level" v-for="(fourthEv, indez) in thirdEv.thenEvents" :key="indey">
                <div class="event-header">
                  <div class="title">fourth-level 事件 {{ indez + 1 }}</div>
                  <div class="add-remove-event">
                    <el-tooltip content="添加 then 事件" placement="top">
                      <span class="icon-box" @click="addThenEvent(fourthEv)">
                        <el-icon size="16px"><circle-plus /></el-icon>
                      </span>
                    </el-tooltip>
                    <el-tooltip content="删除事件" placement="top">
                      <span class="icon-box icon-box-delete" @click="removeEvent(thirdEv.thenEvents, indey)">
                        <el-icon size="16px"><delete /></el-icon>
                      </span>
                    </el-tooltip>
                  </div>
                </div>
                <event-group :modelValue="fourthEv" @update:modelValue="handleChange($event, fourthEv)" />

                <!-- 第五层事件 -->
                <div class="fifth-level" v-for="(fifthEv, indez) in fourthEv.thenEvents" :key="indey">
                  <div class="event-header">
                    <div class="title">fifth-level 事件 {{ indez + 1 }}</div>
                    <div class="add-remove-event">
                      <el-tooltip content="删除事件" placement="top">
                        <span class="icon-box icon-box-delete" @click="removeEvent(fourthEv.thenEvents, indey)">
                          <el-icon size="16px"><delete /></el-icon>
                        </span>
                      </el-tooltip>
                    </div>
                  </div>
                  <event-group :modelValue="fifthEv" @update:modelValue="handleChange($event, fifthEv)" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </el-collapse-item>
    </el-collapse>

    <div class="event-plus">
      <el-tooltip content="添加事件" placement="top">
        <span class="icon-box" @click="addEvent">
          <el-icon size="16px"><plus /></el-icon>
        </span>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { IElement, IEvent, IEventOption } from '@/interface-type'
import { userActionOptions } from '@/mock-data'

const editStore = useEditStore()
const events = computed({
  get: () => editStore.currentComponent?.events || [],
  set: newValue => newValue
})
const otherEvent = ref('')
const currentIndex = ref(0)
const showOtherEvent = ref(false)

const addEvent = () => {
  const event: IEvent = { userAction: 'click', event: '', option: {} as IEventOption, thenEvents: [] }
  if (editStore.currentComponent?.type === 'table') event.bindCode = ''
  events.value?.push(event)
}

const addThenEvent = (event: IEvent) => {
  const thenEvent = { event: '', option: {} as IEventOption, thenEvents: [] }
  event.thenEvents?.push(thenEvent)
}

const removeEvent = (events: IEvent[], index: number) => {
  events?.splice(index, 1)
}

const handleChange = (sourceEvent: IEvent, targetEvent: IEvent) => {
  Object.assign(targetEvent, toRaw(sourceEvent))
}

const selectOtherEvent = (event: IEvent) => {
  const item = otherEventOptions.value.find(one => one.value === otherEvent.value)
  Object.assign(event, item?.event)
  otherEvent.value = ''
  showOtherEvent.value = false
}

// 其他组件的事件选项
const otherEventOptions = computed(() => getOtherEvents(editStore.currentPage.elements, []))

// 获取其他组件的事件
const getOtherEvents = (tree: IElement[], options: { label: string; value: string; event: IEvent }[]) => {
  tree.forEach(item => {
    item.events.forEach((one, i) => {
      const label = (item.propConfig.alias ?? item.propConfig.label) + '事件' + i
      options.push({ label, value: item.uuid + '-' + i, event: one })
    })
    if (item.childrens?.length) getOtherEvents(item.childrens, options)
  })
  return options
}

// 表格操作列按钮选项
const bindCodeOptions = computed(() => {
  return editStore.currentComponent?.propConfig?.operations?.map((item: { name: string; code: string }) => {
    return { label: item.name, value: item.code }
  })
})
</script>

<style scoped lang="less">
.event-config {

  .second-level,
  .third-level,
  .fourth-level,
  .fifth-level {
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .event-header {
    display: flex;
    font-weight: 500;
    color: rgba(0, 0, 0, .6);
  }

  .event-plus {
    padding: 14px;
  }

  .add-remove-event {
    flex: 1;
    display: flex;
    gap: 10px;
    padding: 0 20px;
  }

  .form {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    gap: 18px;
  }
}
</style>
