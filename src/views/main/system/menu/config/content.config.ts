import { ITableProp, ITable } from '@/baseUi/zsTable/types'

const propConfig: ITableProp[] = [
  { prop: 'name', label: '菜单名称', width: '100' },
  { prop: 'type', label: '类型', width: '60' },
  { prop: 'url', label: '菜单url', width: '100' },
  { prop: 'icon', label: '菜单icon', width: '100' },
  { prop: 'permission', label: '按钮权限', width: '100' },
  {
    prop: 'createAt',
    label: '创建时间',
    width: '220',
    slotName: 'createAt'
  },
  {
    prop: 'updateAt',
    label: '更新时间',
    width: '220',
    slotName: 'updateAt'
  }
]

const pageName = 'menu'

const isShowFooter = false

const childrenProp = {
  rowKey: 'id',
  treeProps: {
    children: 'children'
  }
}

export const contentConfig: ITable = {
  propConfig,
  pageName,
  isShowFooter,
  childrenProp
}
