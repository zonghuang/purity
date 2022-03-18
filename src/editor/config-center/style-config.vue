<template>
  <div v-if="style" class="style-config">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item
        v-for="category in categorys"
        :key="category.value"
        :title="category.label"
        :name="category.value"
      >
        <div v-if="category.value === 'elementplus'">
          
        </div>

        <div v-else-if="category.value === 'placement'">
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
              <el-input v-model="style.zIndex" placeholder="请输入数字"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="category.value === 'boxmodel'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="宽高">
              <el-input v-model="style.width" placeholder="请输入宽度" :style="{ width: '145px', marginRight: '10px' }"></el-input>
              <el-input v-model="style.height" placeholder="请输入高度" :style="{ width: '145px' }"></el-input>
            </el-form-item>
            <el-form-item label="最小宽高">
              <el-input v-model="style.minWidth" placeholder="请输入最小宽度" :style="{ width: '145px', marginRight: '10px' }"></el-input>
              <el-input v-model="style.minHeight" placeholder="请输入最小高度" :style="{ width: '145px' }"></el-input>
            </el-form-item>
            <el-form-item label="最大宽高">
              <el-input v-model="style.maxWidth" placeholder="请输入最大宽度" :style="{ width: '145px', marginRight: '10px' }"></el-input>
              <el-input v-model="style.maxHeight" placeholder="请输入最大高度" :style="{ width: '145px' }"></el-input>
            </el-form-item>

            <el-form-item label="外边距">
              <trbl-input v-model="mtrbl" @change="handleMtrbl"></trbl-input>
            </el-form-item>
            <el-form-item label="内边距">
              <trbl-input v-model="ptrbl" @change="handlePtrbl"></trbl-input>
            </el-form-item>

            <el-form-item label="边框/圆角">
              <el-input v-model="style.border" placeholder="请输入边框" :style="{ width: '145px', marginRight: '10px' }"></el-input>
              <el-input v-model="style.borderRadius" placeholder="请输入圆角" :style="{ width: '145px' }"></el-input>
            </el-form-item>

            <el-form-item label="背景">
              <el-input v-model="style.background" placeholder="请输入背景"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="category.value === 'font'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="文字字体">
              <el-input v-model="style.fontFamily" placeholder="请输入文字字体"></el-input>
            </el-form-item>
            <el-form-item label="文字大小">
              <el-input v-model="style.fontSize" placeholder="请输入文字大小"></el-input>
            </el-form-item>
            <el-form-item label="文字粗细">
              <el-input v-model="style.fontWeight" placeholder="请输入文字粗细"></el-input>
            </el-form-item>
            <el-form-item label="文字颜色">
              <el-input v-model="style.color" placeholder="请输入文字颜色"></el-input>
            </el-form-item>
          </el-form>
        </div>

        <div v-else-if="category.value === 'text'">
          <el-form :model="style" label-position="top" label-width="120px">
            <el-form-item label="水平文字对齐方式">
              <el-input v-model="style.textAlign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="垂直文字对齐方式">
              <el-input v-model="style.verticalAlign" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="text-wrap">
              <el-input v-model="style.textWrap" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="text-indent">
              <el-input v-model="style.textIndent" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="letter-spacing ">
              <el-input v-model="style.letterSpacing " placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="word-spacing">
              <el-input v-model="style.wordSpacing" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="white-space">
              <el-input v-model="style.whiteSpace" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="text-overflow">
              <el-input v-model="style.textOverflow" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>
        </div>

         <div v-else-if="category.value === 'userinput'" class="user-input">
          <div v-for="(item, index) in styleGroups" class="style-group">
            <div class="key">
              <label class="label">键</label>
              <el-input v-model="item.key" @change="changeStyleGroups" placeholder="属性" clearable></el-input>
            </div>
            <div class="value">
              <label class="label">值</label>
              <el-input v-model="item.value" @change="changeStyleGroups" placeholder="属性值" clearable></el-input>
            </div>
            <span class="box-item" @click="removeStyleGroup(index)">
              <el-icon size="18px"><delete /></el-icon>
            </span>
          </div>

          <span class="box-item" @click="addStyleGroup">
            <el-icon size="18px"><plus /></el-icon>
          </span>
         </div>

      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
import { IStyle } from '@/interface-type';
import { useEditStore } from '@/store/edit'
import {
  categorys,
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
const style = computed(() => editStore.currentComponent.style)

const activeNames = ref('boxmodel')
const styleGroups: any = reactive([])
const trbl = computed({
  get: () => {
    return {
      top: editStore.currentComponent.style.top,
      right: editStore.currentComponent.style.right,
      bottom: editStore.currentComponent.style.bottom,
      left: editStore.currentComponent.style.left
    }
  },
  set: (val: any) => val
})
const mtrbl = computed({
  get: () => {
    return {
      top: editStore.currentComponent.style.marginTop,
      right: editStore.currentComponent.style.marginRight,
      bottom: editStore.currentComponent.style.marginBottom,
      left: editStore.currentComponent.style.marginLeft
    }
  },
  set: (val: any) => val
})
const ptrbl = computed({
  get: () => {
    return {
      top: editStore.currentComponent.style.paddingTop,
      right: editStore.currentComponent.style.paddingRight,
      bottom: editStore.currentComponent.style.paddingBottom,
      left: editStore.currentComponent.style.paddingLeft
    }
  },
  set: (val: any) => val
})

function handleChange(value: string) {
  // console.log(value)
}

const handleTrbl = (trbl: IStyle) => {
  style.value.top = trbl.top
  style.value.right = trbl.right
  style.value.bottom = trbl.bottom
  style.value.left = trbl.left
}

const handleMtrbl = (trbl: IStyle) => {
  style.value.marginTop = trbl.top
  style.value.marginRight = trbl.right
  style.value.marginBottom = trbl.bottom
  style.value.marginLeft = trbl.left
}

const handlePtrbl = (trbl: IStyle) => {
  style.value.paddingTop = trbl.top
  style.value.paddingRight = trbl.right
  style.value.paddingBottom = trbl.bottom
  style.value.paddingLeft = trbl.left
}

const changeStyleGroups = () => {
  const inputStyle: any = {}
  styleGroups.forEach((item: any) => {
    inputStyle[item.key] = item.value
  })

  Object.assign(style.value, inputStyle)
}

const addStyleGroup = () => styleGroups.push({ key: '', value: '' })  
const removeStyleGroup = (index: number) => {
  const key = toRaw(styleGroups[index]).key
  delete style.value[key]
  styleGroups.splice(index, 1)
  changeStyleGroups()
}
</script>

<style scoped lang="less">
.el-select {
  width: 100%;
}

.style-config {

}

:deep(.el-collapse-item__header) {
  padding-left: 10px;
}
:deep(.el-collapse-item__content) {
  padding: 10px;
}

.user-input {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}
.style-group {
  display: flex;
  flex-direction: row;
  align-items: center;
  column-gap: 10px;

  .key, .value {
    display: flex;
    align-items: center;
    column-gap: 10px;
  }

  .box-item {
    cursor: pointer;

    &:hover {
      color: #409eff;
    }
  }
}
</style>