<template>
  <div class="event-config">
    <div v-if="!events?.length && editStore.currentComponent.events">
      <el-button type="text" @click="addEvent(events, true)">添加事件</el-button>
    </div>

    <div v-else class="first-level" v-for="(firstEv, index) in events">
      <div class="evnet">
        <event-group
          :level="'first'"
          :index="index"
          :event="firstEv"
          @addEvent="addEvent(events, true)"
          @addThenEvent="addThenEvent(firstEv)"
          @removeEvent="removeEvent(events, index)"
          @change="handleChange($event, firstEv)"
        ></event-group>
      </div>
      <div class="then-event">

        <div class="second-level" v-for="(secondEv, indey) in firstEv.thenEvents" :key="indey">
          <div class="evnet">
            <event-group
              :level="'second'"
              :index="indey"
              :event="secondEv"
              @addEvent="addEvent(firstEv.thenEvents || [])"
              @addThenEvent="addThenEvent(secondEv)"
              @removeEvent="removeEvent(firstEv.thenEvents || [], indey)"
              @change="handleChange($event, secondEv)"
            ></event-group>
          </div>
          <div class="then-event">

            <div class="third-level" v-for="(thirdEv, indez) in secondEv.thenEvents">
              <div class="evnet">
                <event-group
                  :level="'third'"
                  :index="indez"
                  :event="thirdEv"
                  @addEvent="addEvent(secondEv.thenEvents || [])"
                  @addThenEvent="addThenEvent(thirdEv)"
                  @removeEvent="removeEvent(secondEv.thenEvents || [], indez)"
                  @change="handleChange($event, thirdEv)"
                ></event-group>
              </div>
              <div class="then-event">

                <div class="fourth-level" v-for="(fourthEv, indem) in thirdEv.thenEvents">
                  <div class="evnet">
                    <event-group
                      :level="'fourth'"
                      :index="indem" 
                      :event="fourthEv"
                      @addEvent="addEvent(thirdEv.thenEvents || [])"
                      @addThenEvent="addThenEvent(fourthEv)"
                      @removeEvent="removeEvent(thirdEv.thenEvents || [], indem)"
                      @change="handleChange($event, fourthEv)"
                    ></event-group>
                  </div>
                  <div class="then-event">

                    <div class="fifth-level" v-for="(fifthEv, inden) in fourthEv.thenEvents">
                      <div class="evnet">
                        <event-group
                          :level="'fifth'"
                          :index="inden"
                          :event="fifthEv"
                          @addEvent="addEvent(fourthEv.thenEvents || [])"
                          @addThenEvent="addThenEvent(fifthEv)"
                          @removeEvent="removeEvent(fourthEv.thenEvents || [], inden)"
                          @change="handleChange($event, fifthEv)"
                        ></event-group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { IEvent } from '@/interface-type';
import { useEditStore } from '@/store/edit'

const editStore = useEditStore()

const events = computed({
  get: () => editStore.currentComponent.events,
  set: (val: IEvent[]) => val
})

const handleChange = (eventGroup: IEvent, eventConfig: IEvent) => {
  Object.assign(eventConfig, toRaw(eventGroup))
}

const addEvent = (events: IEvent[], isFirst?: boolean) => {
  if (!events) return
  if (isFirst) {
    events.push({
      userAction: 'click',
      trigger: [{ logical: '', conditions: [] }],
      command: '',
      modalId: '',
      link: '', aTarget: '',
      api: '', method: '', params: [],
      thenEvents: []
    })
  } else {
    events.push({
      trigger: [{ logical: '', conditions: [] }],
      command: '',
      modalId: '',
      link: '', aTarget: '',
      api: '', method: '', params: [],
      thenEvents: []
    })
  }
}

const addThenEvent = (eventConfig: IEvent) => {
  // @ts-ignore
  eventConfig.thenEvents.push({
    trigger: [{ logical: '', conditions: [] }],
    command: '',
    modalId: '',
    link: '', aTarget: '',
    api: '', method: '', params: [],
    thenEvents: []
  })
}

const removeEvent = (events: IEvent[], index: number) => {
  events.splice(index, 1)
}
</script>

<style scoped lang="less">
.event-config {
  padding: 0 8px;
}

.second-level,
.third-level,
.fourth-level,
.fifth-level {
  padding-left: 10px;
}
</style>