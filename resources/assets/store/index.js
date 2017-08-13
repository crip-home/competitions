import Vue from 'vue'
import Vuex from 'vuex'
import auth from '../modules/auth/store'
import toast from './modules/toast'
import messages from '../modules/messages/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {auth, toast, messages}
})

export default store
