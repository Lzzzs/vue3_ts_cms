import { Module } from 'vuex'
import router from '@/router'
// service
import {
  loginServer,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
// utils
import localCache from '@/utils/localCache'
import mapToRoutes from '@/utils/mapToRoutes'
import mapJurisdictionArr from '@/utils/mapJurisdictionArr'

// type
import type { ILoginForm } from '@/service/login/types'
import type { ILoginState } from './types'
import type { IRootState } from '../../types'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: [],
      permissionArr: []
    }
  },
  mutations: {
    changeToken(state, payload) {
      state.token = payload
    },
    changeUserInfo(state, payload) {
      state.userInfo = payload
    },
    changeUserMenus(state, payload) {
      state.userMenus = payload

      // 获取到动态的routes
      const routes = mapToRoutes(payload)
      // 添加routes
      routes.forEach((route) => {
        router.addRoute('main', route)
      })

      // 获取用户权限数组
      const permissionArr = mapJurisdictionArr(payload)
      state.permissionArr = permissionArr
    }
  },
  actions: {
    async acountLoginAction({ commit, dispatch }, payload: ILoginForm) {
      // 保存token并且保存
      const loginResult = await loginServer(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      localCache.setCache('token', token)

      // 获取初始化数据(部门/角色的数据)
      dispatch('getInitialPageListData', null, { root: true })

      // 获取用户信息并且保存
      const userInfoResult = await getUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 获取用户菜单并且保存
      const userMenuResult = await getUserMenusByRoleId(userInfo.role.id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 跳转主页
      router.push('/main')
    },
    // 重新加载关于用户的登录信息 主要是防止用户刷新之后vuex的数据清空
    reloadLoginInfo({ commit, dispatch }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 获取初始化数据(部门/角色的数据)
        dispatch('getInitialPageListData', null, { root: true })
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}
export default loginModule
