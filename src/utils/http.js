import { useUserStore } from "@/stores/user";
import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import router from "@/router";

// create axios instance
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios request interceptor
httpInstance.interceptors.request.use(config => {
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if(token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => {
  return Promise.reject(e)
})

// axios response interceptor
httpInstance.interceptors.response.use(res => res.data, e => {
  const userStore = useUserStore()

  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })

  // 401 token expired handler
  if(e.response.status === 401) {
    userStore.clearUserInfo()
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance