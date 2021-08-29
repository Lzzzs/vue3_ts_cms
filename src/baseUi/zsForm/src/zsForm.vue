<template>
  <!-- 头部标题 -->
  <div class="header">
    <span class="header-title">
      <slot name="header-title"></slot>
    </span>
  </div>

  <!-- 表单 -->
  <el-form :label-width="labelWidth">
    <el-row>
      <template v-for="item in formItems" :key="item.label">
        <el-col v-bind="colLayout">
          <el-form-item
            :label="item.label"
            :rules="item.rules"
            :style="itemStyle"
            v-if="!item.isHidden"
          >
            <template v-if="item.type === 'input' || item.type === 'password'">
              <el-input
                :placeholder="item.placeholder"
                v-bind="item.otherOptions"
                :show-password="item.type === 'password'"
                v-model="formData[`${item.field}`]"
              >
                ></el-input
              >
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                :placeholder="item.placeholder"
                v-model="formData[`${item.field}`]"
                style="width: 100%"
              >
                <el-option
                  v-for="option in item.options"
                  :key="option.value"
                  :value="option.value"
                  :label="option.name"
                >
                </el-option>
              </el-select>
            </template>
            <template v-else-if="item.type === 'datepicker'">
              <el-date-picker
                v-bind="item.otherOptions"
                v-model="formData[`${item.field}`]"
              >
              </el-date-picker>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
  <div class="footer">
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'

import type { IZsFormItem } from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<IZsFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '5px 30px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xs: 24,
        sm: 24,
        md: 12,
        lg: 8,
        xl: 6
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // 复制一个新的form
    const formData = ref({ ...props.modelValue })

    // 监听这个form 如果有变化则emit
    watch(
      formData,
      (newValue) => {
        emit('update:modelValue', newValue)
      },
      { deep: true }
    )

    return { formData }
  }
})
</script>

<style scoped lang="less">
.header-title {
  display: flex;
  justify-content: center;
  font-size: 25px;
  color: #000;
  padding-bottom: 20px;
}
.footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px;
}
</style>
