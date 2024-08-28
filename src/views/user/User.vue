<script lang="ts" setup>
import { ref } from "vue";

import Register from "./component/Register.vue";
import Login from "./component/Login.vue";
const activeName = ref("first");

function handleClick() {}
</script>

<template>
  <div class="w-full h-[100%] login-bg">
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick"
      stretch
      class="w-[50%] max-w-[500px] min-w-[300px] mx-auto pt-[100px]"
    >
      <el-tab-pane label="登录" name="first">
        <Login />
      </el-tab-pane>
      <el-tab-pane label="注册" name="second">
        <Register />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.login-bg {
  background-image: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
}
</style>
