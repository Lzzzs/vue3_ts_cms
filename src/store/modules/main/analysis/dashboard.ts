import { Module } from 'vuex'
import { IRootState } from '@/store/types'
import { IDashboardState } from './types'

import {
  getCategoryGoodsCount,
  getCategoryGoodsSale,
  getCategoryGoodsFavor,
  getAddressGoodsSale
} from '@/service/main/analysis/dashboard'

const dashboardModule: Module<IDashboardState, IRootState> = {
  namespaced: true,
  state() {
    return {
      categoryGoodsCount: [],
      categoryGoodsSale: [],
      categoryGoodsFavor: [],
      addressGoodsSale: []
    }
  },
  mutations: {
    changeCategoryGoodsCount(state, payload) {
      state.categoryGoodsCount = payload
    },
    changeCategoryGoodsSale(state, payload) {
      state.categoryGoodsSale = payload
    },
    changeCategoryGoodsFavor(state, payload) {
      state.categoryGoodsFavor = payload
    },
    changeAddressGoodsSale(state, payload) {
      state.addressGoodsSale = payload
    }
  },
  actions: {
    async initializeDashboardData({ commit }) {
      const categoryGoodsCount = await getCategoryGoodsCount()
      commit('changeCategoryGoodsCount', categoryGoodsCount.data)
      const categoryGoodsSale = await getCategoryGoodsSale()
      commit('changeCategoryGoodsSale', categoryGoodsSale.data)
      const categoryGoodsFavor = await getCategoryGoodsFavor()
      commit('changeCategoryGoodsFavor', categoryGoodsFavor.data)
      const addressGoodsSale = await getAddressGoodsSale()
      commit('changeAddressGoodsSale', addressGoodsSale.data)
    }
  }
}

export default dashboardModule
