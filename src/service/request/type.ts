import type { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface zsRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responceinterceptors?: (response: T) => T
  responceInterceptorsCatch?: (error: any) => any
}

export interface zsRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: zsRequestInterceptors<T>
  showLoading?: boolean
}
