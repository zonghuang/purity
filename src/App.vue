<template>
  <Render :elements="elements" />
  <lyy-btn></lyy-btn>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElementT } from "./render/element.type";

const elements = ref([
  {
    version: 'v1',
    uuid: "s001",
    name: "el-button",
    style: { k: ''},
    animations: [],
    config: { k: 'kk'},
    events: { h: 'df'},
    childrens: [
      {
        version: 'v1',
        uuid: "s002",
        name: "el-input",
        style: { width: '100px' },
        animations: [],
        config: {},
        events: {},
        childrens: [],
        data: "",
      },
      {
        version: 'v1',
        uuid: "s003",
        name: "el-button",
        style: {},
        animations: [],
        config: {},
        events: {},
        childrens: [],
        data: "提交",
      },
      {
        version: 'v1',
        uuid: "s005",
        name: 'zh-button',
        style: {},
        animations: [],
        config: {},
        events: {},
        childrens: [],
        data: "我的按钮广告",
      },
      {
        version: 'v1',
        uuid: "s006",
        name: 'zh-input',
        style: {},
        animations: [],
        config: {},
        events: {},
        childrens: [],
        data: "我的输入框",
      },
      {
        version: 'v1',
        uuid: "s006",
        name: 'zh-select',
        style: {},
        animations: [],
        config: {},
        events: {},
        childrens: [],
        data: "我的选择器",
      },
      {
        version: 'v1',
        uuid: "s007",
        name: 'lyy-btn',
        style: {},
        animations: [],
        config: {},
        events: {},
        childrens: [],
        data: "我的h",
      }, 

    ],
    data: "page",
  }
]);

</script>
