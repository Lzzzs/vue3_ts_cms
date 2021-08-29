<template>
  <div class="rose-chart">
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
      series: [
        {
          name: '玫瑰图',
          type: 'pie',
          radius: [10, 100],
          center: ['50%', '50%'],
          roseType: 'area',
          itemStyle: {
            borderRadius: 8
          },
          data: props.seriesData
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
