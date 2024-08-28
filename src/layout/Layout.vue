<script setup lang="ts">
import Logo from "./component/logo/Logo.vue";
import Menu from "./component/menu/Menu.vue";
import Setting from "./component/setting/Setting.vue";
import useUserStore from "@/store/modules/user";
import { useRoute } from "vue-router";

import { ref } from "vue";

const userStore = useUserStore();
const $route = useRoute();
let openDrawer = ref(false);

function showMenu() {
  openDrawer.value = !openDrawer.value;
}

const setting = ref({} as any);

function logOut() {
  setting.value.loginOut();
}

let dialogVisible = ref(false);
function handleMessage() {
  dialogVisible.value = !dialogVisible.value;
}
</script>

<template>
  <!-- 宽高都继承#app -->
  <div class="flex h-full">
    <!-- 菜单 -->
    <div class="w-[60px] border-r-[1px] bg-white hidden md:static md:block">
      <Logo @click="handleMessage" />
      <el-scrollbar>
        <el-menu
          :collapse="true"
          style="border: none; width: 100%"
          :default-active="$route.path"
          :collapse-transition="false"
          router
        >
          <Menu :menuList="userStore.menuList"></Menu>
        </el-menu>
      </el-scrollbar>
    </div>
    <!-- 小屏幕显示 -->
    <el-drawer
      v-model="openDrawer"
      :with-header="false"
      title="导航"
      direction="ltr"
      size="max-content"
    >
      <div class="flex flex-col">
        <div class="w-max bg-white flex-col h-full">
          <el-scrollbar>
            <el-menu
              style="border: none; width: 100%"
              :default-active="$route.path"
              :collapse-transition="false"
              router
            >
              <Menu :menuList="userStore.menuList"></Menu>
            </el-menu>
          </el-scrollbar>
        </div>
        <el-button @click="logOut" class="mt-[30px]">退出登录</el-button>
      </div>
    </el-drawer>
    <!-- 右边 -->
    <div class="flex-1 flex flex-col bg-white">
      <!-- 顶部 -->
      <div
        class="h-[50px] flex justify-between items-center border-b-[1px] shadow-sm"
      >
        <!-- 顶部左边 -->
        <div class="pl-[10px]">
          <!-- md宽度下显示，其余情况隐藏 -->
          <div class="md:hidden">
            <el-icon size="24" @click="showMenu">
              <component is="More"></component>
            </el-icon>
            <el-icon size="24" class="mx-[8px]" @click="handleMessage">
              <component is="Message"></component>
            </el-icon>
          </div>
        </div>
        <!-- 顶部右边 -->
        <Setting ref="setting" />
      </div>
      <!-- main -->
      <div class="flex-1 h-0">
        <router-view></router-view>
      </div>
    </div>

    <!-- 消息反馈提示 弹窗-->
    <el-dialog v-model="dialogVisible" title="你好" width="300px">
      <span>如果你遇到bug或者有什么建议可以联系我</span><br />
      <span>QQ群：12346789</span><br />
      <span>QQ邮箱：12346789</span><br />
      <span>微信群：12342324</span><br />
      <template #footer>
        <div class="dialog-footer"></div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.el-menu {
  --el-menu-bg-color: white;
}

:deep(.el-drawer) {
  --el-drawer-padding-primary: 10px;
}
</style>
