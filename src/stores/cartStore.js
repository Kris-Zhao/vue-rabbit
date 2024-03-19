import { defineStore } from "pinia";
import { ref } from 'vue'

export const useCartStore = defineStore('cart', () => {
    const cartList = ref([])

    const addCart = (goods) => {
      const item = cartList.value.find((item) => item.skuId === goods.skuId)
      if(item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }

    const delCart = (skuId) => {
      // 1. index + splice
      const index = cartList.value.findIndex((item) => item.skuId === skuId)
      cartList.value.splice(index, 1)

      // 2. filter
      // cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
    }

    return {
      cartList,
      addCart,
      delCart
    }
}, {
  persist: true
})