/**
 *  生成面包屑所需的数据
 */
import type { IBreadCrumb } from '@/components/nav-header/types'

export function createBreadCrumbArr(
  userMenus: any[],
  currentPath: string
): any {
  const breadCrumbArr: IBreadCrumb[] = []

  for (const menu of userMenus) {
    if (menu.type === 1) {
      const currentMenu = createBreadCrumbArr(menu.children, currentPath)

      if (currentMenu.name) {
        // 添加面包屑数据
        breadCrumbArr.push({ name: menu.name })
        breadCrumbArr.push({ name: currentMenu.name })
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }

  return breadCrumbArr
}
