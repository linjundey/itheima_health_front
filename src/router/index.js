import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    redirect: '/checkitem',
    component: () => import('../views/index.vue'),
    children: [
      {
        path: '/checkitem',
        name: 'checkitem',
        component: () => import('../views/appoment/checkitem.vue')
      },
      {
        path: '/checkgroup',
        name: 'checkgroup',
        component: () => import('../views/appoment/checkgroup.vue')
      },
      {
        path: '/ordersettinglist',
        name: 'ordersettinglist',
        component: () => import('../views/appoment/ordersettinglist.vue')
      },
      {
        path: '/ordersetting',
        name: 'ordersetting',
        component: () => import('../views/appoment/ordersetting.vue')
      },
      {
        path: '/setmeal',
        name: 'setmeal',
        component: () => import('../views/appoment/setmeal.vue')
      },
      {
        path: '/report_setmeal',
        name: 'report_setmeal',
        component: () => import('../views/report/report_setmeal.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
