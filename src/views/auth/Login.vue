<template>
  <div class="login-container">
    <el-card class="login-card">
      <h2 class="title">数学课程管理系统</h2>
      <el-form :model="form" @submit.prevent="onLogin">
        <el-form-item>
          <el-input v-model="form.username" placeholder="用户名" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" type="password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin" style="width:100%">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()
const form = reactive({
  username: '',
  password: ''
})

function onLogin() {
  if (form.username && form.password) {
    router.push('/')
  } else {
    ElMessage.error('请输入用户名和密码')
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #81ecec 0%, #74b9ff 100%);
}
.login-card {
  width: 350px;
  padding: 30px 20px;
  border-radius: 12px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}
.title {
  text-align: center;
  margin-bottom: 24px;
  color: #0984e3;
}
</style> 