/**
 * 映射用户权限数组
 */

// permission: 'system:${pageName}:${权限名}'
// 权限名: create, delete, update, query
export default function mapJurisdictionArr(userMenus: any[]): string[] {
  const permissionArr: string[] = []

  const recursionFunc = (userMenus: any[]) => {
    for (const item of userMenus) {
      if (item.type === 1 || item.type === 2) {
        if (item.children) {
          recursionFunc(item.children)
        }
      } else if (item.type === 3) {
        permissionArr.push(item.permission)
      }
    }
  }

  recursionFunc(userMenus)

  return permissionArr
}
