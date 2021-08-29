<template>
  <div class="page-content">
    <zs-table
      v-bind="contentConfig"
      :listData="listData"
      :totalCount="totalCount"
      @sizeChange="handleSizeChange"
      @pageChange="handlePageChange"
    >
      <template #header-title>
        <slot name="header-title" />
      </template>
      <template #create-btn>
        <el-button
          v-show="isCreate && !!createBtnName"
          type="primary"
          size="medium"
          @click="createClick"
          >{{ createBtnName }}</el-button
        >
      </template>

      <!-- 固定列插槽 -->
      <template #enable="{ row }">
        <el-button size="mini" :type="row.enable ? 'success' : 'danger'" plain>
          {{ row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
      <template #createAt="{ row }">
        <span v-format>{{ row.createAt }}</span>
      </template>
      <template #updateAt="{ row }">
        <span v-format>{{ row.updateAt }}</span>
      </template>
      <template #handler="{ row }">
        <div class="handler">
          <el-button
            icon="el-icon-edit"
            size="mini"
            type="text"
            v-show="isUpdate"
            @click="updateClick(row)"
            >编辑</el-button
          >
          <el-popconfirm
            v-bind="deletePopconfirm"
            @confirm="confirmDelete(row)"
          >
            <template #reference>
              <el-button
                icon="el-icon-delete"
                size="mini"
                type="text"
                v-show="isDelete"
                >删除</el-button
              >
            </template>
          </el-popconfirm>
        </div>
      </template>

      <!-- 动态插槽循环遍历生成 -->
      <template
        v-for="item in dynamicSlotNameArr"
        #[item.slotName]="{ row }"
        :key="item.slotName"
      >
        <!-- v-slot[]动态使用插槽 -->
        <slot :name="item.slotName" :row="row"></slot>
      </template>
    </zs-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from 'vue'
import { useStore } from '@/store'

import { useJurisdiction } from '@/hooks/useJurisdiction '

import zsTable from '@/baseUi/zsTable/src/zsTable.vue'

import type { ITable, ITableProp, IPopconfirm } from '@/baseUi/zsTable/types'

export default defineComponent({
  props: {
    contentConfig: {
      type: Object as PropType<ITable>,
      required: true
    },
    deletePopconfirm: {
      type: Object as PropType<IPopconfirm>,
      default: () => ({
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        icon: 'el-icon-info',
        iconColor: 'red',
        title: '这条数据确定删除吗?'
      })
    },
    createBtnName: {
      type: String
    }
  },
  emits: ['updateClick', 'createClick'],
  components: {
    zsTable
  },
  setup(props, { emit }) {
    // data
    const store = useStore()

    const currentSize = ref(10)
    const currentPage = ref(1)

    // isQuery isCreate isDelete isUpdate
    const permissionObj = useJurisdiction(props.contentConfig.pageName)
    console.log(permissionObj)

    const fixSlotName: string[] = ['createAt', 'updateAt', 'enable', 'handler'] // 固定的插槽
    let dynamicSlotNameArr: ITableProp[] = [] //动态生成的插槽数组

    // 动态获取listData和totalCount
    const listData = computed(() => {
      return (store.state.system as any)[
        `${props.contentConfig.pageName}ListData`
      ]
    })
    const totalCount = computed(() => {
      return (store.state.system as any)[`${props.contentConfig.pageName}Count`]
    })

    // 获取页面数处理
    const getPageData = (pageInfo: any = {}) => {
      if (!permissionObj.isQuery) return //isQuery为false 则不获取数据
      store.dispatch('system/getListData', {
        pageName: props.contentConfig.pageName,
        data: {
          offset: (currentPage.value - 1) * currentSize.value,
          size: currentSize.value,
          ...pageInfo
        }
      })
    }
    getPageData()

    // 分页处理
    const handleSizeChange = (size: number) => {
      currentSize.value = size
      getPageData()
    }
    const handlePageChange = (page: number) => {
      currentPage.value = page
      getPageData()
    }

    // 动态获取插槽名称
    dynamicSlotNameArr = props.contentConfig.propConfig.filter((item) => {
      if (item.slotName) {
        return !fixSlotName.some((name) => item.slotName === name)
      }
    })

    // 编辑/删除/添加操作
    const updateClick = (row: any) => {
      emit('updateClick', row)
    }
    const createClick = () => {
      emit('createClick')
    }
    const confirmDelete = (row: any) => {
      store.dispatch('system/deleteListData', {
        pageName: props.contentConfig.pageName,
        id: row.id
      })
    }

    return {
      currentSize,
      listData,
      totalCount,
      dynamicSlotNameArr,
      ...permissionObj,
      getPageData,
      handleSizeChange,
      handlePageChange,
      updateClick,
      createClick,
      confirmDelete
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  border-top: 20px solid #eef0f4;
  padding: 20px;
}
.handler {
  display: flex;
  justify-content: center;
}
</style>
