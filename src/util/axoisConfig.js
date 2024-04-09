import axios from "axios";
import {ElLoading} from 'element-plus'
import {ElMessageBox} from "element-plus";
import router from "@/router/index.js";

const request = axios.create({
    baseURL: '/api',
    timeout: 20000,
});

const options = {
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 1)',
}

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    //请求发出的同时出现加载提示
    config.headers.Authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token').replace(/"/g,'') : ''
    ElLoading.service(options)
    return config;
}, function (error) {
    ElLoading.service(options).close()
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    //收到响应后关闭加载提示
    ElLoading.service(options).close()
    //预处理响应
    return response.data;
}, async function (error) {
    //关闭加载提示
    ElLoading.service(options).close()
    if (error.response.data.message) {
        await ElMessageBox.alert(error.response.data.message, 'Error', {
            confirmButtonText: 'EXIT',
            type: 'error'
        })
        await router.go(-1)
    } else {
        await ElMessageBox.alert('No token,please check your token or login', 'Error', {
            confirmButtonText: 'EXIT',
            type: 'error'
        })
        await router.push('/index')
    }

    return Promise.reject(error);
});

export default request
