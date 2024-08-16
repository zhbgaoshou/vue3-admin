import type { RouteRecordRaw } from "vue-router";
import Layout from "@/layout/Layout.vue";

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Layout,
    name: "layout",
    redirect: "/home",
    children: [
      {
        path: "home",
        component: () => import("@views/home/Home.vue"),
        name: "home",
        meta: {
          title: "首页",
          icon: "",
        },
      },
    ],
  },
  {
    path: "/acl",
    component: Layout,
    name: "acl",
    redirect: "/acl/user",
    meta: {
      title: "权限管理",
      icon: "",
    },
    children: [
      {
        path: "user",
        component: () => import("@views/acl/user/User.vue"),
        name: "user",
        meta: {
          title: "用户管理",
          icon: "",
        },
      },
      {
        path: "rule",
        component: () => import("@views/acl/rule/Rule.vue"),
        name: "rule",
        meta: {
          title: "角色管理",
          icon: "",
        },
      },
      {
        path: "menu",
        component: () => import("@views/acl/menu/Menu.vue"),
        name: "menu",
        meta: {
          title: "菜单管理",
          icon: "",
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
