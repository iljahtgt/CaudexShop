import Vue from 'vue'
import Router from 'vue-router'
import ShopPage from '@/components/views/ShopPage'
import Login from '@/components/views/Login'
import MainPage from '@/components/views/MainPage'
import Notes from '@/components/views/Notes'
import Shopex from '@/components/views/Shopex'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      name: 'Home',
      component: Login
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/main',
      name: 'main',
      component: MainPage,
      children: [
        {
          path: 'notes',
          name: 'notes',
          components: {
            default: Notes,
            meta: { requiresAuth: true },
          },
        },
        {
          path: 'coupon',
          name: 'coupon',
          component:() => import('@/components/views/Coupon.vue')
        },
        
      ],
    },
    {
      path: '/index',
      name: 'index',
      component: () => import('@/components/views/ShopIndex.vue'),
    },
    {
      path: '/customer',
      name: 'customer',
      component: ShopPage,
      children:[
        {
          path: 'shop',
          name: 'shop',
          component: () => import('@/components/views/CustomerPage.vue'),
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('@/components/views/CustomerOrder.vue'),
        },
        {
          path: 'checkout/:orderId',
          name: 'checkout',
          component: () => import('@/components/views/CustomerCheckout.vue'),
        }
      ]
    },
  ]
})
