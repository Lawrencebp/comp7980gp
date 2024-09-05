import axios from "axios";
import {ElLoading} from 'element-plus'
import {ElMessageBox} from "element-plus";
import router from "@/router/index.js";

const request = axios.create({
    baseURL: '/api',
    timeout: 20000,
});

let isErrorMessageShown = false;

const options = {
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 1)',
}

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    config.headers.Authorization = localStorage.getItem('token') ? "Bearer " + localStorage.getItem('token').replace(/"/g,'') : ''
    ElLoading.service(options)
    return config;
}, function (error) {
    ElLoading.service(options).close()
    return Promise.reject(error);
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 收到响应后关闭加载提示
    ElLoading.service(options).close();
    // 重置错误消息显示标志
    isErrorMessageShown = false;
    // 预处理响应
    return response.data;
}, async function (error) {
    // 关闭加载提示
    ElLoading.service(options).close();

    // 只有当错误消息未被显示时才执行
    if (!isErrorMessageShown) {
        if (error.response.data.message) {
            isErrorMessageShown = true;
            await ElMessageBox.alert(error.response.data.message, 'Error', {
                confirmButtonText: 'EXIT',
                type: 'error'
            })
        } else {
            isErrorMessageShown = true;
            await ElMessageBox.alert('No token, please check your token or login', 'Error', {
                confirmButtonText: 'EXIT',
                type: 'error',
            })
        }
        // 导航到首页
        await router.push('/index');
    }

    return Promise.reject(error);
});


const adminRequest = axios.create({
    baseURL: '/api',
    timeout: 20000,
});

// 添加请求拦截器
adminRequest.interceptors.request.use(function (config) {
    config.headers.Authorization = sessionStorage.getItem('token') ? sessionStorage.getItem('token').replace(/"/g,'') : ''
    ElLoading.service(options)
    return config;
}, function (error) {
    ElLoading.service(options).close()
    return Promise.reject(error);
});

// 添加响应拦截器
adminRequest.interceptors.response.use(function (response) {
    // 收到响应后关闭加载提示
    ElLoading.service(options).close();
    // 重置错误消息显示标志
    isErrorMessageShown = false;
    // 预处理响应
    return response.data;
}, async function (error) {
    // 关闭加载提示
    ElLoading.service(options).close();

    // 只有当错误消息未被显示时才执行
    if (!isErrorMessageShown) {
        if (error.response.data.message) {
            isErrorMessageShown = true;
            await ElMessageBox.alert(error.response.data.message, 'Error', {
                confirmButtonText: 'EXIT',
                type: 'error'
            })
        } else {
            isErrorMessageShown = true;
            await ElMessageBox.alert('No token, please check your token or login', 'Error', {
                confirmButtonText: 'EXIT',
                type: 'error',
            })
        }
        // 导航到首页
        await router.push('/index');
    }
    return Promise.reject(error);
});

export {
    request,
    adminRequest
}
