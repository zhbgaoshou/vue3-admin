import { defineStore } from "pinia";
import { ref } from "vue";
import { roomListApi, addRoomApi, updateActiveApi } from "@/api/room";
import type { room } from "@/api/room/type";
import { ElMessage } from "element-plus";

const useRoomStore = defineStore("room", () => {
  const roomList = ref({} as any);
  const activeRoom = ref({} as room[])

  async function fetchRoomList(user: number) {
    const res = await roomListApi(user);
    if (res.code < 400) {
      activeRoom.value = res.data.active_room[0]
      delete res.data.active_room;
      roomList.value = res.data;
      return res.data;
    } else {
      ElMessage("获取会话列表失败");
    }
  }

  async function fetchAddRoom(data: room) {
    const res = await addRoomApi(data);
    if (res.code < 400) {
      return res.data;
    } else {
      return Promise.reject(new Error("add room fail"));
    }
  }

  async function fetchUpdateActive(rooms: room[]) {
    const res = await updateActiveApi(rooms);
    if (res.code === 200) {
      return res;
    } else {
      return Promise.reject(new Error("fail"));
    }
  }


  return {
    roomList,
    fetchRoomList,
    fetchAddRoom,
    activeRoom,
    fetchUpdateActive,
  };
});

export default useRoomStore;
