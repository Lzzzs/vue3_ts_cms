<template>
  <div class="user">
    <page-content
      :contentConfig="contentConfig"
      @updateClick="handleUpdateClick"
      @createClick="handleCreateClick"
      createBtnName="创建用户"
    >
      <template #header-title> 角色列表 </template>
    </page-content>
    <page-dialog
      :dialogConfig="dialogConfig"
      pageName="role"
      ref="pageDialogRef"
      :otherInfo="otherInfo"
    >
      <template #createName> 创建角色</template>
      <template #updateName> 修改角色</template>
      <el-tree
        ref="treeRef"
        :data="treeData"
        :props="{ children: 'children', label: 'name' }"
        show-checkbox
        node-key="id"
        @check="handleCheckChange"
      ></el-tree>
    </page-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import { ElTree } from 'element-plus'

// config
import { contentConfig } from './config/content.config'
import { dialogConfig } from './config/dialog.config'
// utils
import { mapLeafChildren } from '@/utils/mapLeafChildren'

// hooks
import { usePageDialog } from '@/hooks/usePageDialog'

export default defineComponent({
  setup() {
    const store = useStore()

    const otherInfo = ref<{ menuList: any[] }>({
      menuList: []
    })

    const treeRef = ref<InstanceType<typeof ElTree>>()

    const treeData = computed(() => store.state.entireMenu)

    const editCallback = (item: any) => {
      const checkKeys = mapLeafChildren(item.menuList)
      // 使用nextTick是因为 treeRef在editCallback执行的时候没有去获得值
      nextTick(() => {
        treeRef.value?.setCheckedKeys(checkKeys, false)
      })
    }

    const handleCheckChange = (data1: any, data2: any) => {
      const { checkedKeys, halfCheckedKeys } = data2
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value.menuList = menuList
    }
    // 调用hook获取与dialog有关的变量和函数
    const [pageDialogRef, handleUpdateClick, handleCreateClick] = usePageDialog(
      dialogConfig,
      editCallback
    )

    return {
      treeData,
      contentConfig,
      dialogConfig,
      pageDialogRef,
      handleUpdateClick,
      handleCreateClick,
      otherInfo,
      handleCheckChange,
      treeRef
    }
  }
})
</script>

<style scoped lang="less">
.user {
  background-color: #fff;
}
</style>
