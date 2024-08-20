<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import type { MessageProps } from "./type";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

defineProps<MessageProps>();
const userStore = useUserStore();
</script>

<template>
  <div class="flex my-[10px]">
    <!-- 左边头像 -->

    <img
      :src="userStore.userInfo.profile.image"
      class="w-[50px] h-[50px] mx-[5px]"
      :class="{ 'order-1': role === 'user' }"
    />

    <!-- 右边 -->
    <div class="flex-1" :class="{ 'flex items-end flex-col': role === 'user' }">
      <!-- 顶部时间 -->
      <div
        class="text-slate-400 text-sm pb-[5px]"
        :class="{ 'text-right': role === 'user' }"
      >
        {{ dateTime || new Date().toLocaleString() }}
      </div>
      <!-- 消息 -->
      <div
        class="rounded-md text-slate-800 bg-sky-100"
        :class="{ 'w-max': role === 'user' }"
      >
        <MdPreview :modelValue="content" class="!bg-transparent" />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.md-editor-preview-wrapper) {
  padding: 0 10px;
}
</style>
