window.noop = () => {};
$.fn.select2.defaults.set('theme', 'bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import * as Lang from './lang'

Lang.checkLocale();
Vue.use(VueResource);

import router from './router'
import guard from './router/guard'
import store from './store'
import App from './components/App.vue'

guard.start();

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

import focusDirective from './directives/focus'
import loadingDirective from './directives/loading'

Vue.directive('focus', focusDirective);
Vue.directive('loading', loadingDirective);


let app = new Vue(Vue.util.extend({
    router,
    store
}, App));

app.$mount('#app');