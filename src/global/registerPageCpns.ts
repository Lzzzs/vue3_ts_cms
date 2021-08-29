/**
 * 注册全局的页面组件
 */
import type { App } from 'vue'
import pageContent from '@/components/pageContent/src/pageContent.vue'
import pageSearch from '@/components/pageSearch/src/pageSearch.vue'
import pageDialog from '@/components/pageDialog/src/pageDialog.vue'

export function registerPageCpns(app: App): void {
  app.component('pageContent', pageContent)
  app.component('pageSearch', pageSearch)
  app.component('pageDialog', pageDialog)
}
