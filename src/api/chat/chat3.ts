import type { chatParams } from "./type";
import useUserStore from "@/store/modules/user";

export const chat3Api = (data: chatParams) => {
  const userStore = useUserStore();
  return fetch(`/api/chat/index?model=${"gpt-3.5-turbo"}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${userStore.token}` },
    body: JSON.stringify(data),
  });
};
