import { ref } from 'vue'
import PageContent from '@/components/pageContent/src/pageContent.vue'

export const usePageSelect = () => {
  // 获取content的ref
  const pageContentRef = ref<InstanceType<typeof PageContent>>()

  // 重置事件
  const resetClick = () => {
    pageContentRef.value?.getPageData()
  }
  // 搜索事件
  const selectClick = (dataInfo: any) => {
    // 将有值的字段重新构造一个对象
    const data: any = {}
    for (const key in dataInfo) {
      if (dataInfo[key]) {
        data[key] = dataInfo[key]
      }
    }
    pageContentRef.value?.getPageData(data)
  }

  return [pageContentRef, resetClick, selectClick]
}
