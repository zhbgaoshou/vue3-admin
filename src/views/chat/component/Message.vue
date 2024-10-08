<script setup lang="ts">
import { inject, onMounted } from "vue";

import useUserStore from "@/store/modules/user";
import type { MessageProps } from "./type";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { chat3Default } from "@/config/chat";
// 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'
const scrollBottom = inject("scrollBottom") as any;

onMounted(() => {
  scrollBottom();
});
defineProps<MessageProps>();
const userStore = useUserStore();
</script>

<template>
  <div class="justify-between flex mb-[10px]">
    <!-- 左边头像 -->
    <div class="w-0 flex justify-center md:w-[50px]">
      <img
        v-if="role == 'assistant'"
        :src="chat3Default.image"
        class="h-[40px] w-[40px] mx-[5px] rounded-[10px] object-cover"
      />
    </div>

    <!-- 中间 -->
    <div
      class="w-0 flex-1 flex flex-col px-[10px] md:px-0"
      :class="{ 'items-end': role === 'user' }"
    >
      <!-- 顶部时间 -->
      <div class="text-slate-400 text-sm pb-[5px]">
        {{ dateTime || "暂无时间" }}
      </div>
      <!-- 消息 -->
      <div
        class="bg-white font-['Monaco'] shadow-sm max-w-[100%] border-[1px] rounded-[30px] overflow-hidden"
      >
        <!-- ai返回来的消息 -->
        <MdPreview
          v-if="role === 'assistant'"
          :modelValue="content"
          theme="light"
          previewTheme="cyanosis"
          :autoFoldThreshold="99999"
          :showCodeRowNumber="false"
          class="p-0 !font-['Monaco']"
        />
        <!-- 用户输入的消息，我无需markdown编译 -->
        <div
          v-else
          class="text-slate-700 p-[8px] subpixel-antialiased tracking-wide"
        >
          {{ content }}
        </div>
      </div>
    </div>

    <!-- 右边头像 -->
    <div class="w-0 justify-center flex md:w-[50px]">
      <img
        v-if="role == 'user'"
        :src="userStore.userInfo.profile.image"
        class="h-[40px] w-[40px] m-[5px] rounded-[10px] object-cover"
      />
    </div>
  </div>
</template>

<style scoped>
:deep(.cyanosis-theme p) {
  margin: 0;
}

:deep(.md-editor-preview .md-editor-code pre code) {
  font-family: "Monaco";
  font-size: 16px;
}
</style>
