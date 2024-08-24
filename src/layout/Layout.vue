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
  <!-- 宽高都继承#app -->
  <div class="flex h-full">
    <!-- 右边 -->
    <div class="flex-1 flex flex-col  bg-white">
      <!-- 顶部 -->
      <div class="h-[50px] flex justify-between items-center border-b-[1px] shadow-sm">
        <!-- 顶部左边边 -->
        <div>
          <!-- 水平菜单 -->
          <el-menu mode="horizontal" style="border: none;height: 50px" :default-active="$route.path"
            :collapse-transition="false" router>
            <Menu :menuList="menuStore.menuList"></Menu>
          </el-menu>
        </div>
        <!-- 顶部右边 -->
        <div class="flex items-center">
          <Setting v-model:refresh="refresh" />
          <Breadcrumb />
        </div>
      </div>
      <!-- main -->
      <div class="flex-1 h-0">
        <router-view v-if="refresh" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.coll {
  width: 60px !important;
}

.el-menu {
  --el-menu-bg-color: white;
}
</style>
