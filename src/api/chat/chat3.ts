import type { chatParams } from "./type";
import useUserStore from "@/store/modules/user";

export const chat3Api = (data: chatParams) => {
  const userStore = useUserStore();
  return fetch("/api/chat/index", {
    method: "POST",
    headers: { Authorization: `Bearer ${userStore.token}` },
    body: JSON.stringify(data),
  });
};
