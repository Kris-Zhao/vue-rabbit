import httpInstance from "@/utils/http";

export function getCatgoryAPI() {
  return httpInstance({
    url: 'home/category/head'
  })
}
