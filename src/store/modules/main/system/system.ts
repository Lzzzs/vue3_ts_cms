import { Module } from 'vuex'
import {
  requestListData,
  deleteListData,
  createPageData,
  editListData
} from '@/service/main/system/system'

import type { ISystemState } from './types'
import type { IRootState } from '@/store/types'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: {
    usersListData: [],
    usersCount: 0,
    roleListData: [],
    roleCount: 0,
    goodsListData: [],
    goodsCount: 0,
    menuListData: [],
    menuCount: 0,
    departmentListData: [],
    departmentCount: 0
  },
  mutations: {
    changeUsersListData(state, payload) {
      state.usersListData = payload
    },
    changeUsersCount(state, payload) {
      state.usersCount = payload
    },
    changeRoleListData(state, payload) {
      state.roleListData = payload
    },
    changeRoleCount(state, payload) {
      state.roleCount = payload
    },
    changeGoodsListData(state, payload) {
      state.goodsListData = payload
    },
    changeGoodsCount(state, payload) {
      state.goodsCount = payload
    },
    changeMenuListData(state, payload) {
      state.menuListData = payload
    },
    changeMenuCount(state, payload) {
      state.menuCount = payload
    },
    changeDepartmentListData(state, payload) {
      state.departmentListData = payload
    },
    changeDepartmentCount(state, payload) {
      state.departmentCount = payload
    }
  },
  actions: {
    async getListData({ commit }, { pageName, data }) {
      const url = `/${pageName}/list`
      const listData = await requestListData(url, data)

      const mutationName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1).toLowerCase()

      commit(`change${mutationName}ListData`, listData.data.list)
      commit(`change${mutationName}Count`, listData.data.totalCount)
    },
    async deleteListData({ dispatch }, { pageName, id }) {
      // 删除数据
      await deleteListData(`/${pageName}/${id}`)
      // 数据更新
      dispatch('getListData', {
        pageName,
        data: {
          size: 10,
          offset: 0
        }
      })
    },
    async createData({ dispatch }, { pageName, data }) {
      const result = await createPageData(`/${pageName}`, data)
      // 数据更新
      dispatch('getListData', {
        pageName,
        data: {
          size: 10,
          offset: 0
        }
      })
    },
    async editData({ dispatch }, { pageName, id, data }) {
      const result = await editListData(`/${pageName}/${id}`, data)
      // 数据更新
      dispatch('getListData', {
        pageName,
        data: {
          size: 10,
          offset: 0
        }
      })
    }
  }
}

export default systemModule
