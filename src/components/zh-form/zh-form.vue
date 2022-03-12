<template>
  <div class="zh-form">
    <!-- 临时的，到时候会用具名插槽或动态插槽插入各种表单控件，这样每个表单控件都可以配置 -->
    <el-form ref="formRef" :model="formData" label-width="120px">
      
      <el-form-item label="插槽(插入控件)">
        <slot></slot>
      </el-form-item>

      <el-form-item label="Activity name">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item label="Activity zone">
      <el-select v-model="formData.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai"></el-option>
        <el-option label="Zone two" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          v-model="formData.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="formData.date2"
          placeholder="Pick a time"
          style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="formData.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="formData.type">
        <el-checkbox label="Online activities" name="type"></el-checkbox>
        <el-checkbox label="Promotion activities" name="type"></el-checkbox>
        <el-checkbox label="Offline activities" name="type"></el-checkbox>
        <el-checkbox label="Simple brand exposure" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="formData.resource">
        <el-radio label="Sponsor"></el-radio>
        <el-radio label="Venue"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="formData.desc" type="textarea"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">

defineProps<{
  propValue: string
  propConfig: any
}>()

const formData: any = reactive({})

const onSubmit = () => {
  console.log('onSubmit', formData)
}
</script>

<style scoped>
.text-center {
  text-align: center;
}
</style>
