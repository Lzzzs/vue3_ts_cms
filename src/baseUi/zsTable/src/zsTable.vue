<template>
  <div class="header">
    <div class="header-title">
      <slot name="header-title"> 列表</slot>
      <slot name="create-btn"></slot>
    </div>
  </div>
  <div class="zs-table">
    <el-table :data="listData" border v-bind="childrenProp">
      <template v-for="item in propConfig" :key="item.prop">
        <el-table-column
          align="center"
          :prop="item.prop"
          :label="item.label"
          :min-width="item.width ?? '100'"
          show-overflow-tooltip
        >
          <!-- 作用域插槽 解构赋值取出row -->
          <template #default="{ row }">
            <slot :name="item.slotName" :row="row">
              <!-- 如果不使用插槽 则使用此值(默认值) -->
              {{ row[item.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
  <div class="footer" v-show="isShowFooter">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import type { ITableProp } from '../types'

export default defineComponent({
  props: {
    pageName: {
      type: String,
      default: ''
    },
    propConfig: {
      type: Array as PropType<ITableProp[]>,
      required: true
    },
    listData: {
      type: Array,
      required: true
    },
    totalCount: {
      type: Number,
      default: 0
    },
    isShowFooter: {
      type: Boolean,
      default: true
    },
    childrenProp: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['sizeChange', 'pageChange'],
  setup(props, { emit }) {
    const pageSize = ref(10)
    const currentPage = ref(0)
    const handleSizeChange = (size: number) => {
      emit('sizeChange', size)
    }
    const handleCurrentChange = (page: number) => {
      emit('pageChange', page)
    }

    return { pageSize, currentPage, handleSizeChange, handleCurrentChange }
  }
})
</script>

<style scoped>
.header-title {
  display: flex;
  justify-content: space-between;
  font-size: 20px;
  color: #000;
  font-weight: bold;
  padding-bottom: 15px;
}
.footer {
  text-align: right;
  padding-top: 15px;
}
</style>
