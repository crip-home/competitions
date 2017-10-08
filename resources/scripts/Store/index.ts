import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from '@/Modules/Auth/Store'

export default new Vuex.Store({
  modules: {auth}
})
