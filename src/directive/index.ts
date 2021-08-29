import type { App } from 'vue'
import registerformatTimeDirective from './format-time'

// 注册所有的指令
export const registerDirective = (app: App) => {
  registerformatTimeDirective(app)
}
