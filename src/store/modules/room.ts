import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { roomListApi, addRoomApi } from "@/api/room";
import type { room } from "@/api/room/type";
import { ElMessage } from "element-plus";

const useRoomStore = defineStore("room", () => {
  const roomList = ref([] as room[]);

  async function fetchRoomList(user: number) {
    const res = await roomListApi(user);
    if (res.code < 400) {
      roomList.value = res.data.results;
      return res.data.results;
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

  const activeRoom = computed(() =>
    roomList.value.filter((item) => item.active)
  );

  return {
    roomList,
    fetchRoomList,
    fetchAddRoom,
    activeRoom,
  };
});

export default useRoomStore;
