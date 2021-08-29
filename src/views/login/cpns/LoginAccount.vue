<template>
  <el-form :model="accountForm" :rules="rules" ref="formRef">
    <el-form-item label="账号" prop="name">
      <el-input v-model="accountForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="accountForm.password"
        show-password
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

import localCache from '@/utils/localCache'
import { ElForm } from 'element-plus'
import { rules } from '../config/login-account'

export default defineComponent({
  setup() {
    const store = useStore()

    const accountForm = reactive({
      // 如果取不到值 则默认赋值''
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = (isKeepPassword: boolean) => {
      formRef.value?.validate((vaild) => {
        if (vaild) {
          // 将账号和密码保存到本地
          if (isKeepPassword) {
            localCache.setCache('name', accountForm.name)
            localCache.setCache('password', accountForm.password)
          } else {
            localCache.deleteCache()
          }

          // 登录
          store.dispatch('login/acountLoginAction', { ...accountForm })
        }
      })
    }

    return {
      accountForm,
      rules,
      formRef,
      loginAction
    }
  }
})
</script>

<style scoped></style>
