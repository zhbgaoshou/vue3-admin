import { defineStore } from "pinia";
import {ref} from 'vue'

import { menuRoutes } from '@/router/routes'

const useMenuStore = defineStore("menu", () => {
    const menuList = ref(menuRoutes)
    
    return {
       menuList
    }
});

export default useMenuStore;
