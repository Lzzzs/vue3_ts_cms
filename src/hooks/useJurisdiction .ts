/**
 * 判断是否有某种权限
 * 1. pageName: 页面名称(user, role...)
 * 2. permission: 允许的功能(create, update, delete, query)
 */

import { ref } from 'vue'
import { useStore } from '@/store'

type permissionType = 'create' | 'update' | 'delete' | 'query'

export const useJurisdiction = (pageName: string) => {
  const store = useStore()

  const closure = (pageName: string, permission: permissionType) => {
    // 获取登录用户的权限数组(system:pageName:permission)
    const permissionArr: string[] = store.state.login.permissionArr
    // 判断是否有权限
    return permissionArr.some(
      (item) => item === `system:${pageName}:${permission}`
    )
  }

  const isQuery = ref(closure(pageName, 'query'))
  const isCreate = ref(closure(pageName, 'create'))
  const isUpdate = ref(closure(pageName, 'update'))
  const isDelete = ref(closure(pageName, 'delete'))

  return {
    isQuery,
    isCreate,
    isUpdate,
    isDelete
  }
}
