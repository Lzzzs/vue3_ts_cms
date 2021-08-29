import { ITableProp, ITable } from '@/baseUi/zsTable/types'

const propConfig: ITableProp[] = [
  { prop: 'name', label: '部门名称' },
  { prop: 'leader', label: '领导名称' },
  { prop: 'createAt', label: '创建时间', width: '300', slotName: 'createAt' },
  { prop: 'updateAt', label: '修改时间', width: '300', slotName: 'updateAt' }
]

const pageName = 'department'

const isShowFooter = false

export const contentConfig: ITable = {
  propConfig,
  pageName,
  isShowFooter
}
