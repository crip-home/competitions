import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import HomeView from './../components/Home.vue'
import LoginView from './../components/auth/Login.vue'
import SignupView from './../components/auth/Signup.vue'

export default new Router({
    mode: 'history',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {path: '/home', name: 'home', component: HomeView},
        {path: '/auth', children:[
            {path:'/login', name: 'login', component: LoginView},
            {path:'/signup', name: 'signup', component: SignupView},
        ]},
        {path: '/auth', redirect: '/auth/login'},
        {path: '*', redirect: '/home'}
    ]
})