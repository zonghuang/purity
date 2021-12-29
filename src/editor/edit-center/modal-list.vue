<template>
  <div class="modal-list">
    <div class="modal-preview">
      <el-image
        class="image"
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
      />
      <span class="title">弹窗1</span>
    </div>
    <div class="modal-preview">
      <el-image
        class="image"
        src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
      />
      <span class="title">弹窗2</span>
    </div>
    <div class="modal-preview">
      <el-image
        class="image"
        src="https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
      />
      <span class="title">弹窗3</span>
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="less">
.modal-list {
  width: 100px;

  .modal-preview {
    display: flex;
    flex-direction: column;
    align-items: center;

    .image {
      width: 100px;
      height: 65px;
    }
  }
}
</style>