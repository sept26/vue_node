import axios from 'axios'

// 创建axios 实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 10000
})

// request拦截器
service.interceptors.request.use(config => {
  return config
}, err => {
  console.log(err)
  Promise.reject(err)
})

service.interceptors.response.use(response => {
  return response.data
}, err => {
  console.log(err)
  return Promise.reject(err)
})
export default service
