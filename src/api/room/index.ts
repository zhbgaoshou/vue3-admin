import request from "@/utils/request";
import type { roomListRes, room, addRoomRes, editRoomParams } from "./type";

// 获取用户会话列表
export function roomListApi(user: number) {
  return request.get<any, any>(`/chat/room/categorized/?user=${user}`);
}

// 添加会话
export function addRoomApi(data: any) {
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

// 修改默认会话
export function updateActiveApi(rooms: room[]) {
  return request<any, roomListRes>({
    url: `/chat/room/update_active/`,
    method: "PATCH",
    data: rooms,
  });
}
