import request from "@/utils/request";
import type { userParams, loginRes, userInfoRes } from "./type";

enum API {
  Login = "user/login",
  Info = "user/info",
}
// login
export const LoginApi = (data: userParams) =>
  request<any, loginRes>({ url: API.Login, method: "POST", data });

// info
export const InfoApi = () => request.get<any, userInfoRes>(API.Info);
