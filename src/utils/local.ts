import useUserStore from "@/store/modules/user";
import useChatStore from "@/store/modules/chat";

export function setToken(token: string | object) {
  if (typeof token === "object") {
    localStorage.setItem("token", JSON.stringify(token));
  } else {
    localStorage.setItem("token", token);
  }
}

export function getToken() {
  const t = localStorage.getItem("token");
  return JSON.parse(t as string);
}

export function removeToken() {
  localStorage.removeItem("token");
}

export function beforeLoginOut() {
  const userStore = useUserStore();
  const chatStore = useChatStore();
  userStore.token = "";
  userStore.userInfo.username = "";
  userStore.userInfo.email = "";
  userStore.userInfo.profile.image = "";
  userStore.userInfo.date_joined = "";
  chatStore.messageList = [];
  removeToken();
}
