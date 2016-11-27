import Vue from 'vue'
import Router from 'vue-router'
import auth from './modules/auth'

Vue.use(Router);

import * as routes from './routes'
import HomeView from './../components/Home.vue'

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/home', name: routes.home.name, component: HomeView},
        auth,
        {path: '/auth', redirect: '/auth/login'},
        {path: '/password/reset/:token', redirect: '/auth/password/reset/:token'},
        {path: '*', redirect: '/home'}
    ]
})