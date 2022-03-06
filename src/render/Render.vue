<template>
  <render-template :elements="elements"></render-template>
</template>

<script setup lang="ts">
import { IElement } from '../editor/interface';
import { useEditStore } from '../editor/store/edit';

const editStore = useEditStore()
const elements: IElement[] = editStore.currentPage.elements
</script>