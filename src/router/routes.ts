import type { RouteRecordRaw } from "vue-router";

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: () => import("@/layout/Layout.vue"),
    name: "layout",
    redirect: "/home",
    children: [
      {
        path: "/home",
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
    redirect: "/acl/user",
    meta: {
      title: "权限管理",
      icon: "Connection",
    },
    children: [
      {
        path: "/acl/user",
        component: () => import("@views/acl/user/User.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          icon: "UserFilled",
        },
      },
      {
        path: "/acl/rule",
        component: () => import("@views/acl/rule/Rule.vue"),
        name: "rule",
        meta: {
          title: "角色管理",
          icon: "Lock",
        },
      },
      {
        path: "/acl/menu",
        component: () => import("@views/acl/menu/Menu.vue"),
        name: "menu",
        meta: {
          title: "菜单管理",
          icon: "Operation",
        },
      },
    ],
  },
];

const routes: RouteRecordRaw[] = [
  ...menuRoutes,
  {
    path: "/login",
    component: () => import("@views/login/Login.vue"),
    name: "login",
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
];

export default routes;
