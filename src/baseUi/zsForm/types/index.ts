type typeData = 'input' | 'password' | 'select' | 'datepicker'

interface IOptions {
  name: string
  value: string | number
}

interface IColLayout {
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
  span?: number
}

export interface IZsFormItem {
  field: string // 绑定的字段名
  label: string // 表单文字
  type: typeData // 表单类型
  placeholder?: string
  options?: IOptions[] // 针对于select的option
  rules?: any[] // 验证规则
  otherOptions?: {} // 可以传入一些其他的选项
  isHidden?: boolean
}

export interface IZsForm {
  formItems: IZsFormItem[]
  labelWidth?: string
  itemStyle?: {}
  colLayout?: IColLayout
}
