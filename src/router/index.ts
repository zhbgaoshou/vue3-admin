import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const initRouter = () => {
  return createRouter({
    history: createWebHistory(),
    scrollBehavior() {
      return { top: 0 };
    },
    routes,
  });
};

const router = initRouter();

export default router;
