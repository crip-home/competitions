$.fn.select2.defaults.set('theme', 'bootstrap')

import Vue from 'vue'
import VueResource from 'vue-resource'
import { i18n, init } from './lang'
import { sync } from 'vuex-router-sync'
import string from './data/String'
import router from './router'
import guard from './router/guard'
import store from './store'
import App from './components/App.vue'
import globals from './globals'

Vue.use(VueResource)
sync(store, router)
guard.init()
string.init()
globals.init()

let app = new Vue(Vue.util.extend({
  router,
  store,
  i18n
}, App))

// initialize user locale after app mount is completed.
init()

app.$mount('#app')
