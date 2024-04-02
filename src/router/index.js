import { createRouter, createWebHistory } from 'vue-router'

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
          path:'detailInfo',
          component: () => import('@/views/index/detailedInfo.vue'),
          redirect:'/detailInfo/detail',
          children: [
            {
              path:'detail',
              component: () => import('@/views/index/detail.vue'),
            },
            {
              path:'booking',
              component: () => import('@/views/index/booking.vue')
            }
          ]
        },

      ]
    }
  ]
})

export default router
