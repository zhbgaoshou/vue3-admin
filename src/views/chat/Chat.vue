<script setup lang="ts">
import Input from "./component/Input.vue";
import Message from "./component/Message.vue";
import { chat3Api } from "@/api/chat/chat3";
import type { chatParams } from "@/api/chat/type";
import { ref, watch, onUpdated } from "vue";
import { ElMessage } from "element-plus";
import useChatStore from "@/store/modules/chat";
import useRoomStore from "@/store/modules/room";
import useUserStore from "@/store/modules/user";
import Room from "./component/Room.vue";

const chatStore = useChatStore();
const roomStore = useRoomStore();
const userStore = useUserStore();

async function getMessageList() {
  await chatStore.fetchMessageList(
    userStore.user,
    roomStore.activeRoom.id as number
  );
}

let text = ref("");

const tp = ref(null);
function scrollTop() {
  const el = tp.value as any;
  el.scrollTo({
    top: el.scrollHeight,
    behavior: "smooth",
  });
}

async function send(content: string) {
  if (content === "") return;

  const userMessage: chatParams = {
    content,
    room: roomStore.activeRoom.id as number,
    role: "user",
    date_time: new Date().toLocaleString(),
  };

  chatStore.addMessage(userMessage);

  try {
    const response = await chat3Api(userMessage);
    const reader = (response.body as ReadableStream<Uint8Array>).getReader();
    const textDecoder = new TextDecoder();

    text.value = ""; // 重置显示区域的文本

    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      const res = textDecoder.decode(value, { stream: true }); // 使用流解码
      if (res.endsWith("None")) {
        const aiData: chatParams = {
          room: roomStore.activeRoom.id as number,
          content: text.value, // 最终生成的完整内容
          role: "assistant",
          date_time: new Date().toLocaleString(),
        };
        chatStore.addMessage(aiData);
        text.value = "";
        break;
      } else {
        text.value += res;
      }
    }
  } catch (error) {
    console.log(error);
    ElMessage.error("error");
  }
}

function file(file: FileList) {
  console.log(file[0]);
}

watch(
  () => roomStore.activeRoom,
  () => {
    getMessageList();
  }
);

onUpdated(() => {
  scrollTop();
});
</script>

<template>
  <div class="h-full flex grid-bg">
    <div class="flex flex-1 flex-col h-full relative p-[5px]">
      <!-- 聊天框 -->
      <div class="flex-1 scrollbar-hidden overflow-auto" ref="tp">
        <div v-for="(item, index) in chatStore.messageList" :key="index">
          <Message
            :role="item.role"
            :content="item.content"
            :dateTime="item.date_time"
          />
        </div>

        <!-- 正在生成的消息 -->
        <Message role="assistant" :content="text" v-show="text" />
      </div>
      <!-- 输入框 -->
      <div class="h-[50px]">
        <Input @send="send" @file="file" />
      </div>
    </div>
    <!-- 会话列表 -->
    <Room class="hidden md:block" />
  </div>
</template>

<style scoped>
/* 隐藏滚动条的轨道 */
.scrollbar-hidden::-webkit-scrollbar-track {
  background: transparent; /* 隐藏轨道背景 */
}

/* 自定义滚动条的宽度和颜色 */
.scrollbar-hidden::-webkit-scrollbar {
  width: 8px; /* 滚动条宽度 */
  height: 8px; /* 如果是水平滚动条 */
}

.scrollbar-hidden::-webkit-scrollbar-thumb {
  background-color: rgba(204, 203, 203, 0.5); /* 滚动条颜色 */
  border-radius: 10px; /* 圆角 */
}

/* 适用于 Firefox */
.scrollbar-hidden {
  scrollbar-width: thin;
  scrollbar-color: rgba(204, 203, 203, 0.5) transparent;
}

.grid-bg {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(2) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='1' stroke='hsla(259, 54%, 96%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(0,0)' fill='url(%23a)'/></svg>");
}
</style>
