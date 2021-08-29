import axios from 'axios'
import type { AxiosInstance } from 'axios'
import type { zsRequestConfig, zsRequestInterceptors } from './type'
import { ElLoading } from 'element-plus'
import type { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

export default class requestClass {
  instance: AxiosInstance
  interceptors?: zsRequestInterceptors
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: zsRequestConfig) {
    // 创建实例将实例保存
    this.instance = axios.create(config)
    // 将拦截器保存
    this.interceptors = config.interceptors
    // 对showLoading初始化 默认是true
    this.showLoading = true

    // 使用拦截器 -> 实例拦截 只是单独对于某个实例的拦截
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responceinterceptors,
      this.interceptors?.responceInterceptorsCatch
    )

    // 全局拦截 只要创建了这个实例都自带的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        if (this.showLoading === true) {
          // this.loading = ElLoading.service({ fullscreen: true })
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        return config
      },
      (err) => {
        console.log(err)
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        return res.data
      },
      (err) => {
        this.loading?.close()
        console.log(err)
      }
    )
  }

  request<T>(config: zsRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 对单独使用这个请求做拦截
      if (config.interceptors?.requestInterceptors) {
        config = config.interceptors.requestInterceptors(config)
      }

      // 如果showLoading为false 则修改
      if (config.showLoading === false) {
        this.showLoading = false
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 响应拦截
          if (config.interceptors?.responceinterceptors) {
            res = config.interceptors.responceinterceptors(res)
          }
          resolve(res)
          // 保证下一次请求的默认值是true
          this.showLoading = true
        })
        .catch((err) => {
          reject(err)
          // 保证下一次请求的默认值是true
          this.showLoading = true
        })
    })
  }

  get<T>(config: zsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'get' })
  }

  post<T>(config: zsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'post' })
  }

  delete<T>(config: zsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'delete' })
  }

  patch<T>(config: zsRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'patch' })
  }
}
