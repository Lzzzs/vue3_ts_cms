import { ITableProp, ITable } from '@/baseUi/zsTable/types'

const propConfig: ITableProp[] = [
  { prop: 'name', label: '用户名' },
  { prop: 'realname', label: '真实姓名' },
  { prop: 'cellphone', label: '电话号码', width: '150' },
  { prop: 'enable', label: '状态', slotName: 'enable' },
  { prop: 'createAt', label: '创建时间', width: '300', slotName: 'createAt' },
  { prop: 'updateAt', label: '修改时间', width: '300', slotName: 'updateAt' },
  { prop: '操作', label: '操作', width: '120', slotName: 'handler' }
]

const pageName = 'users'

export const contentConfig: ITable = {
  propConfig,
  pageName
}
