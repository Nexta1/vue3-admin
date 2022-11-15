<template>
  <div>
    <!-- component -->
    <div class="min-h-screen bg-purple-400 flex justify-center items-center">
      <div
        class="absolute w-60 h-60 rounded-xl bg-purple-300 -top-5 -left-16 z-0 transform rotate-45 hidden md:block"
      ></div>
      <div
        class="absolute w-48 h-48 rounded-xl bg-purple-300 -bottom-6 -right-10 transform rotate-12 hidden md:block"
      ></div>
      <div class="py-12 px-12 bg-white rounded-2xl shadow-xl z-20">
        <div>
          <h1 class="text-3xl font-bold text-center mb-4 cursor-pointer">
            Create An Account
          </h1>
          <p
            class="w-80 text-center text-sm mb-8 font-semibold text-gray-700 tracking-wide cursor-pointer"
          >
            Create an account to enjoy all the services without any ads for
            free!
          </p>
        </div>
        <div class="space-y-4">
          <el-form
            ref="registerFormRef"
            :model="registerForm"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-registerForm"
          >
            <el-form-item label="username" prop="username">
              <el-input v-model="registerForm.username" />
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="registerForm.password"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
            <el-form-item label="Confirm" prop="checkPass">
              <el-input
                v-model="registerForm.checkPass"
                type="password"
                autocomplete="off"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="text-center mt-6">
          <button
            class="py-3 w-64 text-xl text-white bg-purple-400 rounded-2xl"
            @click="submitForm(registerFormRef)"
          >
            Create Account
          </button>
          <p class="mt-4 text-sm">
            Already Have An Account?
            <span
              class="underline cursor-pointer"
              @click="$router.push({ name: 'login' })"
            >
              Sign In</span
            >
          </p>
        </div>
      </div>
      <div
        class="w-40 h-40 absolute bg-purple-300 rounded-full top-0 right-12 hidden md:block"
      ></div>
      <div
        class="w-20 h-40 absolute bg-purple-300 rounded-full bottom-20 left-10 transform rotate-45 hidden md:block"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { register } from '@/api/user'
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import router from '@/router'
const registerFormRef = ref<FormInstance>()

const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('请输入用户名'))
  }
  callback()
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else {
    if (registerForm.checkPass !== '') {
      if (!registerFormRef.value) return
      registerFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次确认您的密码'))
  } else if (value !== registerForm.password) {
    callback(new Error('两次密码不匹配!'))
  } else {
    callback()
  }
}

const registerForm = reactive({
  password: '',
  checkPass: '',
  username: ''
})

const rules = reactive({
  password: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  username: [
    { validator: checkUsername, trigger: 'blur' },
    {
      type: 'string',
      min: 3,
      message: '请输入三位以上用户名',
      trigger: 'blur'
    }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      const { checkPass, ...registerData } = registerForm
      const res = await register(registerData)
      if (res.data.code === 200) {
        ElMessage({
          message: '注册成功',
          type: 'success'
        })
        router.push({ name: 'login' })
      }
    } else {
      console.log('error submit!')
      return false
    }
  })
}
</script>

<style scoped></style>
