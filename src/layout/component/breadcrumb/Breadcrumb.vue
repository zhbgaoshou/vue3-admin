<script setup lang="ts">
import { useRoute } from "vue-router";

const $route = useRoute();

function onFold() {
  console.log("缩放");
}
</script>

<template>
  <el-icon class="mx-[5px]">
    <!-- 缩放图标 -->
    <component is="Fold" @click="onFold"></component>
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
