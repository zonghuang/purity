<template>
  <div class="event-config">
    事件配置

    <!-- 临时的，后面补充更完整的配置项 -->
    <h5>选择事件</h5>
    <el-select v-model="firstEv.command" placeholder="请选择事件" @change="handleChange">
      <el-option
        v-for="item in eventOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="firstEv.modalId" placeholder="请选择模态框" @change="handleChange">
      <el-option
        v-for="item in modalList"
        :key="item.id"
        :label="item.id"
        :value="item.id">
      </el-option>
    </el-select>
    <el-input v-model="firstEv.link" placeholder="请输入跳转链接" @change="handleChange"></el-input>
    <el-input v-model="firstEv.api" placeholder="请输入请求api" @change="handleChange"></el-input>

    <h5>下一步事件（即上面的事件执行完再触发）</h5>
    <el-select v-model="nextEv.command" placeholder="请选择事件" @change="handleChange">
      <el-option
        v-for="item in eventOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-select v-model="nextEv.modalId" placeholder="请选择模态框" @change="handleChange">
      <el-option
        v-for="item in eventOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-input v-model="nextEv.link" placeholder="请输入跳转链接" @change="handleChange"></el-input>
    <el-input v-model="nextEv.api" placeholder="请输入请求api" @change="handleChange"></el-input>

    <h5>同步事件（即与多个事件同步执行）</h5>
    ……

  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useEditStore } from '../store/edit'

const editStore = useEditStore()

const firstEv: any = reactive({})
const nextEv: any = reactive({})
const modalList = computed(() => editStore.currentPage.modalList)


const eventOptions = [
  { label: '打开弹窗', value: 'openModal' },
  { label: '关闭弹窗', value: 'closeModal' },
  { label: '跳转链接', value: 'jump' },
  { label: '请求数据', value: 'request' },
]

const handleChange = () => {
  const { name, events } = editStore.currentComponent
  if (name === 'zh-button' && events) {
    if (!events.length) {
      editStore.currentComponent.events?.push(firstEv)
    } else {
      if (nextEv.command) {
        firstEv.thenEvents = [nextEv]
      }
      console.log('+++');
      
      editStore.currentComponent.events?.splice(0, 1, firstEv)
    }
  }
  console.log(editStore.currentComponent)
}
</script>

<style scoped>

</style>