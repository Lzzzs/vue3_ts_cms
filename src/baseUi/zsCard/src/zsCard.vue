<template>
  <div class="zs-card">
    <el-card class="box-card">
      <template #header>
        <div class="card-header-title">{{ title }}</div>
      </template>
      <slot></slot>
    </el-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '卡片'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped>
.card-header-title {
  font-size: 20px;
}
</style>
