/**
 * 1. dialogConfig 当前页面模态框的config
 * 2. editCallback 页面需要进行修改操作的回调函数
 * 3. createCallback 页面需要进行创建操作的回调函数
 */

import { ref } from 'vue'
import pageDialog from '@/components/pageDialog/src/pageDialog.vue'
import type { IZsForm } from '@/baseUi/zsForm/types'

type callback = (item?: any) => void

export const usePageDialog = (
  dialogConfig: IZsForm,
  editCallback?: callback,
  createCallback?: callback
) => {
  const pageDialogRef = ref<InstanceType<typeof pageDialog>>()

  const handleUpdateClick = (row: any) => {
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
      for (const key in row) {
        pageDialogRef.value.formData[key] = row[key]
      }
    }
    editCallback && editCallback(row)
  }

  const handleCreateClick = () => {
    if (pageDialogRef.value) {
      pageDialogRef.value.dialogVisible = true
      pageDialogRef.value.formData = {}
      // for (const item of dialogConfig.formItems) {
      //   pageDialogRef.value.formData[item.field] = ''
      // }
    }
    createCallback && createCallback()
  }

  return [pageDialogRef, handleUpdateClick, handleCreateClick]
}
