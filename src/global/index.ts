import { App } from '@vue/runtime-core'

import { registerElement } from './registerElement'
import { registerPageCpns } from './registerPageCpns'

export function registerApp(app: App): void {
  registerElement(app)
  registerPageCpns(app)
}
