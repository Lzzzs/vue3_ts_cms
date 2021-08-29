import { zsRequest } from '@/service'
import { IServerDataType } from '@/service/types'

enum dashboardApi {
  categoryGoodsCount = '/goods/category/count',
  categoryGoodsSale = '/goods/category/sale',
  categoryGoodsFavor = '/goods/category/favor',
  addressGoodsSale = '/goods/address/sale'
}

export const getCategoryGoodsCount = () => {
  return zsRequest.get<IServerDataType>({
    url: dashboardApi.categoryGoodsCount
  })
}
export const getCategoryGoodsSale = () => {
  return zsRequest.get<IServerDataType>({
    url: dashboardApi.categoryGoodsSale
  })
}
export const getCategoryGoodsFavor = () => {
  return zsRequest.get<IServerDataType>({
    url: dashboardApi.categoryGoodsFavor
  })
}
export const getAddressGoodsSale = () => {
  return zsRequest.get<IServerDataType>({
    url: dashboardApi.addressGoodsSale
  })
}
