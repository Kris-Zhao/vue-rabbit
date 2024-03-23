import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { useUserStore } from "./userStore";
import { deleteCartAPI, getNewCartListAPI, insertCartAPI } from "@/apis/cart";

export const useCartStore = defineStore(
  "cart",
  () => {
    const cartList = ref([]);

    const userStore = useUserStore();
    const isLogin = computed(() => userStore.userInfo.token);

    const updateNewCartList = async () => {
      const res = await getNewCartListAPI();
      cartList.value = res.result;
    };

    const addCart = async (goods) => {
      const { skuId, count } = goods;
      if (isLogin.value) {
        // 登陆时调用本地接口
        await insertCartAPI({ skuId, count });
        updateNewCartList();
      } else {
        // 非登陆时操作本地
        const item = cartList.value.find((item) => item.skuId === goods.skuId);
        if (item) {
          item.count++;
        } else {
          cartList.value.push(goods);
        }
      }
    };

    const delCart = async (skuId) => {
      if (isLogin.value) {
        // 登陆时调用本地接口
        await deleteCartAPI([skuId]);
        updateNewCartList();
      } else {
        // 非登陆时操作本地

        // 1. index + splice
        const index = cartList.value.findIndex((item) => item.skuId === skuId);
        cartList.value.splice(index, 1);

        // 2. filter
        // cartList.value = cartList.value.filter((item) => item.skuId !== skuId)
      }
    };

    const emptyCart = () => {
      cartList.value = [];
    };

    const singleCheck = (skuId, selected) => {
      const item = cartList.value.find((item) => item.skuId === skuId);
      item.selected = selected;
    };

    const allCheck = (selected) => {
      cartList.value.forEach((item) => (item.selected = selected));
    };

    const totalItems = computed(() => {
      return cartList.value.reduce(
        (totalItems, curItem) => totalItems + curItem.count,
        0
      );
    });

    const totalPrice = computed(() => {
      return cartList.value.reduce(
        (totalPrice, curItem) => totalPrice + curItem.count * curItem.price,
        0
      );
    });

    const isAllChecked = computed(() =>
      cartList.value.every((item) => item.selected)
    );

    const totalSelectedItems = computed(() => {
      return cartList.value.reduce(
        (totalItems, curItem) =>
          totalItems + (curItem.selected ? curItem.count : 0),
        0
      );
    });

    const totalSelectedPrice = computed(() => {
      return cartList.value.reduce(
        (totalPrice, curItem) =>
          totalPrice + (curItem.selected ? curItem.count : 0) * curItem.price,
        0
      );
    });

    return {
      cartList,
      totalItems,
      totalPrice,
      isAllChecked,
      totalSelectedItems,
      totalSelectedPrice,
      updateNewCartList,
      addCart,
      delCart,
      emptyCart,
      singleCheck,
      allCheck,
    };
  },
  {
    persist: true,
  }
);
