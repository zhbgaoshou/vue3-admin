import type { RouteRecordRaw } from "vue-router";

// 异步路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: "/home",
    component: () => import("@/layout/Layout.vue"),
    name: "dashboard",
    redirect: "/home/index",
    children: [
      {
        path: "/home/index",
        component: () => import("@views/home/Home.vue"),
        name: "home",
        meta: {
          title: "首页",
          icon: "HomeFilled",
        },
      },
    ],
  },
  {
    path: "/acl",
    component: () => import("@/layout/Layout.vue"),
    name: "acl",
    redirect: "/acl/acl_user",
    meta: {
      title: "权限管理",
      icon: "Connection",
    },
    children: [
      {
        path: "/acl/acl_user",
        component: () => import("@views/acl/user/User.vue"),
        name: "acl_user",
        meta: {
          title: "用户管理",
          icon: "UserFilled",
        },
      },
    ],
  },
];

// 静态路由
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: "/chat",
    component: () => import("@/layout/Layout.vue"),
    name: "chat",
    redirect: "/chat/ai",
    children: [
      {
        path: "/chat/ai",
        component: () => import("@views/chat/Chat.vue"),
        name: "chat",
        meta: {
          title: "聊天",
          icon: "ChatRound",
        },
      },
    ],
  },
];

// 全部路由表
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/chat/ai",
  },
  ...staticRoutes,
  {
    path: "/user",
    component: () => import("@views/user/User.vue"),
    name: "user",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/404",
    component: () => import("@views/error/404.vue"),
    name: "404",
    meta: {
      hidden: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
  },
];

export default routes;
