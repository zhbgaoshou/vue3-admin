<script setup lang="ts">
import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()

function onFold() {
  menuStore.isColl = !menuStore.isColl
}
// Expand
</script>

<template>
  <el-icon class="mx-[5px]">
    <!-- 缩放图标 -->
    <component :is="menuStore.isColl ? 'Fold' : 'Expand'" @click="onFold"></component>
  </el-icon>

</template>

<style scoped lang="scss"></style>
