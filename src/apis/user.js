import httpInstance from "@/utils/http"

export const userAPI = ({ account, password }) => {
  return httpInstance({
    url: '/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}