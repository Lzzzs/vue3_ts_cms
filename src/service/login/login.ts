import { zsRequest } from '../index'
import { ILoginForm, ILoginResult } from './types'
import { IServerDataType } from '../types'

// 登录请求
export const loginServer = (loginForm: ILoginForm) => {
  return zsRequest.post<IServerDataType<ILoginResult>>({
    url: '/login',
    data: loginForm
  })
}

// 根据id获取用户信息
export const getUserInfoById = (id: number) => {
  return zsRequest.get<IServerDataType>({
    url: `/users/${id}`,
    showLoading: false
  })
}

//获取菜单
export const getUserMenusByRoleId = (id: number) => {
  return zsRequest.get<IServerDataType>({
    url: `/role/${id}/menu`,
    showLoading: false
  })
}
