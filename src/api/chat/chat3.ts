import type { chatParams } from "./type";
import useUserStore from "@/store/modules/user";
import useChatStore from "@/store/modules/chat";
import request from "@/utils/request";

export const chat3Api = (data: chatParams, signal: AbortSignal) => {
  const userStore = useUserStore();
  const chatStore = useChatStore();
  return fetch(`/api/chat/index?model=${chatStore.fetchModel.value}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${userStore.token}` },
    body: JSON.stringify(data),
    signal,
  });
};

export const messageApi = (user: number, room: number) =>
  request.get<any, any>(`/chat/message/?user=${user}&room=${room}`);
