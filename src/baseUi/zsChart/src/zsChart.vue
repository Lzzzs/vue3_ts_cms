<template>
  <div class="zs-chart">
    <div ref="divRef" :style="elStyle"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, PropType, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'

import { useEcharts } from '@/hooks/useEcharts'

export default defineComponent({
  props: {
    elStyle: {
      type: Object,
      default: () => ({ width: '100%', height: '300px' })
    },
    options: {
      type: Object as PropType<EChartsOption>,
      required: true
    }
  },
  setup(props) {
    const divRef = ref<HTMLElement>()
    onMounted(() => {
      // 把关于echarts有关的方法抽成一个hooks 然后暴露出对应的方法
      const { setOption } = useEcharts(divRef.value!)
      watchEffect(() => {
        setOption(props.options)
      })
    })
    return {
      divRef
    }
  }
})
</script>

<style scoped></style>
