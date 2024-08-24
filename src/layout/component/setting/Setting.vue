<script setup lang="ts">
import { nextTick } from "vue";
import { beforeLoginOut } from "@/utils/local";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";

const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();

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

function loginOut() {
  beforeLoginOut();
  $router.push({
    path: "/login",
    query: {
      re: $route.path,
    },
  });
}
</script>

<template>
    <img
    :src="userStore.userInfo.profile.image"
    class="w-[32px] h-[32px] rounded-full mx-[10px]"
  />
  <el-dropdown class="flex items-center mr-4">
    <span class="el-dropdown-link">
      {{ userStore.userInfo.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="loginOut">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <el-button icon="Refresh" circle @click="onRefresh" />
  <el-button icon="FullScreen" circle @click="onfullScreen" />
  <el-button icon="Setting" circle />

</template>

<style scoped lang="scss"></style>
