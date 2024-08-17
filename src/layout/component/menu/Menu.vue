<script setup lang="ts">
defineProps(["menuList"]);
</script>

<template>
  <template v-for="menuItem in menuList" :key="menuItem.path">
    <!-- 没有children的情况 -->
    <el-menu-item :index="menuItem.path" v-if="!menuItem.children">
      <el-icon>
        <component :is="menuItem.meta.icon"></component>
      </el-icon>
      <span>{{ menuItem.meta.title }}</span>
    </el-menu-item>
    <!-- 有且只有一个children的情况 -->
    <el-menu-item
      :index="menuItem.children[0].path"
      v-if="menuItem.children && menuItem.children.length === 1"
    >
      <el-icon>
        <component :is="menuItem.children[0].meta.icon"></component>
      </el-icon>
      <span>{{ menuItem.children[0].meta.title }}</span>
    </el-menu-item>
    <!-- children大于两个的情况 -->
    <el-sub-menu
      v-if="menuItem.children && menuItem.children.length > 1"
      :index="menuItem.path"
    >
      <template #title>
        <el-icon>
          <component :is="menuItem.meta.icon"></component>
        </el-icon>
        <span>{{ menuItem.meta.title }}</span>
      </template>
      <Menu :menuList="menuItem.children"></Menu>
    </el-sub-menu>
  </template>
</template>

<script lang="ts">
export default {
  name: "Menu",
};
</script>
