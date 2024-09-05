import { createRouter, createWebHistory } from 'vue-router'
import {ElMessage} from "element-plus";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/',
      component: () => import('@/views/AllIndex.vue'),
      redirect:'index',
      children: [
        {
          path: 'index',
          component: () => import('@/views/index/introduce.vue')
        },
        {
          path:'order',
          component:() => import('@/views/order.vue')
        },
        {
          path:'detailInfo',
          component: () => import('@/views/index/detailedInfo.vue'),
          redirect:'detail/:id',
          children: [
            {
              path:'detail/:id',
              component: () => import('@/views/index/detail.vue'),
            },
            {
              path:'booking/:id',
              component: () => import('@/views/index/booking.vue')
            }
          ]
        },
      ]
    },
    {
      path:'/admin',
      component: () => import('@/views/Administrator.vue'),
    },
    {
      path:'/layout',
      component: () => import('@/views/administrator/AdminLayout.vue'),
      redirect:'/sched' +
          'ule',
      children:[
        {
          path:'/schedule',
          component: () => import('@/views/administrator/EditSchedule.vue')
        }
      ]
    }
  ]
})

router.beforeEach(to => {
  if (to.path.includes('booking') || to.path.includes('order')){
    if (!localStorage.getItem('token')){
      ElMessage.error({
        showClose: true,
        duration:2000,
        message: 'You are not logged in, please login'
      })
      return '/'
    }
  }
})

export default router
