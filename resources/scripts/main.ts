import Vue from 'vue'
// https://github.com/shakee93/vue-toasted
import Toasted from 'vue-toasted'
// https://www.npmjs.com/package/crip-vue-bootstrap-modal
import CripModal from 'crip-vue-bootstrap-modal'
// https://www.npmjs.com/package/crip-vue-loading
import CripLoading from 'crip-vue-loading'
import axios from 'axios'
import {installer as Logger} from './Helpers/Logger'
import settings from './Settings'

Vue.use(CripLoading, {axios})
Vue.use(Toasted, {duration: 3700})
Vue.use(CripModal)
Vue.use(Logger, settings.logger)

import {i18n, init as initLocale} from './Lang'
import {sync} from 'vuex-router-sync'
import Router from './Router'
import Guard from './Router/Guard'
import Store from './Store'
import App from './Components/App.vue'

sync(Store, Router)
Guard(Router)

let app = new Vue({
  render: (h) => h(App),
  router: Router,
  store: Store,
  i18n,
})

// initialize user locale after app mount is completed.
initLocale()

app.$mount(document.getElementById('app'))
