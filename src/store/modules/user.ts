import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LoginApi, InfoApi, toggleRoomApi } from "@/api/user";
import type { userParams, userInfo } from "@/api/user/type";
import { setToken, getToken } from "@/utils/local";
import { staticRoutes, asyncRoutes } from "@/router/routes";
import router from "@/router";

const useUserStore = defineStore("user", () => {
  const userInfo = ref<userInfo>({} as userInfo);
  const token = ref(getToken()?.access || "");
  // 用户id
  const user_id = computed(() => userInfo.value.id);
  // 默认会话id
  let default_room_id = ref(0);
  // 菜单
  const menuList = ref(staticRoutes);

  // 登录
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

  // 获取用户信息
  async function fetchInfo() {
    const res = await InfoApi();
    if (res.code === 200) {
      userInfo.value = res.data;
      default_room_id.value = res.data.profile.default_room_id;
      if (res.data.is_superuser) {
        menuList.value = [...asyncRoutes, ...staticRoutes];
        asyncRoutes.forEach((item) => {
          router.addRoute(item);
        });
      } else {
        menuList.value = staticRoutes;
      }

      return res;
    } else {
      return Promise.reject(new Error("服务器错误"));
    }
  }

  // 修改默认会话
  async function toggleRoom(data: any) {
    const res = await toggleRoomApi(data);
    if (res.code === 200) {
      return res.data;
    } else {
      return Promise.reject(new Error("服务器错误"));
    }
  }

  return {
    fetchLogin,
    userInfo,
    token,
    fetchInfo,
    user_id,
    menuList,
    default_room_id,
    toggleRoom,
  };
});

export default useUserStore;
