import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { roomListApi, addRoomApi, updateActiveApi } from "@/api/room";
import type { room } from "@/api/room/type";

const useRoomStore = defineStore("room", () => {
  const roomList = ref<Record<string, any>>({});

  // Fetch room list and manage active room logic
  async function fetchRoomList(userId: number) {
    try {
      const res = await roomListApi(userId);
      if (res.code < 400) {
        roomList.value = res.data;
        return res;
      } else {
        throw new Error("Failed to fetch room list");
      }
    } catch (error) {
      console.error(error);
      throw error; // Re-throw error to propagate it
    }
  }

  // Add a new room
  async function fetchAddRoom(data: room) {
    const res = await addRoomApi(data);
    if (res.code < 400) {
      return res.data;
    } else {
      throw new Error("Failed to add room");
    }
  }

  // Update active rooms
  async function fetchUpdateActive(rooms: room[]) {
    const res = await updateActiveApi(rooms);
    if (res.code === 200) {
      return res;
    } else {
      throw new Error("Failed to update active rooms");
    }
  }

  // Compute today's room data
  const todayObject = computed(() => roomList.value?.today || {});

  return {
    roomList,
    fetchRoomList,
    fetchAddRoom,
    fetchUpdateActive,
    todayObject,
  };
});

export default useRoomStore;
