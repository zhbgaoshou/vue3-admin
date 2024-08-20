import { ref } from "vue";

import { defineStore } from "pinia";
import { LoginApi, InfoApi } from "@/api/user";
import type { userParams, userInfo } from "@/api/user/type";
import { setToken, getToken } from "@/utils/local";

const useUserStore = defineStore("user", () => {
  const userInfo = ref<userInfo>({
    username: "",
    email: "",
    date_joined: "",
    profile: {
      image: "",
    },
  } as userInfo);

  const token = ref(getToken()?.access || "");

  async function fetchLogin(data: userParams) {
    const res = await LoginApi(data);
    if (res.code === 200) {
      token.value = res.data.access;
      setToken(res.data);
      return res;
    } else {
      return Promise.reject(new Error("服务器错误"));
    }
  }

  async function fetchInfo() {
    const res = await InfoApi();
    if (res.code === 200) {
      userInfo.value = res.data;
      return res;
    } else {
      return Promise.reject(new Error("服务器错误"));
    }
  }

  return {
    fetchLogin,
    userInfo,
    token,
    fetchInfo,
  };
});

export default useUserStore;
