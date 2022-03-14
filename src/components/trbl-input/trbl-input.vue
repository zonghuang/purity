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
        <div class="top" @click="addTop">
          <el-icon size="18px"><top /></el-icon>
        </div>
        <div></div>
        <div class="left" @click="addLeft">
          <el-icon size="18px"><back /></el-icon>
        </div>
        <div class="reset" @click="reset">
          <el-icon size="20px"><refresh /></el-icon>
        </div>
        <div class="right" @click="addRight">
          <el-icon size="18px"><right /></el-icon>
        </div>
        <div></div>
        <div class="bottom" @click="addBottom">
          <el-icon size="18px"><bottom /></el-icon>
        </div>
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
const emit = defineEmits(['update:modelValue', 'change'])

const trbl = reactive({ ...props.modelValue })
const handleChange = () => { 
  emit('update:modelValue', trbl)
  emit('change', trbl)
}
const reset = () => {
  trbl.top = ''
  trbl.right = ''
  trbl.bottom = ''
  trbl.left = ''
  handleChange()
}

const addOne = (x: string | number | undefined) => {
  if (!x) x = '0'
  x = String(x)
  return parseFloat(x) + 1 + 'px'
}

const addTop = () => { 
  trbl.top = addOne(trbl.top)
  handleChange()
}
const addLeft = () => {
  trbl.left = addOne(trbl.left)
  handleChange()
}
const addRight = () => { 
  trbl.right = addOne(trbl.right)
  handleChange()
}
const addBottom = () => {
  trbl.bottom = addOne(trbl.bottom)
  handleChange()
}
</script>

<style scoped lang="less">
.trbl-input {
  width: 100%;
}
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
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;

  &:hover {
    color: #409eff;
  }
}

.top {
  display: flex;
  align-items: flex-end;
  justify-content: center;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #409eff;
  }
}

.bottom {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #409eff;
  }
}

.left {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #409eff;
  }
}

.right {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  color: #666;

  &:hover {
    color: #409eff;
  }
}
</style>
