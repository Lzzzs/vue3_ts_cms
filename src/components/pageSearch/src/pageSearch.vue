<template>
  <div class="page-search">
    <zs-form v-bind="searchConfig" v-model="formData">
      <template #footer>
        <el-button icon="el-icon-refresh" @click="refreshClick">
          重置
        </el-button>
        <el-button icon="el-icon-search" type="primary" @click="selectClick">
          搜索
        </el-button>
      </template>
    </zs-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'

import { zsForm } from '@/baseUi/zsForm'

import type { IZsForm, IZsFormItem } from '@/baseUi/zsForm/types'

export default defineComponent({
  components: { zsForm },
  props: {
    searchConfig: {
      type: Object as PropType<IZsForm>,
      required: true
    }
  },
  emits: ['resetClick', 'selectClick'],
  setup(props, { emit }) {
    const data: any = {}

    // 通过field动态生成formData
    props.searchConfig.formItems.forEach((item: IZsFormItem) => {
      data[item.field] = ''
    })

    const formData = ref(data)

    const refreshClick = () => {
      for (const key in data) {
        formData.value[key] = ''
      }
      emit('resetClick')
    }

    const selectClick = () => {
      emit('selectClick', formData.value)
    }

    return { formData, refreshClick, selectClick }
  }
})
</script>

<style scoped>
.page-search {
  padding-top: 22px;
}
</style>
