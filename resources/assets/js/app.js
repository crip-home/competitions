window.noop = () => {};

import Vue from 'vue'
import App from './components/App.vue'
import VueResource from 'vue-resource'
import router from './router';
import store from './store';

Vue.use(VueResource);

Vue.http.interceptors.push((request, next) => {
    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);

    next();
});

let app = new Vue(Vue.util.extend({
    router,
    store
}, App));

app.$mount('#app');