<script setup lang="ts">
import Logo from './component/logo/Logo.vue';

</script>

<template>
<div class="flex">
    <!-- 侧边栏(左边) -->
    <div class="w-[230px] h-[100vh] bg-slate-500">
      <Logo/>
    </div>
    <!-- 右边 -->
     <div class="h-[100vh] flex-1 bg-sky-500 flex flex-col">
      <!-- 顶部 -->
       <div class="h-[50px] bg-pink-200"></div>
       <!-- main -->
        <div class="bg-pink-500 flex-1"></div>
     </div>

</div>


</template>
