<template>
  <div v-if="style" class="style-config">
    <el-collapse v-model="activeName">
      <el-collapse-item
        v-for="category in styleCategorys"
        :key="category.value"
        :title="category.label"
        :name="category.value"
      >
        <div v-if="category.value === 'placement'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="display">
              <el-select v-model="style.display" placeholder="Select">
                <el-option
                  v-for="item in displays"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <template v-if="style.display === 'flex'">
              <el-form-item label="flex-direction">
                <el-select v-model="style.flexDirection" placeholder="Select">
                  <el-option
                    v-for="item in flexDirectionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="flex-wrap">
                <el-select v-model="style.flexWrap" placeholder="Select">
                  <el-option
                    v-for="item in flexWrapOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="align-items">
                <el-select v-model="style.alignItems" placeholder="Select">
                  <el-option
                    v-for="item in alignItemsOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="justify-content">
                <el-select v-model="style.justifyContent" placeholder="Select">
                  <el-option
                    v-for="item in justifyContentOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="align-self">
                <el-select v-model="style.alignSelf" placeholder="Select">
                  <el-option
                    v-for="item in alignSelfOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="间距">
                <el-input v-model="style.rowGap" placeholder="请输入行间距" :style="{ width: '145px', marginRight: '10px' }" />
                <el-input v-model="style.columnGap" placeholder="请输入列间距" :style="{ width: '145px' }" />
            </el-form-item>
            </template>

            <el-form-item label="定位">
              <el-select v-model="style.position" placeholder="Select" clearable>
                <el-option
                  v-for="item in positions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item v-if="style.position" label="顶部 | 右边 | 底部 | 左边">
              <trbl-input v-model="trbl" @change="handleTrbl"></trbl-input>
            </el-form-item>

            <el-form-item label="浮动">
              <el-select v-model="style.float" placeholder="Select" clearable>
                <el-option
                  v-for="item in floatOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="清除浮动">
              <el-select v-model="style.clear" placeholder="Select" clearable>
                <el-option
                  v-for="item in clearOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="堆叠层级">
              <el-input v-model="style.zIndex" placeholder="请输入数字" />
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="category.value === 'boxmodel'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="宽高">
              <el-input v-model="style.width" placeholder="请输入宽度" :style="{ width: '145px', marginRight: '10px' }" />
              <el-input v-model="style.height" placeholder="请输入高度" :style="{ width: '145px' }" />
            </el-form-item>
            <el-form-item label="最小宽高">
              <el-input v-model="style.minWidth" placeholder="请输入最小宽度" :style="{ width: '145px', marginRight: '10px' }" />
              <el-input v-model="style.minHeight" placeholder="请输入最小高度" :style="{ width: '145px' }" />
            </el-form-item>
            <el-form-item label="最大宽高">
              <el-input v-model="style.maxWidth" placeholder="请输入最大宽度" :style="{ width: '145px', marginRight: '10px' }" />
              <el-input v-model="style.maxHeight" placeholder="请输入最大高度" :style="{ width: '145px' }" />
            </el-form-item>

            <el-form-item label="外边距">
              <trbl-input v-model="mtrbl" @change="handleMtrbl"></trbl-input>
            </el-form-item>
            <el-form-item label="内边距">
              <trbl-input v-model="ptrbl" @change="handlePtrbl"></trbl-input>
            </el-form-item>

            <el-form-item label="边框/圆角">
              <el-input v-model="style.border" placeholder="请输入边框" :style="{ width: '145px', marginRight: '10px' }" />
              <el-input v-model="style.borderRadius" placeholder="请输入圆角" :style="{ width: '145px' }" />
            </el-form-item>

            <el-form-item label="背景">
              <el-input v-model="style.background" placeholder="请输入背景" />
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="category.value === 'font'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="文字字体">
              <el-input v-model="style.fontFamily" placeholder="请输入文字字体" />
            </el-form-item>
            <el-form-item label="文字大小">
              <el-input v-model="style.fontSize" placeholder="请输入文字大小" />
            </el-form-item>
            <el-form-item label="文字粗细">
              <el-input v-model="style.fontWeight" placeholder="请输入文字粗细" />
            </el-form-item>
            <el-form-item label="文字颜色">
              <el-input v-model="style.color" placeholder="请输入文字颜色" />
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="category.value === 'text'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="水平文字对齐方式">
              <el-input v-model="style.textAlign" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="垂直文字对齐方式">
              <el-input v-model="style.verticalAlign" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="text-wrap">
              <el-input v-model="style.textWrap" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="text-indent">
              <el-input v-model="style.textIndent" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="letter-spacing ">
              <el-input v-model="style.letterSpacing " placeholder="请输入" />
            </el-form-item>
            <el-form-item label="word-spacing">
              <el-input v-model="style.wordSpacing" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="white-space">
              <el-input v-model="style.whiteSpace" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="text-overflow">
              <el-input v-model="style.textOverflow" placeholder="请输入" />
            </el-form-item>
          </el-form>
        </div>

         <div v-else-if="category.value === 'userinput'" class="user-input">
          <div class="list-head">
            <label class="list-head_label">键</label>
            <label class="list-head_label">值</label>
            <span class="icon-box">
              <el-icon size="16px"></el-icon>
            </span>
          </div>
          <div v-for="(item, index) in styleGroups" class="list-body">
            <el-input v-model="item.key" @change="changeStyleGroups" placeholder="属性" clearable />
            <el-input v-model="item.value" @change="changeStyleGroups" placeholder="属性值" clearable />
            <span class="icon-box icon-box-delete" @click="removeStyleGroup(index)">
              <el-icon size="16px"><delete /></el-icon>
            </span>
          </div>

          <span class="icon-box" @click="addStyleGroup">
            <el-icon size="16px"><plus /></el-icon>
          </span>
         </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { useEditStore } from '@/store/edit'
import { IStyle } from '@/interface-type'

import {
  styleCategorys,
  floatOptions,
  clearOptions,
  positions,
  displays,
  flexDirectionOptions,
  flexWrapOptions,
  alignItemsOptions,
  justifyContentOptions,
  alignSelfOptions
} from '@/mock-data'

const editStore = useEditStore()

const activeName = ref('boxmodel')
const styleGroups: IStyle[] = reactive([])
const style = computed(() => editStore.currentComponent?.style)

const trbl = computed({
  get: () => {
    const { top, right, bottom, left } = style.value
    return { top, right, bottom, left }
  },
  set: newValue => newValue
})
const mtrbl = computed({
  get: () => {
    const { marginTop: top, marginRight: right, marginBottom: bottom, marginLeft: left } = style.value
    return { top, right, bottom, left }
  },
  set: newValue => newValue
})
const ptrbl = computed({
  get: () => {
    const { paddingTop: top, paddingRight: right, paddingBottom: bottom, paddingLeft: left } = style.value
    return { top, right, bottom, left }
  },
  set: newValue => newValue
})
const handleTrbl = (trbl: IStyle) => Object.assign(style.value, trbl)
const handleMtrbl = (trbl: IStyle) => {
  const { top: marginTop, right: marginRight, bottom: marginBottom, left: marginLeft } = trbl
  Object.assign(style.value, { marginTop, marginRight, marginBottom, marginLeft })
}
const handlePtrbl = (trbl: IStyle) => {
  const { top: paddingTop, right: paddingRight, bottom: paddingBottom, left: paddingLeft } = trbl
  Object.assign(style.value, { paddingTop, paddingRight, paddingBottom, paddingLeft })
}

const addStyleGroup = () => styleGroups.push({ key: '', value: '' })  
const removeStyleGroup = (index: number) => {
  const key = toRaw(styleGroups[index]).key
  delete style.value[key]
  styleGroups.splice(index, 1)
  changeStyleGroups()
}
const changeStyleGroups = () => {
  const inputStyle: IStyle = {}
  styleGroups.forEach(item => inputStyle[item.key] = item.value)
  Object.assign(style.value, inputStyle)
}
</script>

<style scoped lang="less">

</style>
