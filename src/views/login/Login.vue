<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'

const ruleFormRef = ref<FormInstance>()
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: 'blur' },
  { required: true, message: '非空', trigger: 'blur' }],
  userName: [{ required: true, message: '非空', trigger: 'blur' }],
})

const ruleForm = reactive({
  pass: '',
  userName: '',
})
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log(ruleForm);
    } else {
      console.log('error submit!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>

  <div class="w-full h-[100vh] flex justify-center items-center">

    <el-card class="w-[500px]">
      <template #header>
        <div class="card-header">
          <span>LOGIN</span>
        </div>
      </template>

      <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="auto">

        <el-form-item label="账号" prop="userName">
          <el-input v-model="ruleForm.userName" autocomplete="off" />
        </el-form-item>

        <el-form-item label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
        </el-form-item>

      </el-form>
      <template #footer>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          登录
        </el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </template>
    </el-card>
  </div>
</template>


