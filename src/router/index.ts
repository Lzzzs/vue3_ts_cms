import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/localCache'
import { ElMessage } from 'element-plus'
import { firstMenu } from '@/utils/mapToRoutes'

const login = () => import('@/views/login/Login.vue')
const main = () => import('@/views/main/Main.vue')
const notfound = () => import('@/views/notfound/NotFound.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    name: 'login',
    path: '/login',
    component: login
  },
  {
    name: 'main',
    path: '/main',
    component: main
    // children: []   需要动态添加该children
  },
  {
    name: 'notfound',
    path: '/:pathMatch(.*)*',
    component: notfound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 如果用户要去除了登录页面的其他页面则判断是否有token 没token就跳转登录页面进行登录
router.beforeEach((to) => {
  if (to.path !== '/login') {
    if (!localCache.getCache('token')) {
      // 没有token
      ElMessage.warning('请先登录!')
      router.push('/login')
    }
  }

  if (to.path === '/main' || to.path === '/main/') {
    return firstMenu.path
  }
})

export default router
