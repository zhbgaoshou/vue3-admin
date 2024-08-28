import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { roomListApi, addRoomApi, updateActiveApi } from "@/api/room";
import type { room } from "@/api/room/type";

const useRoomStore = defineStore("room", () => {
  const roomList = ref({} as any);
  const activeRoom = ref(JSON.parse(localStorage.getItem("activeRoom") as string) || {} as any)

  async function fetchRoomList(user: number) {
    const res = await roomListApi(user);
    if (res.code < 400) {
      roomList.value = res.data;
      if(!activeRoom.value.id){activeRoom.value = res.data.today.data.at(-1)}
      return res.data;
    } else {
      return Promise.reject(new Error("fail"));
    }
  }

  watch(activeRoom, (newValue) => {
    localStorage.setItem("activeRoom", JSON.stringify(newValue))
  })

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

  const todayObject = computed(() => {
    return roomList.value?.today
  })



  return {
    roomList,
    fetchRoomList,
    fetchAddRoom,
    fetchUpdateActive,
    todayObject,
    activeRoom
  };
});

export default useRoomStore;
