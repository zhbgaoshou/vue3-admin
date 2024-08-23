<script setup lang="ts">
import useUserStore from "@/store/modules/user";
import type { MessageProps } from "./type";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { chat3Default } from "@/config/chat";

defineProps<MessageProps>();
const userStore = useUserStore();
</script>

<template>
  <div class="flex flex-1 my-[10px]">
    <!-- 左边头像 -->
    <img
      :src="
        role === 'assistant'
          ? chat3Default.image
          : userStore.userInfo.profile.image
      "
      class="h-[50px] w-[50px] mx-[5px] rounded-full"
      :class="{ 'order-1': role === 'user' }"
    />

    <!-- 右边 -->
    <div
      class="mx-[5px] w-0 flex-1"
      :class="{ 'flex items-end flex-col': role === 'user' }"
    >
      <!-- 顶部时间 -->
      <div
        class="text-slate-400 text-sm pb-[5px]"
        :class="{ 'text-right': role === 'user' }"
      >
        {{ dateTime || "暂无时间" }}
      </div>
      <!-- 消息 -->
      <div class="text-slate-800 w-max max-w-[100%]">
        <MdPreview
          :modelValue="content"
          class="px-[8px] !bg-gray-200 rounded-[10px]"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.md-editor-preview-wrapper) {
  padding: 0;
}
</style>
