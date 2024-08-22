import axios from "axios";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/modules/user";
import router from "@/router";
import { beforeLoginOut } from "@/utils/local";
import nprogress from "nprogress"; // 进度条
import "nprogress/nprogress.css";

const request = axios.create({
  baseURL: import.meta.env.VITE_API,
  timeout: 5000,
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    nprogress.start();
    const userStore = useUserStore();
    config.headers["Authorization"] = `Bearer ${userStore.token}`;
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    nprogress.done();
    if (response.status === 204) {
      return response;
    }
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    nprogress.done();
    const { status, data } = error.response;
    const errorMessage = data.data.detail;
    ElMessage.error(errorMessage);
    switch (status) {
      case 401:
        beforeLoginOut();
        router.replace("/login");
        break;
    }

    return Promise.reject(error);
  }
);

export default request;
