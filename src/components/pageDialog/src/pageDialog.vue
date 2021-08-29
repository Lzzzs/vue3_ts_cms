<template>
  <div class="page-dialog">
    <el-dialog
      v-model="dialogVisible"
      width="30%"
      destroy-on-close
      top="10vh"
      @open="handleOpen"
    >
      <template #title>
        <slot name="createName" v-if="isCreate">创建</slot>
        <slot name="updateName" v-else>修改</slot>
      </template>
      <zs-form v-bind="dialogConfig" v-model="formData"></zs-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import { useStore } from '@/store'

import zsForm from '@/baseUi/zsForm/src/zsForm.vue'

import type { IZsForm } from '@/baseUi/zsForm/types'

export default defineComponent({
  components: { zsForm },
  props: {
    dialogConfig: {
      type: Object as PropType<IZsForm>,
      required: true
    },
    pageName: {
      type: String,
      required: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    // data
    const dialogVisible = ref(false)
    const store = useStore()
    const formData = ref<any>({})
    const isCreate = ref(true)

    // methods
    // 在对话框打开前 对formData做判断 如果为空对象{} 就是添加操作 否则就是删除操作
    const handleOpen = () => {
      Object.keys(formData.value).length > 0
        ? (isCreate.value = false)
        : (isCreate.value = true)
    }

    const handleConfirmClick = () => {
      // 如果formData为空对象则是添加操作
      if (isCreate.value) {
        store.dispatch('system/createData', {
          pageName: props.pageName,
          data: { ...formData.value, ...props.otherInfo }
        })
      } else {
        store.dispatch('system/editData', {
          pageName: props.pageName,
          id: formData.value.id,
          data: { ...formData.value, ...props.otherInfo }
        })
      }
      dialogVisible.value = false
    }

    return { dialogVisible, formData, handleConfirmClick, handleOpen, isCreate }
  }
})
</script>

<style scoped></style>
