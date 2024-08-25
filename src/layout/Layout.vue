<script setup lang="ts">
import Logo from "./component/logo/Logo.vue";
import Menu from "./component/menu/Menu.vue";
import Setting from "./component/setting/Setting.vue";
import useMenuStore from "@/store/modules/menu";
import { useRoute } from "vue-router";

import { ref } from "vue";

const menuStore = useMenuStore();
const $route = useRoute();

let menuDOM = ref({} as HTMLDivElement);

function showMenu() {
  menuDOM.value.classList.contains("scale-0")
    ? menuDOM.value.classList.remove("scale-0")
    : menuDOM.value.classList.add("scale-0");
}
</script>

<template>
  <!-- 宽高都继承#app -->
  <div class="flex h-full">
    <!-- 菜单 -->
    <div
      ref="menuDOM"
      class="origin-top w-[60px] border-r-[1px] bg-white flex-col h-full z-10 fixed scale-0 transition-all duration-100 flex md:static md:scale-100"
    >
      <div
        class="md:hidden flex justify-center items-center h-[50px]"
        @click="showMenu"
      >
        <el-icon size="24">
          <component is="Close"></component>
        </el-icon>
      </div>
      <Logo />
      <el-scrollbar>
        <el-menu
          :collapse="true"
          style="border: none; width: 100%"
          :default-active="$route.path"
          :collapse-transition="false"
          router
        >
          <Menu :menuList="menuStore.menuList"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 右边 -->
    <div class="flex-1 flex flex-col bg-white">
      <!-- 顶部 -->
      <div
        class="h-[50px] flex justify-between items-center border-b-[1px] shadow-sm"
      >
        <!-- 顶部左边 -->
        <div class="pl-[10px]">
          <!-- md宽度下显示，其余情况隐藏 -->
          <div class="md:hidden" @click="showMenu">
            <el-icon size="24">
              <component is="More"></component>
            </el-icon>
          </div>
        </div>
        <!-- 顶部右边 -->
        <Setting />
      </div>
      <!-- main -->
      <div class="flex-1 h-0">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.el-menu {
  --el-menu-bg-color: white;
}
</style>
