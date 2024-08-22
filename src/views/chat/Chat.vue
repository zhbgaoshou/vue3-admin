<script setup lang="ts">
import Input from "./component/Input.vue";
import Message from "./component/Message.vue";
import { chat3Default } from "@/config/chat";
import { chat3Api } from "@/api/chat/chat3";
import type { chatParams } from "@/api/chat/type";
import { ref, onUpdated } from "vue";
import { ElMessage } from "element-plus";
import useChatStore from "@/store/modules/chat";
import Room from "./component/Room.vue";

const chatStore = useChatStore();
let text = ref("");

const tp = ref(null);
function scrollTop() {
  const el = tp.value as any;
  el.scrollTo({
    top: el.scrollHeight,
    behavior: "smooth",
  });
}
onUpdated(() => {
  scrollTop();
});

async function send(content: string) {
  if (content === "") return;

  const userMessage: chatParams = {
    content,
    room: 1,
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
          room: 1,
          content: text.value, // 最终生成的完整内容
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
</script>

<template>
  <div class="h-full flex">
    <div class="flex flex-1 flex-col h-full relative p-[5px]">
      <!-- 聊天框 -->
      <div class="flex-1 overflow-auto scrollbar-hide" ref="tp">
        <Message
          role="assistant"
          :content="chat3Default.content"
          :dateTime="chat3Default.dateTime"
        />

        <div v-for="(item, index) in chatStore.messageList" :key="index">
          <Message :role="item.role" :content="item.content" />
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
    <Room />
  </div>
</template>
