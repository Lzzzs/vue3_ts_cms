<template>
  <el-container class="main">
    <el-aside :width="isShow ? '64px' : '210px'" class="aside">
      <nav-menu :isShow="isShow" />
    </el-aside>
    <el-container>
      <el-header> <nav-header @foldClick="collapseClick" /></el-header>
      <el-main class="el-main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { NavHeader } from '@/components/nav-header'
import { NavMenu } from '@/components/nav-aside'

export default defineComponent({
  components: {
    NavHeader,
    NavMenu
  },
  setup() {
    let isShow = ref(false)

    const collapseClick = (isCollapse: boolean) => {
      isShow.value = isCollapse
    }

    return {
      isShow,
      collapseClick
    }
  }
})
</script>

<style scoped lang="less">
.main {
  width: 100%;
  height: 100%;

  .aside {
    transition: width 0.5s;
  }
  .el-main {
    background-color: #eef0f4;
  }
}
</style>
