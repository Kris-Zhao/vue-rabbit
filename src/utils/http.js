import axios from "axios";

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
  return Promise.reject(e)
})

export default httpInstance