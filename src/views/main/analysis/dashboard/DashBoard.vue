<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="7">
        <zs-card title="分类商品数量">
          <pie-chart :seriesData="pieData"></pie-chart>
        </zs-card>
      </el-col>
      <el-col :span="10">
        <zs-card title="不同城市商品销量">
          <china-chart :seriesData="chinaData"></china-chart>
        </zs-card>
      </el-col>
      <el-col :span="7">
        <zs-card title="分类商品数量(玫瑰图)">
          <rose-chart :seriesData="pieData"></rose-chart>
        </zs-card>
      </el-col>
    </el-row>
    <el-row :gutter="10" class="content">
      <el-col :span="12">
        <zs-card title="分类商品的销量">
          <line-chart v-bind="lineData"></line-chart>
        </zs-card>
      </el-col>
      <el-col :span="12">
        <zs-card title="分类商品的收藏">
          <bar-chart v-bind="barData"></bar-chart>
        </zs-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import zsCard from '@/baseUi/zsCard'
import {
  PieChart,
  RoseChart,
  LineChart,
  BarChart,
  ChinaChart
} from '@/components/pageChart'

export default defineComponent({
  components: { zsCard, PieChart, RoseChart, LineChart, BarChart, ChinaChart },
  setup() {
    const store = useStore()
    store.dispatch('dashboard/initializeDashboardData')

    const pieData = computed(() => {
      return store.state.dashboard.categoryGoodsCount.map((item) => ({
        value: item.goodsCount,
        name: item.name
      }))
    })

    const lineData = computed(() => {
      const seriesData: number[] = []
      const xAxisData: string[] = []
      store.state.dashboard.categoryGoodsSale.map((item) => {
        seriesData.push(item.goodsCount)
        xAxisData.push(item.name)
      })
      return {
        seriesData,
        xAxisData
      }
    })
    const barData = computed(() => {
      const seriesData: number[] = []
      const xAxisData: string[] = []
      store.state.dashboard.categoryGoodsFavor.map((item) => {
        seriesData.push(item.goodsFavor)
        xAxisData.push(item.name)
      })
      return {
        seriesData,
        xAxisData
      }
    })
    const chinaData = computed(() => {
      return store.state.dashboard.addressGoodsSale.map((item) => ({
        name: item.address,
        value: item.count
      }))
    })

    return { pieData, lineData, barData, chinaData }
  }
})
</script>

<style scoped>
.content {
  margin-top: 20px;
}
</style>
