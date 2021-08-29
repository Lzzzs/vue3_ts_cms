import { ITableProp, ITable } from '@/baseUi/zsTable/types'

const propConfig: ITableProp[] = [
  { prop: 'intro', label: '权限分布' },
  { prop: 'name', label: '角色名' },
  { prop: 'createAt', label: '创建时间', width: '300', slotName: 'createAt' },
  { prop: 'updateAt', label: '修改时间', width: '300', slotName: 'updateAt' },
  { prop: '操作', label: '操作', width: '120', slotName: 'handler' }
]

const pageName = 'role'

const isShowFooter = false

export const contentConfig: ITable = {
  propConfig,
  pageName,
  isShowFooter
}
