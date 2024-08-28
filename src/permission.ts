import router from "./router";
import useUserStore from "@/store/modules/user";
import pinia from "@/store";

const userStore = useUserStore(pinia);
router.beforeEach(async function (to, from, next) {
  const token = userStore.token;
  if (token) {
    // 已登陆
    if (to.path === "/user") {
      // 登录之后不能再去登录页
      next("/");
    } else {
      const username = userStore.userInfo.username;
      if (username) {
        next();
      } else {
        const { fetchInfo } = userStore;
        await fetchInfo();
        next({ ...to, replace: true });
      }
    }
  } else {
    // 未登录
    to.path === "/user" ? next() : next(`/user?re=${from.path}`);
  }
});
