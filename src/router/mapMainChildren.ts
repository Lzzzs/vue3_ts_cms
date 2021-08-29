/**
 * main组件中所有子组件的映射
 */
import type { RouteRecordRaw } from 'vue-router'

const dashboard = () => import('@/views/main/analysis/dashboard/DashBoard.vue')
const overview = () => import('@/views/main/analysis/overview/Overview.vue')

const category = () => import('@/views/main/product/category/Category.vue')
const goods = () => import('@/views/main/product/goods/Goods.vue')

const chat = () => import('@/views/main/story/chat/Chat.vue')
const list = () => import('@/views/main/story/list/List.vue')

const department = () => import('@/views/main/system/department/Department.vue')
const menu = () => import('@/views/main/system/menu/Menu.vue')
const role = () => import('@/views/main/system/role/Role.vue')
const user = () => import('@/views/main/system/user/User.vue')

export const allMainChildren: RouteRecordRaw[] = [
  {
    path: '/main/analysis/dashboard',
    component: dashboard
  },
  {
    path: '/main/analysis/overview',
    component: overview
  },
  {
    path: '/main/product/category',
    component: category
  },
  {
    path: '/main/product/goods',
    component: goods
  },
  {
    path: '/main/story/chat',
    component: chat
  },
  {
    path: '/main/story/list',
    component: list
  },
  {
    path: '/main/system/department',
    component: department
  },
  {
    path: '/main/system/menu',
    component: menu
  },
  {
    path: '/main/system/role',
    component: role
  },
  {
    path: '/main/system/user',
    component: user
  }
]
