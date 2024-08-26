<script setup lang="ts">
import Input from "./component/Input.vue";
import Message from "./component/Message.vue";
import { chat3Api } from "@/api/chat/chat3";
import type { chatParams } from "@/api/chat/type";
import { ref, watch, nextTick } from "vue";
import { ElMessage } from "element-plus";
import useChatStore from "@/store/modules/chat";
import useRoomStore from "@/store/modules/room";
import useUserStore from "@/store/modules/user";
import Room from "./component/Room.vue";
import { defaultTempImage } from "@/config/chat";

const chatStore = useChatStore();
const roomStore = useRoomStore();
const userStore = useUserStore();

async function getMessageList() {
  console.log("getMessageList");

  await chatStore.fetchMessageList(
    userStore.user,
    roomStore.activeRoom.id as number
  );

  // 获取消息列表后滚动到底部
  scrollTop();
}

let text = ref("");

let isUserScrolling = ref(false); // 用户滚动状态
const tp = ref(null);
function chatScroll(event: Event) {
  const el = event.target as HTMLDivElement;
  const threshold = 100; // 自定义阈值

  // 判断用户是否滚动到接近底部，如果用户手动滚动，设置 isUserScrolling 为 true
  isUserScrolling.value =
    el.scrollHeight - el.scrollTop - el.clientHeight > threshold;
}

function scrollTop(trigger = "") {
  if (!isUserScrolling.value || trigger) {
    const el = tp.value as HTMLDivElement | null;
    if (el) {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth", // 使用 smooth 来平滑滚动
      });
    }
  }
}

let isGeneration = ref(false);
const controller = new AbortController();
const signal = controller.signal;

async function send(content: any) {
  if (!content.value) {
    return;
  }

  const userMessage: chatParams = {
    content: content.value,
    room: roomStore.activeRoom.id as number,
    role: "user",
    date_time: new Date().toLocaleString(),
  };

  chatStore.addMessage(userMessage);
  content.value = "";

  // 确保消息渲染后滚动到底部
  await nextTick();
  scrollTop();

  try {
    isGeneration.value = true;
    const response = await chat3Api(userMessage, signal);
    const reader = (response.body as ReadableStream<Uint8Array>).getReader();
    const textDecoder = new TextDecoder();

    text.value = ""; // 重置显示区域的文本

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      let res = textDecoder.decode(value, { stream: true }); // 使用流解码
      if (res.endsWith("None")) res = res.replace("None", ""); // 将最后的None替换成空字符

      text.value += res;
      // 每次追加新内容后，立即滚动到底部
      await nextTick(); // 确保 DOM 更新
      scrollTop();
    }

    // 最终生成的完整内容添加到消息列表
    const aiData: chatParams = {
      room: roomStore.activeRoom.id as number,
      content: text.value,
      role: "assistant",
      date_time: new Date().toLocaleString(),
    };
    chatStore.addMessage(aiData);
    text.value = "";

    // 再次确保最终渲染后滚动到底部
    await nextTick();
    scrollTop();
  } catch (error) {
    console.log(error);
    ElMessage.error("error");
  } finally {
    isGeneration.value = false;
  }
}

function file(file: FileList) {
  console.log(file[0]);
}

function handleStopFetch() {
  // 停止生成
  if (isGeneration.value) controller.abort();
}

watch(
  () => roomStore.activeRoom,
  (newRoom, oldRoom) => {
    if (newRoom && newRoom.active && newRoom?.id !== oldRoom?.id)
      getMessageList();
  }
);
</script>

<template>
  <div class="h-full flex grid-bg">
    <!-- 聊天消息区域 -->
    <div class="flex flex-1 flex-col">
      <!-- 聊天框 -->
      <div
        class="flex-1 scrollbar-hidden overflow-auto"
        @scroll="chatScroll"
        ref="tp"
      >
        <!-- 聊天记录不是空 -->
        <div
          v-show="chatStore.messageList && chatStore.messageList.length >= 1"
          v-for="(item, index) in chatStore.messageList"
          :key="index"
        >
          <Message
            :role="item.role"
            :content="item.content"
            :dateTime="item.date_time"
          />
        </div>
        <!-- 聊天列表为空 -->
        <div
          class="relative flex h-full w-full items-end justify-center"
          v-show="chatStore.messageList && chatStore.messageList.length < 1"
        >
          <img :src="defaultTempImage" class="object-cover h-[80%]" />
          <div
            class="absolute bg-white shadow-md border-[1px] text-sm top-[24%] left-[55%] w-[100px] p-[10px] rounded-t-[20px] rounded-r-[20px]"
          >
            哦哈哟！有什么可以帮到你的吗?
          </div>
        </div>

        <!-- 正在生成的消息 -->
        <Message role="assistant" :content="text" v-show="text" />
      </div>
      <!-- 输入框 -->
      <div class="h-max">
        <Input
          :isGeneration="isGeneration"
          @send="send"
          @file="file"
          @goto-bottom="scrollTop"
          :is-goto-bottom="isUserScrolling"
          @stop-fetch="handleStopFetch"
        />
      </div>
    </div>
    <!-- 会话列表 -->
    <Room class="hidden md:flex" />
  </div>
</template>

<style scoped>
.grid-bg {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='0.5' stroke='hsla(259, 0%, 88%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-40,-40)' fill='url(%23a)'/></svg>");
}
</style>
