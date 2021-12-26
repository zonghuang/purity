<template>
  <HelloWorld data="Hello Vue 3 + TypeScript + Vite" />
  <Render :elements="elements" />
<zh-button :data="'bu'"></zh-button>
<zh-input :data="'in'"></zh-input>
<zh-input-test></zh-input-test>
<lyy-button></lyy-button>
<lyy-btn></lyy-btn>


<van-button type="primary" icon="plus" size="small">主要按钮</van-button>
<el-button type="success">Success</el-button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Render from "./render/Render.vue";
import { ElementT } from "./render/element.type";
// import LyyBtn from "./admin/components/lyy-btn.vue";
// import HelloWorld from "./components/HelloWorld.vue";
// import ZhInputTest from "./components/zh-input/zh-input-test.vue";

const elements = ref([
  {
    version: 'v1',
    uuid: "s001",
    name: "el-button",
    style: {},
    animations: {},
    config: {},
    events: {},
    childrens: [
      {
        version: 'v1',
        uuid: "s002",
        name: "el-input",
        style: { width: '100px' },
        animations: {},
        config: {},
        events: {},
        data: "",
      },
      {
        version: 'v1',
        uuid: "s003",
        name: "el-button",
        style: {},
        animations: {},
        config: {},
        events: {},
        childrens: [],
        data: "提交",
      },
      // {
      //   version: 'v1',
      //   uuid: "s004",
      //   name: HelloWorld,
      //   style: {},
      //   animations: {},
      //   config: {},
      //   events: {},
      //   childrens: [],
      //   data: "hello world",
      // },
      // {
      //   version: 'v1',
      //   uuid: "s005",
      //   name: 'zh-button',
      //   style: {},
      //   animations: {},
      //   config: {},
      //   events: {},
      //   childrens: [],
      //   data: "我的按钮",
      // },
      // {
      //   version: 'v1',
      //   uuid: "s006",
      //   name: 'zh-input',
      //   style: {},
      //   animations: {},
      //   config: {},
      //   events: {},
      //   childrens: [],
      //   data: "我的输入框",
      // },
    ],
    data: "page",
  }
]);

</script>
