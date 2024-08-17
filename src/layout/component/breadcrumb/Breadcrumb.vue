<script setup lang="ts">
import { useRoute } from "vue-router";

import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()

const $route = useRoute();

function onFold() {
  menuStore.isColl = !menuStore.isColl
}
// Expand
</script>

<template>
  <el-icon class="mx-[5px]">
    <!-- 缩放图标 -->
    <component :is="menuStore.isColl ? 'Fold' : 'Expand'" @click="onFold"></component>
  </el-icon>
  <el-breadcrumb separator-icon="Right">
    <el-breadcrumb-item
      v-for="route in $route.matched"
      :key="route.path"
      v-show="route.meta.title"
      :to="{ path: route.path }"
      >{{ route.meta.title }}</el-breadcrumb-item
    >
  </el-breadcrumb>
</template>

<style scoped lang="scss"></style>
