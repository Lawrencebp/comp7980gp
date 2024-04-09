import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueApexCharts from "vue3-apexcharts";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/assets/base.css'
import '@/assets/icon/iconfont.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
localStorage.setItem('vitepress-theme-appearance','dark')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(VueApexCharts)

app.mount('#app')
