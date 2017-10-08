import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import { posts, home } from '@/Modules/Posts/Routes'
import auth from '@/Modules/Auth/Routes'

const router = new Router({
  mode: 'history',
  routes: [
    posts, home, auth,
    {path: '/auth', redirect: '/auth/login'},
    {path: '/password/reset/:token', redirect: '/auth/password/reset/:token'},
    {path: '*', redirect: '/home'},
  ]
})

export default router