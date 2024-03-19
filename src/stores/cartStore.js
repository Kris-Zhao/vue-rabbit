import { defineStore } from "pinia";
import { computed, ref } from 'vue'

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

    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId)
      item.selected = selected
    }

    const allCheck = (selected) => {
      cartList.value.forEach(item => item.selected = selected)
    }

    const totalItems = computed(() => {
      return cartList.value.reduce((totalItems, curItem) => totalItems + curItem.count, 0)
    })

    const totalPrice = computed(() => {
      return cartList.value.reduce((totalPrice, curItem) => totalPrice + curItem.count * curItem.price, 0)
    })

    const isAllChecked = computed(() => cartList.value.every((item) => item.selected))

    const totalSelectedItems = computed(() => {
      return cartList.value.reduce((totalItems, curItem) => totalItems + (curItem.selected ? curItem.count : 0) , 0)
    })

    const totalSelectedPrice = computed(() => {
      return cartList.value.reduce((totalPrice, curItem) => totalPrice + (curItem.selected ? curItem.count : 0) * curItem.price, 0)
    })

    return {
      cartList,
      totalItems,
      totalPrice,
      isAllChecked,
      totalSelectedItems,
      totalSelectedPrice,
      addCart,
      delCart,
      singleCheck,
      allCheck
    }
}, {
  persist: true
})