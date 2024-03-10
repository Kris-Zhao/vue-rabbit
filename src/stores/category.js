import { defineStore } from "pinia";
import { getCategoryAPI } from '@/apis/layout';
import { ref } from 'vue'

export const useCategoryStore = defineStore('category', () => {
  // state
  const categoryList = ref([])

  // action
  async function getCategory() {
    const res = await getCategoryAPI()
    console.log(res);
    categoryList.value = res.result
  }

  return { categoryList, getCategory }
})