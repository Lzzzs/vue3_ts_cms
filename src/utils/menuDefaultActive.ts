/**
 * 生成菜单对应的default-active
 */
export function menuDefaultActive(userMenus: any[], currentPath: string): any {
  for (const menu of userMenus) {
    if (menu.type === 1) {
      const menuId = menuDefaultActive(menu.children, currentPath)
      if (menuId) {
        return menuId
      }
    } else if (menu.type === 2 && menu.url === currentPath) {
      return menu.id
    }
  }
}
