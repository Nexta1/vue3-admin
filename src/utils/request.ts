import axios, { type AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: '/api', // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  (config) => {
    // do something before request is sent
    //   if (store.getters.token) {
    //     // let each request carry token
    //     // ['X-Token'] is a custom headers key
    //     // please modify it according to the actual situation
    //     config.headers['Authorization'] = getToken()
    //   }
    return config
  },
  (error) => {
    // do something with request error

    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response.data
    if (res.code !== 200) {
      ElMessage({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    // if (res.code === 11001 || res.code === 11002) {

    // store.dispatch('user/resetToken').then(() => {
    //   location.reload()
    // })
    return Promise.reject(response)
  },
  (error) => {
    ElMessage({
      message: error.response.data.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
