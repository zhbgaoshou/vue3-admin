import { defineStore } from "pinia";
import { ref } from "vue";

const useChatStore = defineStore("chat", () => {
  const messageList = ref<any[]>([]);

  function addMessage(message: any) {
    messageList.value.push(message);
  }

  return {
    messageList,
    addMessage,
  };
});

export default useChatStore;
