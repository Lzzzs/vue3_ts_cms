<template>
  <div class="user">
    <page-content :contentConfig="contentConfig">
      <template #header-title> 商品列表 </template>
      <template #imgUrl="{ row }">
        <el-image
          style="width: 50px; height: 50px"
          :src="row.imgUrl"
          :preview-src-list="[row.imgUrl]"
        >
        </el-image>
      </template>
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
