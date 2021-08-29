<template>
  <div class="line-chart">
    <zs-chart :options="options"></zs-chart>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
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
        type: 'category',
        boundaryGap: false,
        data: props.xAxisData
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: props.seriesData,
          type: 'line',
          areaStyle: {}
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
