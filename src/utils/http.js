import axios from "axios";
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'

// create axios instance
const httpInstance = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 5000
})

// axios request interceptor
httpInstance.interceptors.request.use(config => config, e => {
  return Promise.reject(e)
})

// axios response interceptor
httpInstance.interceptors.response.use(res => res.data, e => {
  ElMessage({
    type: 'warning',
    message: e.response.data.message
  })
  return Promise.reject(e)
})

export default httpInstance