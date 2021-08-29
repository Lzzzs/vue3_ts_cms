import { zsRequest } from '@/service/index'
import { IServerDataType } from '@/service/types'

export const requestListData = (url: string, data: any) => {
  return zsRequest.post<IServerDataType>({
    url,
    data
  })
}
export const deleteListData = (url: string) => {
  return zsRequest.delete<IServerDataType>({
    url
  })
}
export const createPageData = (url: string, data: any) => {
  return zsRequest.post<IServerDataType>({
    url,
    data
  })
}
export const editListData = (url: string, data: any) => {
  return zsRequest.patch<IServerDataType>({
    url,
    data
  })
}
