$.fn.select2.defaults.set('theme', 'bootstrap')

import Vue from 'vue'

// https://github.com/pagekit/vue-resource
import VueResource from 'vue-resource'

// https://github.com/shakee93/vue-toasted
import Toasted from 'vue-toasted'

// https://github.com/tahq69/vue-bootstrap-modal
import CripModal from 'crip-vue-bootstrap-modal'
import Log from './extensions/Log'
import settings from './settings'

Vue.use(VueResource)
Vue.use(Toasted, {duration: 3700})
Vue.use(CripModal)
Vue.use(Log, settings)

import { i18n, init } from './lang'
import { sync } from 'vuex-router-sync'
import string from './extensions/String'
import router from './router'
import guard from './router/guard'
import store from './store'
import App from './App.vue'
import globals from './globals'

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
