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
import { ITrbl } from '@/interface-type';

const props = defineProps<{
  modelValue: ITrbl
}>()
const emit = defineEmits(['update:modelValue', 'change'])

const trbl = reactive({ ...props.modelValue })

const stopWatch = watch(props, (newValue) => Object.assign(trbl, newValue.modelValue))
onUnmounted(() => stopWatch())

const handleChange = () => { 
  emit('update:modelValue', trbl)
  emit('change', trbl)
}

const addTop = () => addOne('top', trbl.top)
const addRight = () => addOne('right', trbl.right)
const addBottom = () => addOne('bottom', trbl.bottom)
const addLeft = () => addOne('left', trbl.left)

const addOne = (type: string, x: string | number = 0) => {
  if (!x) x = 0
  const result = parseFloat(String(x)) + 1 + 'px'
  Object.assign(trbl, { [type]: result })
  handleChange()
}

const reset = () => {
  Object.assign(trbl, { top: '', right: '', bottom: '', left: '' })
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
  height: 32px;
  text-align: center;
}

.gridview {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 70px;
  height: 70px;
}

.reset,
.top,
.right,
.bottom,
.left {
  display: flex;
  justify-content: center;
  color: #666;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}

.reset {
  align-items: center;
}

.top {
  align-items: flex-end;
}

.bottom {
  align-items: flex-start;
}

.left {
  align-items: center;
}

.right {
  align-items: center;
}
</style>
