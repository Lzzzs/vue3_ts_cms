import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store, { setupStore } from './store'

import 'normalize.css'
import './assets/css/index.less'

import { registerApp } from '@/global'
import { registerDirective } from '@/directive'

const app = createApp(App)

setupStore()
registerApp(app)
registerDirective(app)

app.use(store).use(router).mount('#app')
