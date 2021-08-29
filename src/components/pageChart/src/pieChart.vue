<template>
  <div class="pie-chart">
    <zs-chart :options="options"></zs-chart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'
import zsChart from '@/baseUi/zsChart'

import { IPieData } from '../types'

export default defineComponent({
  components: {
    zsChart
  },
  props: {
    seriesData: {
      type: Array as PropType<IPieData[]>,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => ({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'horizontal',
        left: 'left'
      },
      series: [
        {
          name: '分类商品',
          type: 'pie',
          radius: '50%',
          data: props.seriesData,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }))
    return {
      options
    }
  }
})
</script>

<style scoped></style>
