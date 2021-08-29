/**
 * 生成特定身份对应的routes
 */
import type { RouteRecordRaw } from 'vue-router'
import { allMainChildren } from '@/router/mapMainChildren'

/**
 *
 * 返回的用户菜单格式
  * userMenus:Array[4]
  *  0:Object
        children:Array[2]
        icon:"el-icon-monitor"
        id:38
        name:"系统总览"
        sort:1
        type:1
        url:"/main/analysis"
    1:Object
    2:Object
    3:Object

    type为1表示有Children 2为子菜单无Children
 */

let firstMenu: any = null // 保存第一个菜单

export default function (userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 递归查询函数
  const recursionSelect: (userMenus: any[]) => void = (userMenus: any[]) => {
    userMenus.forEach((item) => {
      if (item.type === 1) {
        // 如果type为1说明还有子菜单 则把子菜单传入函数进行递归查找
        recursionSelect(item.children)
      } else if (item.type === 2) {
        // 查找
        const route = allMainChildren.find((route) => route.path === item.url)
        if (!firstMenu) {
          firstMenu = route
        }
        // route必须有值才会执行push操作
        route && routes.push(route!)
      }
    })
  }

  // 调用函数
  recursionSelect(userMenus)

  return routes
}

export { firstMenu }
