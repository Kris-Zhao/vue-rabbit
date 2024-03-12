import { getCategoryAPI } from '@/apis/category.js'
import { onMounted, ref } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'

export function useCategory() {
  const categoryData = ref({})
  const route = useRoute()

  async function getCategory(id = route.params.id) {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => getCategory())
  // If route changes, re-get categoryData
  onBeforeRouteUpdate((to) => {
    getCategory(to.params.id)
  })

  return {
    categoryData
  }
}