<script setup>
import {useToggle} from '@vueuse/core'
import {isDark} from "@/util/darkmode.js";
import {onUnmounted} from "vue";
import {
  Menu as IconMenu,
} from '@element-plus/icons-vue'

const toggleDark = useToggle(isDark)
toggleDark()

onUnmounted(() => {
  toggleDark()
})
</script>

<template>
  <div class="container" style="background-color: rgb(104,103,121);margin: 20px auto;">
    <el-container>
      <el-aside style="background-color: #545c64">
        <el-menu
            active-text-color="#ffd04b"
            background-color="#545c64"
            class="el-menu-vertical-demo"
            :default-active="$route.path"
            text-color="#fff"
            router
            style="border: none;"
        >
          <el-menu-item index="/schedule">
            <el-icon><icon-menu /></el-icon>
            <span>Scheduling</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>
:deep(.el-aside){
  height: 1030px;
}
:deep(.el-menu-item){
  font-size: 20px;
  margin: 20px 0;
}
:deep(.el-sub-menu__title) *{
  font-size: 20px;
}
</style>
