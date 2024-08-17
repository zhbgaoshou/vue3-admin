<script setup lang="ts">
import { nextTick } from "vue";

const refresh = defineModel("refresh");
function onRefresh() {
  refresh.value = false;
  nextTick(function () {
    refresh.value = true;
  });
}

function onfullScreen() {
  // 判断是否全屏
  document.fullscreenElement
    ? document.exitFullscreen() // 退出全屏
    : document.documentElement.requestFullscreen(); // 进入全屏
}
</script>

<template>
  <el-button icon="Refresh" circle @click="onRefresh" />
  <el-button icon="FullScreen" circle @click="onfullScreen" />
  <el-button icon="Setting" circle />
  <img
    src="https://p3-passport.byteacctimg.com/img/user-avatar/f258c2ef7608c422968525439452de88~40x40.awebp"
    class="w-[32px] h-[32px] rounded-full mx-[10px]"
  />
  <el-dropdown class="flex items-center mr-4">
    <span class="el-dropdown-link">
      admin
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style scoped lang="scss"></style>
