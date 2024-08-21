import { defineStore } from "pinia";
import { ref } from 'vue'

const useRoomStore = defineStore("menu", () => {
    const roomList = ref([])

    return {
        roomList
    }
});

export default useRoomStore;