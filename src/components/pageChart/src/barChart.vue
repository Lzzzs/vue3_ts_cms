<template>
  <div class="bar-chart">
    <zs-chart :options="options"></zs-chart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import * as echarts from 'echarts'
import zsChart from '@/baseUi/zsChart'

export default defineComponent({
  components: {
    zsChart
  },
  props: {
    seriesData: {
      type: Array,
      required: true
    },
    xAxisData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => ({
      xAxis: {
        data: props.xAxisData,
        axisLabel: {
          inside: true,
          color: '#fff'
        },
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        z: 10
      },
      yAxis: {
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: '#999'
        }
      },
      dataZoom: [
        {
          type: 'inside'
        }
      ],
      series: [
        {
          type: 'bar',
          showBackground: true,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#83bff6' },
              { offset: 0.5, color: '#188df0' },
              { offset: 1, color: '#188df0' }
            ])
          },
          emphasis: {
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#2378f7' },
                { offset: 0.7, color: '#2378f7' },
                { offset: 1, color: '#83bff6' }
              ])
            }
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
