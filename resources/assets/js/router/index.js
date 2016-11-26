import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import * as routes from './routes'
import ChildHolderView from './../components/ChildHolder.vue'
import HomeView from './../components/Home.vue'
import LoginView from './../components/auth/Login.vue'
import SignupView from './../components/auth/Signup.vue'

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/home', name: routes.home.name, component: HomeView},
        {
            path: '/auth', component: ChildHolderView, children: [
            {path: 'login', name: routes.login.name, component: LoginView},
            {path: 'signup', name: routes.signup.name, component: SignupView},
        ]
        },
        {path: '/auth', redirect: '/auth/login'},
        {path: '*', redirect: '/home'}
    ]
})