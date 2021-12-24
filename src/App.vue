<template>
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <Render :elements="elements" />
</template>

<script setup lang="ts">
import { ref, reactive, defineComponent } from "vue";
import Render from "./render/Render.vue";
import { ElementT } from "./render/element.type";

const elements = ref([
  {
    uuid: "btn1",
    name: "el-button",
    style: {},
    config: {},
    events: {},
    childrens: [
      {
        uuid: "btn2",
        name: "el-button",
        style: {},
        config: {},
        events: {},
        childrens: [],
        data: "hh",
      },
    ],
    data: "哈哈",
  },
]);
</script>

<style>
</style>
