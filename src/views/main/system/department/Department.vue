<template>
  <div class="department">
    <page-content :contentConfig="contentConfig">
      <template #header-title> 部门列表 </template>
    </page-content>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// config
import { contentConfig } from './config/content.config'

export default defineComponent({
  setup() {
    return {
      contentConfig
    }
  }
})
</script>

<style scoped lang="less">
.department {
  background-color: #fff;
}
</style>
