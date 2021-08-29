<template>
  <h1 class="notfound">not found</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.notfound {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
}
</style>
