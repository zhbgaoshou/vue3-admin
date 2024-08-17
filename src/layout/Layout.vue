<script setup lang="ts">
import Logo from "./component/logo/Logo.vue";
import Menu from "./component/menu/Menu.vue";
import Breadcrumb from "./component/breadcrumb/Breadcrumb.vue";
import Setting from "./component/setting/Setting.vue";
import useMenuStore from "@/store/modules/menu";
import { useRoute } from "vue-router";

import { ref } from "vue";

const menuStore = useMenuStore();
const $route = useRoute();

const refresh = ref<boolean>(true);
</script>

<template>
  <div class="flex">
    <!-- 侧边栏(左边) -->
    <div class="w-[230px] h-[100vh] bg-slate-500 flex flex-col">
      <Logo />
      <el-scrollbar class="flex-1">
        <el-menu
          :collapse="false"
          style="border: none"
          :default-active="$route.path"
          active-text-color="#ffd04b"
          background-color="#545c64"
          text-color="#fff"
          router
        >
          <Menu :menuList="menuStore.menuList"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 右边 -->
    <div class="h-[100vh] flex-1 flex flex-col">
      <!-- 顶部 -->
      <div class="h-[50px] flex justify-between items-center">
        <!-- 顶部左边 -->
        <div class="flex">
          <Breadcrumb />
        </div>
        <!-- 顶部右边 -->
        <div class="flex">
          <Setting v-model:refresh="refresh" />
        </div>
      </div>
      <!-- main -->
      <div class="flex-1 bg-sky-500">
        <router-view v-if="refresh" />
      </div>
    </div>
  </div>
</template>
