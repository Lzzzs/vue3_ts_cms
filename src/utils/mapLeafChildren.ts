/**
 * 映射树结构最后一层的数据 生成最后一层的id数组
 */

export const mapLeafChildren = (userMenus: any[]) => {
  const idArr: number[] = []

  const _recursion = (userMenus: any[]) => {
    for (const item of userMenus) {
      if (item.children) {
        _recursion(item.children)
      } else {
        idArr.push(item.id)
      }
    }
  }

  _recursion(userMenus)

  return idArr
}
