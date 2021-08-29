<template>
  <div class="china-chart">
    <zs-chart :options="options"></zs-chart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import zsChart from '@/baseUi/zsChart'

import { convertData } from '../utils/convertData'

export default defineComponent({
  components: {
    zsChart
  },
  props: {
    seriesData: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    const options = computed(() => ({
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          if (typeof params.value[2] == 'undefined') {
            return params.name + ' : ' + params.value
          } else {
            return params.name + ' : ' + params.value[2]
          }
        }
      },
      legend: {
        orient: 'vertical',
        y: 'bottom',
        x: 'right',
        color: '#fff'
      },
      visualMap: {
        min: 0,
        max: 60000,
        left: 20,
        bottom: 20,
        calculable: true,
        text: ['高', '低'],
        inRange: {
          color: ['rgb(70, 240, 252)', 'rgb(250, 220, 46)', 'rgb(245, 38, 186)']
        },
        textStyle: {
          color: '#fff'
        }
      },
      geo: {
        map: 'china',
        show: true,
        roam: true,
        emphasis: {
          itemStyle: {
            areaColor: '#f4cccc'
          },
          label: {
            show: false
          }
        }
      },
      series: [
        {
          symbolSize: 5,
          emphasis: {
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          itemStyle: {
            color: '#fff'
          },
          type: 'scatter',
          coordinateSystem: 'geo',
          data: convertData(props.seriesData)
        },
        {
          type: 'map',
          map: 'china',
          geoIndex: 0,
          aspectScale: 0.75, //长宽比
          showLegendSymbol: false, // 存在legend时显示
          roam: true,
          emphasis: {
            itemStyle: {
              borderColor: '#FFFFFF',
              areaColor: '#2B91B7'
            },
            label: {
              show: false,
              color: '#fff'
            }
          },
          animation: false,
          data: props.seriesData
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          symbol: 'pin',
          symbolSize: [50, 50],
          label: {
            show: true,
            color: '#fff',
            fontSize: 9,
            formatter(value: any) {
              return value.data.value[2]
            }
          },
          itemStyle: {
            color: '#D8BC37' //标志颜色
          },
          data: convertData(props.seriesData),
          showEffectOn: 'render',
          rippleEffect: {
            brushType: 'stroke'
          },
          emphasis: {
            scale: {
              hoverAnimation: true
            }
          },
          zlevel: 1
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
