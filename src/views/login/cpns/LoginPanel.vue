<template>
  <div>
    <h2 class="panel-title">后台管理系统</h2>
    <el-tabs type="border-card" class="tabs" stretch>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> 账号登录</span>
        </template>
        <login-account ref="accountRef" />
        <div class="panel-bottom">
          <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
          <el-link type="primary">找回密码</el-link>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <template #label>
          <span><i class="el-icon-date"></i> 手机登录</span>
        </template>
        <login-phone />
      </el-tab-pane>
    </el-tabs>
    <el-button class="btn-login" type="primary" @click="loginClick"
      >登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './LoginAccount.vue'
import LoginPhone from './LoginPhone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref<boolean>(true)
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const loginClick = () => {
      accountRef.value?.loginAction(isKeepPassword.value)
    }
    return { isKeepPassword, loginClick, accountRef }
  }
})
</script>

<style scoped lang="less">
.panel-title {
  text-align: center;
  margin-bottom: 10px;
}
.tabs {
  width: 320px;
  .panel-bottom {
    display: flex;
    justify-content: space-between;
  }
}
.btn-login {
  width: 100%;
  margin-top: 10px;
}
</style>
