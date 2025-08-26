import { defineStore } from 'pinia'
import useInfoStore from './modules/useInfo'

export const useMenuStore = defineStore('menu', {
  state: () => ({
    topMenu: '七年级上',
    sideMenu: [
      { chapter: '第一章', sections: ['第一小节', '第二小节'] }
    ]
  }),
  actions: {
    setTopMenu(menu) {
      this.topMenu = menu
    }
  }
}) 

export { useInfoStore }
