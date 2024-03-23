import { defineStore } from "pinia";
import { ref } from "vue";
import { userAPI } from "@/apis/user";
import { useCartStore } from "./cartStore";

export const useUserStore = defineStore(
  "user",
  () => {
    const userInfo = ref({});

    const cartStore = useCartStore();

    const getUserInfo = async ({ account, password }) => {
      const res = await userAPI({ account, password });
      userInfo.value = res.result;
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
