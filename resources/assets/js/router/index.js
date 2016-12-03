import Vue from 'vue'
import Router from 'vue-router'
import auth from './modules/auth'
import * as post from './modules/posts'

Vue.use(Router);

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        post.home, post.posts, auth,
        {path: '/auth', redirect: '/auth/login'},
        {path: '/password/reset/:token', redirect: '/auth/password/reset/:token'},
        {path: '*', redirect: '/home'}
    ]
})