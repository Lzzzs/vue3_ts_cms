import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

// 注册中国地图
import chinaJson from '@/baseUi/zsChart/map/china.json'
echarts.registerMap('china', chinaJson)

export const useEcharts = (el: HTMLElement) => {
  const echartsInstance = echarts.init(el, 'theme', {
    renderer: 'svg'
  })

  const setOption = (options: EChartsOption) => {
    echartsInstance.setOption(options)
  }

  const resize = () => {
    echartsInstance.resize()
  }
  // 监听window窗体的resize事件 如果窗体有变化 则resize图表
  window.addEventListener('resize', () => {
    echartsInstance.resize()
  })

  return { echartsInstance, setOption, resize }
}
