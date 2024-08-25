<script setup lang="ts">
import { beforeLoginOut } from "@/utils/local";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";
import ToggleTheme from "./component/ToggleTheme.vue";

const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();

function loginOut() {
  beforeLoginOut();
  $router.push({
    path: "/login",
    query: {
      re: $route.path,
    },
  });
}

function widthFull() {
  const a = document.querySelector("#app") as any;
  if (a.style.maxWidth !== "100%") {
    a.style.maxWidth = "100%";
  } else {
    a.style.maxWidth = "var(--w)";
  }
}

function toggleTheme(isDark: boolean) {
  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}
</script>

<template>
  <div class="px-[5px] flex items-center">
    <!-- 切换全宽 -->
    <div class="hidden md:flex">
      <el-icon size="28" class="icon-style" @click="widthFull">
        <component is="FullScreen" class="p-[5px]"></component>
      </el-icon>
    </div>
    <!-- 切换主题 -->
    <div class="mx-[10px]">
      <ToggleTheme @toggle="toggleTheme" />
    </div>
    <!-- 头像 -->
    <img
      :src="userStore.userInfo.profile.image"
      class="w-[32px] h-[32px] rounded-full object-cover border-2 border-sky-200"
    />
    <!-- 名字 -->
    <span class="text-sm text-slate-500 mx-[3px]">
      {{ userStore.userInfo.username }}
    </span>
    <!-- 退出登录确认 -->
    <el-popconfirm
      :hide-after="50"
      title="退出登录?"
      confirm-button-text="是的"
      cancel-button-text="不不不"
      @confirm="loginOut"
    >
      <template #reference>
        <el-icon size="24" class="icon-style rounded-full">
          <component is="Right" class="p-[3px]"></component>
        </el-icon>
      </template>
    </el-popconfirm>
  </div>
</template>

<style scoped lang="scss"></style>
