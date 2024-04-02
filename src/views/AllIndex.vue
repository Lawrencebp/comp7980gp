<script setup>
import {Search, ArrowDown} from '@element-plus/icons-vue'
import {useToggle} from '@vueuse/shared'
import {isDark} from "@/util/darkmode.js";
import {ref} from "vue";
import router from "@/router/index.js";



const toBooking = () => router.push('/index')
const isVisible = ref(false)
const isLogin = ref(true)
const toRegister = () => {
  isLogin.value = false
}
const toLogin = () => {
  isLogin.value = true
}

const toggleDark = useToggle(isDark)
const showLogin = () => {
  if(localStorage.getItem('vitepress-theme-appearance') === 'dark'){
    toggleDark()
  }
  isVisible.value = true
}
const cancel = () => {
  isVisible.value = false
  toggleDark()
}
const login = () => {
  isVisible.value = false
  toggleDark()
}
</script>

<template>
  <div class="container" style="margin: 0 auto">
    <el-container>
      <el-header class="head">
        <el-row justify="space-between" align="middle">
          <el-col v-if="$route.path === '/index'" :span="7">
            <el-input
                class="search"
                size="large"
                style="--el-input-bg-color: rgb(20,23,37);"
                placeholder="Search"
                :prefix-icon="Search"
            />
          </el-col>
          <el-col :span="2" :offset="1" style="height: 50px" @click="toBooking">
            <img src="@/assets/logo.png" alt="..."/>
          </el-col>
          <el-col :span="1" :offset="7">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar @click="showLogin" :size="30"
                           src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"/>
                <el-icon class="el-icon--right">
                  <arrow-down/>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Order</el-dropdown-item>
                  <el-dropdown-item>Reset password</el-dropdown-item>
                  <el-dropdown-item>Exit Login</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
    <el-dialog v-model="isVisible" title="Login" width="500" :close-on-click-modal="false"
               :show-close="false"
    >
      <el-form v-if="isLogin">
        <el-form-item label="username">
          <el-input placeholder="Please type your username"/>
        </el-form-item>
        <el-form-item label="password">
          <el-input placeholder="Please type your password"/>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="toRegister">
            Register →
          </el-link>
        </el-form-item>
      </el-form>
      <el-form v-else>
        <el-form-item label="username">
          <el-input placeholder="Please type your username"/>
        </el-form-item>
        <el-form-item label="password">
          <el-input placeholder="Please type your password"/>
        </el-form-item>
        <el-form-item label="Check password">
          <el-input placeholder="Please type your password again"/>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="toLogin">
            ← Login
          </el-link>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button v-if="isLogin" type="primary" @click="login">
            Login
          </el-button>
          <el-button v-else type="primary" @click="login">
            Login
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.head {
  padding: 20px;
  margin-bottom: 10px
}

img {
  height: 100%;
  width: 100%;
}

.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.el-dropdown-link:active,
.el-dropdown-link:focus {
  outline: none;
}
</style>
