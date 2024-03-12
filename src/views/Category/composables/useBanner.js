import { onMounted, ref } from 'vue'
import { getHomeBannerAPI } from '@/apis/home';

export default function useBanner() {
  // Get banner
  const homeBannerList = ref([])
  async function getHomeBanner() {
    const res = await getHomeBannerAPI({
      distributionSite: '2'
    })
    homeBannerList.value = res.result
  }

  onMounted(() => {
    getHomeBanner()
  })

  return {
    homeBannerList
  }
}