import { ITableProp, ITable } from '@/baseUi/zsTable/types'

const propConfig: ITableProp[] = [
  { prop: 'name', label: '名字' },
  { prop: 'address', label: '地址' },
  { prop: 'desc', label: '描述' },
  { prop: 'imgUrl', label: '图片', slotName: 'imgUrl' },
  { prop: 'newPrice', label: '新价格' },
  { prop: 'oldPrice', label: '旧价格' },
  { prop: 'status', label: '状态' },
  { prop: 'createAt', label: '创建时间', width: '260', slotName: 'createAt' },
  { prop: 'updateAt', label: '修改时间', width: '260', slotName: 'updateAt' }
]

const pageName = 'goods'

export const contentConfig: ITable = {
  propConfig,
  pageName
}
