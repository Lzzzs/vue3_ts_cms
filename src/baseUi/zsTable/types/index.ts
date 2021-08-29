export interface ITableProp {
  label: string
  prop: string
  width?: string
  slotName?: string
}

export interface ITable {
  pageName: string
  propConfig: ITableProp[]
  isShowFooter?: boolean
  childrenProp?: object // 表格树状结构
}

export interface IPopconfirm {
  confirmButtonText?: string
  cancelButtonText?: string
  icon?: string
  iconColor?: string
  title?: string
}
