import { defineStore } from "pinia";
import {ref} from 'vue'

import { menuRoutes } from '@/router/routes'

const useMenuStore = defineStore("menu", () => {
    const menuList = ref(menuRoutes)
    let isColl = ref(true)
    
    return {
       menuList,
       isColl
    }
});

export default useMenuStore;
