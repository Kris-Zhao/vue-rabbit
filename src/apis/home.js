import httpInstance from "@/utils/http"

export function getHomeBannerAPI() {
  return httpInstance({
    url: '/home/banner'
  })
}