<script setup>
import {ArrowDown, Iphone, Lock, User, Plus} from '@element-plus/icons-vue'
import {ref} from "vue";
import router from "@/router/index.js";
import {startLogin, updateInfo, insertOne} from "@/api/user/index.js";
import {ElMessage} from "element-plus";
import {useUserStore} from "@/stores/user.js";

//用户仓库，存储ID
const user = useUserStore()

//注册的用户上传图片时后端返回来的数据，需要在提交时上传给后端
const filename = ref('')
const extend = ref('')

const updateImg = ref(`http://localhost:3000/updateImg?${new Date().getTime()}`)
const registerImg = ref(`http://localhost:3000/key/updateImgNever?${new Date().getTime()}`)

//token
const token = ref({Authorization: localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token').replace(/"/g, '') : ''})
//头像地址
const avatarUrl = ref(user.userAvatar || 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')

//控制弹窗是否出现
const allVisible = ref({
  isVisible: false,
  isResetVisible: false
})

//控制弹窗是否为登陆或注册
const isLogin = ref(true)

//登陆表单
const loginForm = ref(null)

//注册表单
const registerForm = ref(null)

//更新表单
const updateForm = ref(null)

//收集登陆数据
const loginModel = ref({
  username: '',
  password: ''
})

//收集更新数据
const updateModel = ref({
  username: '',
  password: '',
  repassword: '',
  mobile: '',
})

//收集注册数据
const registerModel = ref({
  username: '',
  password: '',
  repassword: '',
  mobile: '',
  imgUrl: '',
})

//验证确认密码,登陆注册使用
const validRePassword = (rule, value, callback) => {
  if (!isLogin.value) {
    if (value !== registerModel.value.password) {
      callback(new Error('Two inputs are different'))
    }
  }
  callback()
}

//更新使用
const validRePasswordUpdate = (rule, value, callback) => {
  if (value !== updateModel.value.password) {
    callback(new Error('Two inputs are different'))
  }
  callback()
}

//验证密码，如果是登陆状态则无需验证放行,登陆注册使用
const validPassword = (rule, value, callback) => {
  if (!isLogin.value) {
    registerForm.value.validateField('repassword', () => null)
  }
  callback()
}

//更新使用
const validPasswordUpdate = (rule, value, callback) => {
  updateForm.value.validateField('repassword', () => null)

  callback()
}

//表单验证规则,登陆注册使用
const rules = ref({
  username: [
    {required: true, message: 'Please type your nickname', trigger: 'blur'},
    {min: 5, max: 20, message: 'The length should be between 5-20', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please type your password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 6-20', trigger: 'blur'},
    {validator: validPassword, trigger: 'blur'}
  ],
  repassword: [
    {required: true, message: 'Please type your password again', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 6-20', trigger: 'blur'},
    {validator: validRePassword, trigger: "blur"}
  ],
  mobile: [
    {required: true, message: 'Please type your HongKong mobile phone', trigger: 'blur'},
    {pattern: /\d{8}/, message: 'Please enter the correct Hong Kong phone number', trigger: 'blur'}
  ]
})

//表单验证规则,更新使用
const rulesUpdate = ref({
  username: [
    {required: true, message: 'Please type your nickname', trigger: 'blur'},
    {min: 5, max: 20, message: 'The length should be between 5-20', trigger: 'blur'}
  ],
  password: [
    {required: true, message: 'Please type your password', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 6-20', trigger: 'blur'},
    {validator: validPasswordUpdate, trigger: 'blur'}
  ],
  repassword: [
    {required: true, message: 'Please type your password again', trigger: 'blur'},
    {min: 6, max: 20, message: 'The length should be between 6-20', trigger: 'blur'},
    {validator: validRePasswordUpdate, trigger: "blur"}
  ],
  mobile: [
    {required: true, message: 'Please type your HongKong mobile phone', trigger: 'blur'},
    {pattern: /\d{8}/, message: 'Please enter the correct Hong Kong phone number', trigger: 'blur'}
  ]
})

//跳转至注册
const toRegister = () => {
  isLogin.value = false
}

//跳转至登陆
const toLogin = () => {
  isLogin.value = true
}

//跳转回首页
const toBooking = () => {
  router.push('/index')
}

//出现登陆页后切换成明亮主题，
const showLogin = () => {
  allVisible.value.isVisible = true
}

//退出弹窗
const cancel = async () => {
  registerModel.value = {
    username: '',
    password: '',
    repassword: '',
    mobile: '',
    imgUrl: '',
  }
  loginModel.value = {
    username: '',
    password: ''
  }
  updateModel.value = {
    username: '',
    password: '',
    repassword: '',
    mobile: '',
    imgUrl: avatarUrl.value || '',
  }
  allVisible.value.isVisible = false
  allVisible.value.isResetVisible = false
}

//进行登陆，提交到后台
const login = async () => {
  try {
    await loginForm.value.validate()
    allVisible.value.isVisible = false
    const data = await startLogin(loginModel.value.username, loginModel.value.password)
    ElMessage({
      message: data.message,
      type: 'success',
      duration: 2000
    })
    avatarUrl.value = data.imgUrl
    user.setUserAvatar(data.imgUrl)
    localStorage.setItem('token', data.token)
    user.setUserId(data.id)
    loginForm.value.resetFields()
    isToken.value = true
    setTimeout(() => router.go(0), 2100)

  } catch (e) {
    return
  }
}

//进行注册，提交到后台
const register = async () => {
  try {
    await registerForm.value.validate()
    allVisible.value.isVisible = false
    let submitData = registerModel.value
    delete submitData.imgUrl
    submitData.filename = filename.value
    submitData.extend = extend.value
    const result = await insertOne(submitData)
    if (result.code === 200) {
      ElMessage({
        type: 'success',
        message: result.message,
        duration: 2000
      })
      setTimeout(() => router.go(0), 2100)
    }
  } catch (e) {
    return
  }


}

//更新数据，提交到后台
const update = async () => {
  await updateForm.value.validate()
  const submitData = {...updateModel.value}
  submitData.userId = user.userId
  const result = await updateInfo(submitData)
  ElMessage({
    message: result.message,
    type: 'success',
  })
  localStorage.setItem('token', result.token)
  updateForm.value.resetFields()
  allVisible.value.isResetVisible = false
  await router.go(0)
}

//重设密码
const resetPassword = () => {
  allVisible.value.isResetVisible = true
}

//退出登录，清除token
const exit = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
    user.removeId()
    user.removeAvatar()
    ElMessage({
      message: 'Exit successfully',
      type: 'success',
      duration: 1200
    })
    setTimeout(async () => {
      await router.go(0)
    }, 1300)
  } else {
    ElMessage({
      message: 'You have logged out',
      type: 'warning',
      duration: 1200
    })
  }

}

//当图片上传成功时的回调函数，update使用
const handleUploadSuccessUpdate = response => {
  avatarUrl.value = 'http://localhost:3000/images/avatar/' + response.data + `?${new Date().getTime()}`
  user.setUserAvatar(avatarUrl.value)
  ElMessage({
    type: "success",
    duration: 2000,
    message: 'Update your avatar success '
  })
}

//当图片上传成功时的回调函数，register使用
const handleUploadSuccessRegister = response => {
  registerModel.value.imgUrl = 'http://localhost:3000/temp/' + response.data.imgUrl + `?${new Date().getTime()}`
  filename.value = response.data.filename
  extend.value = response.data.extend
  ElMessage({
    type: "success",
    duration: 2000,
    message: 'Update your avatar success '
  })
}

//判断有无token
const isToken = ref(!!localStorage.getItem('token'))

</script>

<template>
  <div class="container" style="width: 70%;margin: 0 auto">
    <el-container>
      <el-header class="head">
        <el-row justify="space-between" align="middle">
          <el-col :span="2" :offset="1" style="height: 40px" @click="toBooking">
            <img class="logo" src="@/assets/logo.png" alt="..."/>
          </el-col>
          <el-col :span="1" :offset="7">
            <el-dropdown>
              <span class="el-dropdown-link">
                <el-avatar @click="showLogin"
                           :src="avatarUrl"/>
                <el-icon class="el-icon--right">
                  <arrow-down/>
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :disabled="!isToken" @click="router.push('/order')">Order</el-dropdown-item>
                  <el-dropdown-item @click="resetPassword" :disabled="!isToken">Update individual information
                  </el-dropdown-item>
                  <el-dropdown-item @click="exit">Exit Login</el-dropdown-item>
                  <el-dropdown-item @click="router.push('/admin')">Administrator Login</el-dropdown-item>
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
    <el-dialog v-model="allVisible.isVisible" :title="isLogin ? 'Login' : 'Register'" :close-on-click-modal="false"
               :show-close="false">
      <el-form ref="loginForm" v-if="isLogin" label-position="top" :model="loginModel" :rules="rules">
        <el-form-item label="Username" prop="username">
          <el-input :prefix-icon="User" placeholder="Please type your username" v-model="loginModel.username"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input :prefix-icon="Lock" type="password" placeholder="Please type your password"
                    v-model="loginModel.password"/>
        </el-form-item>
        <el-form-item>
          <el-link type="info" :underline="false" @click="toRegister">
            Register →
          </el-link>
        </el-form-item>
      </el-form>
      <el-form ref="registerForm" v-else label-position="top" :model="registerModel" :rules="rules">
        <el-form-item label="Username" prop="username">
          <el-input :prefix-icon="User" v-model="registerModel.username" placeholder="Please type your username"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input :prefix-icon="Lock" type="password" v-model="registerModel.password"
                    placeholder="Please type your password"/>
        </el-form-item>
        <el-form-item label="Confirm" prop="repassword">
          <el-input :prefix-icon="Lock" type="password" v-model="registerModel.repassword"
                    placeholder="Please type your password again"/>
        </el-form-item>
        <el-form-item label="HongKong mobile phone" prop="mobile">
          <el-input :prefix-icon="Iphone" v-model="registerModel.mobile"
                    placeholder="Please type your HongKong mobile phone"/>
        </el-form-item>
        <el-form-item label="Avatar">
          <el-upload
              v-model="registerModel.imgUrl"
              class="avatar-uploader"
              :action="registerImg"
              name="neverImg"
              method="post"
              :show-file-list="false"
              :on-success="handleUploadSuccessRegister"
          >
            <img v-if="registerModel.imgUrl" :src="registerModel.imgUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
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
          <el-button v-else type="primary" @click="register">
            Register
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="allVisible.isResetVisible" title="Update Information" width="600" :close-on-click-modal="false"
               :show-close="false"
    >
      <el-form ref="updateForm" label-position="top" :model="updateModel" :rules="rulesUpdate">
        <el-form-item label="Username" prop="username">
          <el-input v-model="updateModel.username" placeholder="Update your username"/>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="updateModel.password" type="password" placeholder="Update your password"/>
        </el-form-item>
        <el-form-item label="Check password" prop="repassword">
          <el-input v-model="updateModel.repassword" type="password" placeholder="Update your password"/>
        </el-form-item>
        <el-form-item label="Mobile" prop="mobile">
          <el-input v-model="updateModel.mobile" placeholder="Update your HongKong mobile phone"/>
        </el-form-item>
        <el-form-item label="Image">
          <el-upload
              v-model="avatarUrl"
              class="avatar-uploader"
              :action="updateImg"
              :headers="token"
              name="myImg"
              method="post"
              :data="{id:user.userId}"
              :show-file-list="false"
              :on-success="handleUploadSuccessUpdate"
          >
            <img v-if="avatarUrl" :src="avatarUrl" class="avatar"/>
            <el-icon v-else class="avatar-uploader-icon">
              <Plus/>
            </el-icon>
          </el-upload>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="cancel">Cancel</el-button>
          <el-button type="primary" @click="update">
            Update
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>


<style scoped>
.head {
  padding: 20px;
  margin-bottom: 20px;
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


:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: var(--el-color-primary);
}

:deep(.el-icon.avatar-uploader-icon) {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

:deep(.el-dialog) {
  width: 800px;
}

:deep(.searchBox .el-input) {
  --el-input-bg-color: rgb(20, 23, 37);
  --el-input-border-color: none;
  --el-input-border-radius: 8px;
  --el-input-width: 400px;
  --el-input-height: 36px;
}

:deep(.el-avatar) {
  width: 40px;
  height: 40px;
}

.logo:hover {
  cursor: pointer;
}
</style>
