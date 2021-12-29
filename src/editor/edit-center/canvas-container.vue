<template>
  <div class="canvas-container" @mousemove="handleMouseMove">
    <svg
      class="grid"
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id="smallGrid"
          width="7.236328125"
          height="7.236328125"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 7.236328125 0 L 0 0 0 7.236328125"
            fill="none"
            stroke="rgba(207, 207, 207, 0.3)"
            stroke-width="1"
          ></path>
        </pattern>
        <pattern
          id="grid"
          width="36.181640625"
          height="36.181640625"
          patternUnits="userSpaceOnUse"
        >
          <rect
            width="36.181640625"
            height="36.181640625"
            fill="url(#smallGrid)"
          ></rect>
          <path
            d="M 36.181640625 0 L 0 0 0 36.181640625"
            fill="none"
            stroke="rgba(186, 186, 186, 0.5)"
            stroke-width="1"
          ></path>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#grid)"></rect>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const offset = reactive({ x: 0, y: 0 });

function handleMouseMove(e: any) {
  // console.log(e.screenX, e.screenY);
  // console.log(e.clientX, e.clientX);
  // console.log(e.offsetX, e.offsetY);
  offset.x = e.offsetX;
  offset.y = e.offsetY;
}
</script>

<style scoped lang="less">
.canvas-container {
  flex: 1;
  padding: 0 8px;
  /* border: 1px solid #f0f0f0; */
  
  .grid {
    position: relative;
  }
}
</style>