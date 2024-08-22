import request from "@/utils/request";
import type { roomListRes, room, addRoomRes, editRoomParams } from "./type";

// 获取用户会话列表
export function roomListApi(user: number) {
  return request.get<any, roomListRes>(`/chat/room/?user=${user}`);
}

// 添加会话
export function addRoomApi(data: room) {
  return request<any, addRoomRes>({
    url: `/chat/room/`,
    method: "POST",
    data,
  });
}

// 删除会话
export function deleteRoomApi(id: number) {
  return request<any, any>({
    url: `/chat/room/${id}/`,
    method: "DELETE",
  });
}

// 修改会话
export function editRoomApi(id: number, data: editRoomParams) {
  return request<any, any>({
    url: `/chat/room/${id}/`,
    method: "PATCH",
    data,
  });
}
