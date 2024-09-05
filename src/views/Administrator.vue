<script setup>
import {onUnmounted,ref} from "vue";
import {useToggle} from '@vueuse/core'
import {isDark} from "@/util/darkmode.js";
import router from "@/router/index.js";
import {adminLogin} from "@/api/admin/index.js";
import {ElMessage} from "element-plus";

const toggleDark = useToggle(isDark)
toggleDark()

const loginForm = ref(null)
const loginModel = ref({
  adminNumber:'',
  adminPassword:''
})

const toAdmin = async () => {
  try {
    const res = await adminLogin(loginModel.value)
    sessionStorage.setItem('token',JSON.stringify(res.token))
    await router.push('layout')
  } catch (e) {
    ElMessage({
      type:"error",
      duration:2000,
      message:e.message
    })
  }


  await router.push('layout')
}

onUnmounted(() => {
  toggleDark()
})

</script>

<template>
  <div class="container boner">
    <div class="title">
      WELCOME BACK
    </div>
    <div class="form">
      <el-form ref="loginForm" :model="loginModel" size="large" label-width="auto" :label-position="'top'">
        <el-form-item>
          <el-input v-model="loginModel.adminNumber" placeholder="Your administrator ID" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginModel.adminPassword" placeholder="Your Password"/>
        </el-form-item>
        <el-form-item>
          <el-button @click="toAdmin">Login</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped>
* {
  color:rgb(79,81,86);
  padding:0;
}
.boner{
  width:70%;
  height:800px;
  margin: 100px  auto;
  padding-top: 50px;
  background: rgb(104,103,121,0.8);
  border-radius: 100px;
}
.title {
  margin: 20px auto;
  font-weight: 900;
  font-size: 50px;
  text-align: center;
  color: rgb(1,0,25);
}
.form{
  width: 80%;
  margin: 20px auto 0;
}
:deep(.el-form-item__content){
  margin: 50px 0;
}
:deep(.el-input){
  --el-input-bg-color: rgb(206, 206, 212);
  --el-input-border-color: none;
  --el-input-border-radius: 100px;
  --el-input-width: 100%;
  --el-input-height: 108px;
  font-size: 35px;
  --el-input-text-color: rgb(34,53,81);
}
:deep(.el-input__inner){
  padding-left: 100px;
}
:deep(.el-input__inner::placeholder){
  font-size: 35px;
  color: rgb(34,53,81);
  font-weight: 900;
}

:deep(.el-button){
  width: 500px;
  margin: 50px auto;
  height: 120px;
  border-radius: 100px;
  --el-button-hover-bg-color: rgb(100,156,82);
  --el-button-bg-color: rgb(36,56,82);
  --el-button-active-bg-color: rgb(36,56,82);
  font-size: 40px;
  color: rgb(252,252,252);
  border:none;
}
</style>
