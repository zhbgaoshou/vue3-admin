import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/styles/index.css";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";

import router from "./router";
import pinia from "./store";
import globalComponent from "@/plugin";
import "./permission";

createApp(App)
  .use(ElementPlus)
  .use(router)
  .use(pinia)
  .use(globalComponent)
  .mount("#app");
