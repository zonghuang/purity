<template>
  <div class="trbl-input">
    <div class="top-input">
      <el-input class="input" v-model="trbl.top" placeholder="顶部" @change="handleChange" />
    </div>
    <div class="left-reset-right">
      <div class="left-input">
        <el-input class="input" v-model="trbl.left" placeholder="左边" @change="handleChange" />
      </div>
      <div class="gridview">
        <div></div>
        <div class="top"></div>
        <div></div>
        <div class="left"></div>
        <div class="reset" @click="reset"></div>
        <div class="right"></div>
        <div></div>
        <div class="bottom"></div>
        <div></div>
      </div>
      <div class="right-input">
        <el-input class="input" v-model="trbl.right" placeholder="右边" @change="handleChange" />
      </div>
    </div>
    <div class="bottom-input">
      <el-input class="input" v-model="trbl.bottom" placeholder="底部" @change="handleChange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IStyle } from '@/interface-type';

const props = defineProps<{
  modelValue: IStyle
}>()
const emit = defineEmits(['update:modelValue'])

const trbl = reactive({ ...props.modelValue })
const handleChange = () => emit('update:modelValue', trbl)
const reset = () => {
  trbl.top = ''
  trbl.right = ''
  trbl.bottom = ''
  trbl.left = ''
  emit('update:modelValue', trbl)
}
</script>

<style scoped>
.top-input,
.bottom-input {
  display: flex;
  justify-content: center;
}
.left-reset-right {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.input {
  width: 80px;
  height: 28px;
  text-align: center;
}

.gridview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 70px;
  height: 70px;
}
.reset {
  border-radius: 50%;
  background: #ccc;
}

.top,
.right,
.bottom,
.left {
  width: 0;
  height: 0;
  border: 10px solid transparent;
}
.top {
  border-bottom: 15px solid rgb(8, 190, 245);
}
.bottom {
  border-top: 15px solid rgb(8, 190, 245);
}
.left {
  border-right: 15px solid rgb(8, 190, 245);
}
.right {
  border-left: 15px solid rgb(8, 190, 245);
}
</style>
