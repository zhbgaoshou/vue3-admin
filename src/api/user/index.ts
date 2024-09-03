import request from "@/utils/request";
import type { userParams, loginRes, userInfoRes } from "./type";

enum API {
  Login = "user/login",
  Info = "user/info",
  Register = "user/register",
}
// login
export const LoginApi = (data: userParams) =>
  request<any, loginRes>({ url: API.Login, method: "POST", data });

// register
export const RegisterApi = (data: any) =>
  request<any, any>({ url: API.Register, method: "POST", data });

// info
export const InfoApi = () => request.get<any, userInfoRes>(API.Info);

// 修改默认会话
export const toggleRoomApi = (data: any) =>
  request<any, any>({
    url: `user/toggle-room`,
    method: "PATCH",
    data,
  });
