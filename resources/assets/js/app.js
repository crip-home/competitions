window.noop = () => {};

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource);

import App from './components/App.vue'
import router from './router';
import store from './store';


Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

let app = new Vue(Vue.util.extend({
    router,
    store
}, App));

app.$mount('#app');