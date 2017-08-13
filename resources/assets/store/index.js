import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import toast from './modules/toast'
import modal from './modules/modal'
import messages from '../modules/messages/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {auth, toast, messages, modal}
})

export default store
