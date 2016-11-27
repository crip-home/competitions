import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

import auth from './modules/auth'
import toast from './modules/toast'

const store = new Vuex.Store({
    modules: {auth, toast}
});

export default store;