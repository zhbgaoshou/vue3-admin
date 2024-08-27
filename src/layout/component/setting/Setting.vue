<script setup lang="ts">
import { beforeLoginOut } from "@/utils/local";
import { useRouter, useRoute } from "vue-router";
import useUserStore from "@/store/modules/user";
import ToggleTheme from "./component/ToggleTheme.vue";
import { ref } from "vue";
import Room from "@/views/chat/component/Room.vue";
import { ElMessageBox } from "element-plus";
import MoreIcon from "@/assets/svgs/more.svg";

const $router = useRouter();
const $route = useRoute();
const userStore = useUserStore();

async function loginOut() {
  try {
    // 确认删除对话框
    await ElMessageBox.confirm(`确定退出登录吗 ?`, "退出登录", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
      roundButton: true,
    });
    beforeLoginOut();
    $router.push({
      path: "/login",
      query: {
        re: $route.path,
      },
    });
  } catch (error) {}
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

let openDrawer = ref(false);

function openRoom() {
  openDrawer.value = !openDrawer.value;
}

defineExpose({
  loginOut,
});
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
    <span class="text-sm text-slate-500 mx-[3px] hidden md:block">
      {{ userStore.userInfo.username }}
    </span>
    <!-- 退出登录确认 -->
    <div class="hidden md:flex items-center" @click="loginOut">
      <el-icon size="24" class="icon-style rounded-full">
        <component is="Right" class="p-[3px]"></component>
      </el-icon>
    </div>
    <!-- 更多 -->
    <div class="md:hidden flex items-center mx-[10px]" @click="openRoom">
      <MoreIcon />
    </div>
    <!-- 小屏幕显示 -->
    <el-drawer
      :with-header="false"
      v-model="openDrawer"
      title=""
      direction="rtl"
      size="max-content"
    >
      <Room class="border-none" />
    </el-drawer>
  </div>
</template>

<style scoped lang="scss"></style>
