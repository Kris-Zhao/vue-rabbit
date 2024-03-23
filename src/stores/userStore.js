import { defineStore } from "pinia";
import { ref } from "vue";
import { userAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";
import { mergeCartAPI } from "@/apis/cart";

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});

    const cartStore = useCartStore();

    const getUserInfo = async ({ account, password }) => {
      const res = await userAPI({ account, password });
      userInfo.value = res.result;

      // merge local cart to the cart from api
      await mergeCartAPI(
        cartStore.cartList.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count,
          };
        })
      );
      await cartStore.updateNewCartList();
    };

    const clearUserInfo = () => {
      userInfo.value = {};
      // empty cart
      cartStore.emptyCart();
    };

    return {
      userInfo,
      getUserInfo,
      clearUserInfo,
    };
  },
  {
    persist: true,
  }
);
