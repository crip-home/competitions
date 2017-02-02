$.fn.select2.defaults.set('theme', 'bootstrap')

import Vue from 'vue'
import VueResource from 'vue-resource'
import * as Lang from './lang'
import { sync } from 'vuex-router-sync'
import string from './ext/String'
import router from './router'
import guard from './router/guard'
import store from './store'
import App from './components/App.vue'
import globals from './globals'

Vue.use(VueResource)
sync(store, router)
Lang.init()
guard.init()
string.init()
globals.init()

let app = new Vue(Vue.util.extend({
  router,
  store
}, App))

app.$mount('#app')
