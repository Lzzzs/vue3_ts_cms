<template>
  <div class="user">
    <page-search
      :searchConfig="searchConfig"
      @resetClick="resetClick"
      @selectClick="selectClick"
    />
    <page-content
      :contentConfig="contentConfig"
      ref="pageContentRef"
      @updateClick="handleUpdateClick"
      @createClick="handleCreateClick"
      createBtnName="创建用户"
    >
      <template #header-title> 用户列表 </template>
    </page-content>
    <page-dialog
      :dialogConfig="dialogConfigPlus"
      pageName="users"
      ref="pageDialogRef"
    >
      <template #createName> 创建用户</template>
      <template #updateName> 修改用户</template>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'

// config
import { searchConfig } from './config/search.config'
import { contentConfig } from './config/content.config'
import { dialogConfig } from './config/dialog.config'
// hooks
import { usePageSelect } from '@/hooks/usePageSelect'
import { usePageDialog } from '@/hooks/usePageDialog'

export default defineComponent({
  setup() {
    // 获取store
    const store = useStore()

    // 使用hooks 数组解构
    const [pageContentRef, resetClick, selectClick] = usePageSelect()

    // 定义回调函数
    const editCallback = () => {
      const findItem = dialogConfig.formItems.find(
        (item: any) => item.field === 'password'
      )
      findItem && (findItem.isHidden = true)
    }
    const createCallback = () => {
      const findItem = dialogConfig.formItems.find(
        (item: any) => item.field === 'password'
      )
      findItem && (findItem.isHidden = false)
    }

    // 动态添加部门和角色 这里用到了computed是因为store里面的部门和角色数据是异步获取的 所以放到计算属性里面可以收集依赖 及时更新数据
    const dialogConfigPlus = computed(() => {
      const departmentItem = dialogConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = dialogConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      if (departmentItem?.options) {
        departmentItem.options = store.state.entireDepartment.map((item) => ({
          name: item.name,
          value: item.id
        }))
      }
      if (roleItem?.options) {
        roleItem.options = store.state.entireRole.map((item) => ({
          name: item.name,
          value: item.id
        }))
      }
      return dialogConfig
    })

    // 调用hook获取与dialog有关的变量和函数
    const [pageDialogRef, handleUpdateClick, handleCreateClick] = usePageDialog(
      dialogConfigPlus.value,
      editCallback,
      createCallback
    )

    return {
      searchConfig,
      contentConfig,
      dialogConfigPlus,
      pageContentRef,
      resetClick,
      selectClick,
      pageDialogRef,
      handleUpdateClick,
      handleCreateClick
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background-color: #fff;
}
</style>
