import requestClass from './request/index'
import { BASE_URL } from './request/config'
import localCache from '@/utils/localCache'

export const zsRequest = new requestClass({
  baseURL: BASE_URL,
  timeout: 10000,
  interceptors: {
    requestInterceptors: (config) => {
      const token = localCache.getCache('token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    }
  }
})
