<template>
  <div class="user">
    <page-content :contentConfig="contentConfig">
      <template #header-title> 菜单列表 </template>
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
.user {
  background-color: #fff;
}
</style>
