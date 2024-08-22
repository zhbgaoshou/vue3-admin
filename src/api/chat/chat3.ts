import type { chatParams } from "./type";
import useUserStore from "@/store/modules/user";
import { defaultModel } from "@/config/chat";
import request from "@/utils/request";

export const chat3Api = (data: chatParams) => {
  const userStore = useUserStore();
  return fetch(`/api/chat/index?model=${defaultModel}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${userStore.token}` },
    body: JSON.stringify(data),
  });
};

export const messageApi = (user: number, room: number) => request.get<any, any>(`/chat/message/?user=${user}&room=${room}`)
