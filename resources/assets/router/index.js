import Vue from 'vue'
import Router from 'vue-router'

import auth from '../modules/auth/routes'
import teams from '../modules/teams/routes'
import user from '../modules/user/routes'
import competitions from './../modules/competitions/routes'
import messages from './../modules/messages/routes'
import { home, posts } from '../modules/posts/routes'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({y: 0}),
  routes: [
    home, posts, auth, teams, user, competitions, messages,
    {path: '/auth', redirect: '/auth/login'},
    {path: '/password/reset/:token', redirect: '/auth/password/reset/:token'},
    {path: '*', redirect: '/home'}
  ]
})
