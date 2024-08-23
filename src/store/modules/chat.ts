import { defineStore } from "pinia";
import { ref } from "vue";
import { messageApi } from "@/api/chat/chat3";

const useChatStore = defineStore("chat", () => {
  const messageList = ref<any[]>([]);

  function addMessage(message: any) {
    messageList.value.push(message);
  }

  async function fetchMessageList(user: number, room: number) {
    const res = await messageApi(user, room);
    if (res.code === 200) {
      messageList.value = res.data.results;
      return res;
    } else {
      return Promise.reject(new Error("fail"));
    }
  }

  return {
    messageList,
    addMessage,
    fetchMessageList,
  };
});

export default useChatStore;
