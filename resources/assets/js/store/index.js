import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import auth from './modules/auth'
import toast from './modules/toast'
import messages from './modules/messages'
import modal from './modules/modal'

const store = new Vuex.Store({
  modules: {auth, toast, messages, modal}
})

export default store
