<template>
  <el-breadcrumb>
    <el-breadcrumb-item v-for="item in breadCrumbs" :key="item.name">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { createBreadCrumbArr } from '@/utils/breadCrumb'

import type { IStoreType } from '@/store/types'

export default defineComponent({
  setup() {
    const store = useStore<IStoreType>()
    const route = useRoute()

    const breadCrumbs = computed(() => {
      // 因为更换菜单数据 或者路径 需要重新执行方法 所以都放到计算属性里面
      const userMenus = store.state.login.userMenus
      const currentPath = route.path
      return createBreadCrumbArr(userMenus, currentPath)
    })

    return { breadCrumbs }
  }
})
</script>

<style scoped></style>
