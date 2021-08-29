import type { App } from 'vue'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export default (app: App) => {
  app.directive('format', (el) => {
    const value = el.textContent
    el.innerHTML = dayjs.utc(value).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
  })
}
