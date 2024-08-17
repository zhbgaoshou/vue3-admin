<script setup lang="ts">
import LogoIcon from "@/assets/svgs/logo.svg";
import useMenuStore from '@/store/modules/menu'
const menuStore = useMenuStore()
</script>

<template>
  <div class="h-[50px] w-[260px]  flex  items-center">
    <LogoIcon class="stroke-pink-50 fill-sky-100 ml-[20px] mr-[10px]" />
    <h4 class="text-white text-lg transition-all delay-500" :class="{'ml-[10px]':menuStore.isColl}">后台管理系统</h4>
  </div>
</template>

<style scoped lang="scss"></style>
