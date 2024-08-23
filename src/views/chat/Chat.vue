<script setup lang="ts">
import Input from "./component/Input.vue";
import Message from "./component/Message.vue";
import { chat3Api } from "@/api/chat/chat3";
import type { chatParams } from "@/api/chat/type";
import { ref, watch } from "vue";
import { ElMessage } from "element-plus";
import useChatStore from "@/store/modules/chat";
import useRoomStore from "@/store/modules/room";
import useUserStore from "@/store/modules/user";
import Room from "./component/Room.vue";
import { defaultTempImage } from '@/config/chat'

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

async function send(content: any) {
  if (!content.value) {return};

  const userMessage: chatParams = {
    content: content.value,
    room: roomStore.activeRoom.id as number,
    role: "user",
    date_time: new Date().toLocaleString(),
  };

  chatStore.addMessage(userMessage);
  content.value = ''

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

let isGotoBottom = ref(true)
function chatScroll(event: Event) {
  const el = event.target as HTMLDivElement
  console.log(el.scrollTop);
  console.log(el.offsetHeight);


  el.offsetHeight + el.scrollTop > el.offsetHeight ? isGotoBottom.value = false : isGotoBottom.value = true
}
</script>

<template>
  <div class="h-full flex grid-bg">
    <div class="flex flex-1 flex-col h-full relative">
      <!-- 聊天框 -->
      <div @scroll="chatScroll" class="flex-1 scrollbar-hidden overflow-auto" ref="tp">
        <div v-show="chatStore.messageList && chatStore.messageList.length >= 1"
          v-for="(item, index) in chatStore.messageList" :key="index">
          <Message :role="item.role" :content="item.content" :dateTime="item.date_time" />
        </div>


          <div class="relative flex h-full w-full items-end justify-center" v-show="chatStore.messageList && chatStore.messageList.length < 1">
            <img :src="defaultTempImage" class=" object-cover h-[80%]"></img>
            <div
              class=" absolute bg-white shadow-md border-[1px] text-sm top-[24%] left-[55%] w-[100px] p-[10px] rounded-t-[20px] rounded-r-[20px]">
              哦哈哟！有什么可以帮到你的吗?</div>
          </div>






        <!-- 正在生成的消息 -->
        <Message role="assistant" :content="text" v-show="text" />
      </div>
      <!-- 输入框 -->
      <div class="h-max">
        <Input :is-goto-bottom="isGotoBottom" @send="send" @file="file" @goto-bottom="scrollTop()" />
      </div>
    </div>
    <!-- 会话列表 -->
    <Room class="hidden md:block" />
  </div>
</template>

<style scoped>
.grid-bg {
  background-image: url("data:image/svg+xml,<svg id='patternId' width='100%' height='100%' xmlns='http://www.w3.org/2000/svg'><defs><pattern id='a' patternUnits='userSpaceOnUse' width='20' height='20' patternTransform='scale(1) rotate(0)'><rect x='0' y='0' width='100%' height='100%' fill='hsla(0,0%,100%,1)'/><path d='M 10,-2.55e-7 V 20 Z M -1.1677362e-8,10 H 20 Z'  stroke-width='0.5' stroke='hsla(259, 0%, 88%, 1)' fill='none'/></pattern></defs><rect width='800%' height='800%' transform='translate(-40,-40)' fill='url(%23a)'/></svg>")
}
</style>
