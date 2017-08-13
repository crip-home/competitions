import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth/store'
import messages from './modules/messages/store'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {auth, messages}
})

export default store
