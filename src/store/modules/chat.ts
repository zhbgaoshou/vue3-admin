import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { messageApi } from "@/api/chat/chat3";

const useChatStore = defineStore("chat", () => {
  const messageList = ref<any[]>([]);
  const modelList = ref(
    JSON.parse(localStorage.getItem("model") as string) || [
      {
        name: "ChatGPT-3.5",
        value: "gpt-3.5-turbo",
        description: "一种用于简单任务的快速、廉价模型",
        selected: true,
        icon: "Pouring",
      },
      {
        name: "ChatGPT-4o-mini",
        value: "gpt-4o-mini",
        description: "智能的小型模型适用于快速、轻量级的任务",
        selected: false,
        icon: "Lightning",
      },
      {
        name: "ChatGPT-4o",
        value: "gpt-4o",
        description: "高智能旗舰模型适用于复杂、多步骤的任务",
        selected: false,
        icon: "PartlyCloudy",
      },
    ]
  );

  function addMessage(message: any) {
    messageList.value.push(message);
  }

  async function fetchMessageList(user: number, room: number) {
    const res = await messageApi(user, room);
    if (res.code === 200) {
      messageList.value = res.data;
      return res;
    } else {
      return Promise.reject(new Error("fail"));
    }
  }

  function toggleModel(model: any) {
    modelList.value.forEach((item: any) => {
      if (item.selected) {
        item.selected = false;
        model.selected = true;
        localStorage.setItem("model", JSON.stringify(modelList.value));
      }
    });
  }

  const fetchModel = computed(() => {
    return modelList.value.find((item: any) => item.selected);
  });

  return {
    messageList,
    addMessage,
    fetchMessageList,
    modelList,
    toggleModel,
    fetchModel,
  };
});

export default useChatStore;
