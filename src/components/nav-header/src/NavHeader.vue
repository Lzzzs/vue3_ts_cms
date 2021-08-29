<template>
  <div class="nav-header">
    <div class="nav-header-left">
      <i
        ref="iRef"
        :class="isFold ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
        @click="foldClick"
      ></i>

      <NavBreadCrumb />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import NavBreadCrumb from './NavBreadCrumb.vue'

// import { useEcharts } from '@/hooks/useEcharts'

export default defineComponent({
  emits: ['foldClick'],
  components: {
    NavBreadCrumb
  },
  setup(props, { emit }) {
    let isFold = ref(false)
    const iRef = ref<HTMLElement>()

    const foldClick = () => {
      isFold.value = !isFold.value
      // 通知父组件
      emit('foldClick', isFold.value)
    }

    return {
      isFold,
      iRef,
      foldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  .nav-header-left {
    display: flex;
    align-items: center;

    i {
      font-size: 25px;
      margin-right: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
