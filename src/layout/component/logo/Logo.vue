<script setup lang="ts">
import LogoIcon from "@/assets/svgs/logo.svg";
import useMenuStore from "@/store/modules/menu";
const menuStore = useMenuStore();
</script>

<template>
  <div class="h-[50px] w-[260px] flex items-center">
    <LogoIcon class="ml-[20px] mr-[10px]" />
    <h4
      class="text-lg transition-all delay-500"
      :class="{ 'ml-[10px]': menuStore.isColl }"
    >
      哈哈哈哈
    </h4>
  </div>
</template>

<style scoped lang="scss"></style>
