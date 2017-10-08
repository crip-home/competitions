import {Module} from 'vuex'
import {State as RootState} from '@/Store/Contracts'
import {State} from './Contracts'

import getters from './Getters'
import mutations from './Mutations'
import state from './State'

export default {
  state,
  mutations,
  getters,
} as Module<State, RootState>