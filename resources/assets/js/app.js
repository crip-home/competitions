window.noop = () => {};
$.fn.select2.defaults.set('theme', 'bootstrap');

import Vue from 'vue'
import VueResource from 'vue-resource'
import * as Lang from './lang'

Lang.checkLocale();
Vue.use(VueResource);

import router from './router'
import store from './store'
import App from './components/App.vue'

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

let app = new Vue(Vue.util.extend({
    router,
    store
}, App));

app.$mount('#app');