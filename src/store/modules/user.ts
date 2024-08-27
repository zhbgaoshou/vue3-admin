import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { LoginApi, InfoApi } from "@/api/user";
import type { userParams, userInfo } from "@/api/user/type";
import { setToken, getToken } from "@/utils/local";
import { menuRoutes, asyncRoutes } from "@/router/routes";
import router from "@/router";

const useUserStore = defineStore("user", () => {
  const userInfo = ref<userInfo>({} as userInfo);
  const token = ref(getToken()?.access || "");
  const user = computed(() => userInfo.value.id);
  const menuList = ref(menuRoutes);

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
      // if (res.data.is_superuser) {
      //   const allRoutes = dynamicRoutes(router, asyncRoutes);
      //   menuList.value = allRoutes;
      // }

      return res;
    } else {
      return Promise.reject(new Error("服务器错误"));
    }
  }

  // function dynamicRoutes(router: any, newRoutes: any[]) {
  //   newRoutes.forEach((item) => {
  //     router.addRoute(item);
  //   });
  //   return router.getRoutes();
  // }

  return {
    fetchLogin,
    userInfo,
    token,
    fetchInfo,
    user,
    menuList,
  };
});

export default useUserStore;
