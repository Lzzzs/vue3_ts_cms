import { IZsForm } from '@/baseUi/zsForm/types'

export const dialogConfig: IZsForm = {
  formItems: [
    {
      field: 'name',
      label: '用户名',
      type: 'input',
      placeholder: '请输入用户名'
    },
    {
      field: 'intro',
      label: '权限分布',
      type: 'input',
      placeholder: '请输入权限分布'
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}
