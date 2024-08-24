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
  <div class="flex-1 my-[10px] justify-between flex">
    <!-- 左边头像 -->
    <div class="w-[50px] flex justify-center">
      <img
        v-if="role == 'assistant'"
        :src="chat3Default.image"
        class="h-[40px] w-[40px] mx-[5px] rounded-full object-cover"
      />
    </div>

    <!-- 中间 -->
    <div
      class="w-0 flex-1 flex flex-col"
      :class="{ 'items-end': role === 'user' }"
    >
      <!-- 顶部时间 -->
      <div class="text-slate-400 text-sm pb-[5px]">
        {{ dateTime || "暂无时间" }}
      </div>
      <!-- 消息 -->
      <div
        class="text-slate-800 shadow-sm w-max max-w-[100%] border-[1px] rounded-[10px] overflow-hidden"
      >
        <MdPreview
          v-if="role === 'assistant'"
          :modelValue="content"
          :codeFold="false"
          class="px-[8px]"
        />
        <div
          v-else
          class="p-[8px] text-slate-700 bg-white subpixel-antialiased tracking-wide"
        >
          {{ content }}
        </div>
      </div>
    </div>

    <!-- 右边头像 -->
    <div class="w-[50px] justify-center flex">
      <img
        v-if="role == 'user'"
        :src="userStore.userInfo.profile.image"
        class="h-[40px] w-[40px] mx-[5px] rounded-full object-cover"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.md-editor-preview-wrapper) {
  padding: 0;
}
</style>
