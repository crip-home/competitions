import Vue from 'vue'
import Router from 'vue-router'

import auth from './modules/auth'
import teams from './modules/teams'
import user from './modules/user'
import competitions from './modules/competitions'
import { home, posts } from './modules/posts'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    home, posts, auth, teams, user, competitions,
    {path: '/auth', redirect: '/auth/login'},
    {path: '/password/reset/:token', redirect: '/auth/password/reset/:token'},
    {path: '*', redirect: '/home'}
  ]
})