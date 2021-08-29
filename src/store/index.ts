import { createStore, useStore as useRootStore } from 'vuex'
import login from './modules/login/login'
import system from './modules/main/system/system'
import dashboard from './modules/main/analysis/dashboard'
import { requestListData } from '@/service/main/system/system'

import { IStoreType } from './types'

const store = createStore({
  state() {
    return {
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload
    },
    changeEntireMenu(state, payload) {
      state.entireMenu = payload
    }
  },
  actions: {
    // 获取初始化的页面数据
    async getInitialPageListData({ commit }) {
      // 获取部门列表数据
      const departmentListDataResult = await requestListData(
        '/department/list',
        {
          offset: 0,
          size: 1000
        }
      )
      const departmentListData = departmentListDataResult.data.list
      // 获取角色列表数据
      const roleListDataResult = await requestListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const roleListData = roleListDataResult.data.list
      // 获取角色列表数据
      const menuListDataResult = await requestListData('/menu/list', {})
      const menuListData = menuListDataResult.data.list
      commit('changeEntireDepartment', departmentListData)
      commit('changeEntireRole', roleListData)
      commit('changeEntireMenu', menuListData)
    }
  },
  modules: {
    login,
    system,
    dashboard
  }
})

export const setupStore = () => {
  store.dispatch('login/reloadLoginInfo')
}

// 导出自定义的useStore 目的是为了不用在其他文件使用vue的useStore每次都要导入类型
export const useStore = () => {
  return useRootStore<IStoreType>()
}

export default store
