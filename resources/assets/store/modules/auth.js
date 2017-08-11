import * as types from '../types'
import { authUserId, isAuth, authUser } from '../getters'
import settings from '../../settings'

const state = {

  user: {
    authenticated: false,
    details: false,
    name: '',
    email: '',
    id: 0
  },

  roles: []

}

const mutations = {
  [types.authenticate] (state) {
    state.user.authenticated = true
  },

  [types.logout] (state) {
    settings.removeToken()
    state.user.authenticated = false
    state.details = false
  },

  [types.authDetailsUpdate] (state, payload) {
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.id = payload.id
    state.roles = []
    payload.roles.forEach((role) => state.roles.push(role.key))

    // allow listeners to watch that user has details received
    state.user.details = true
  }
}

const getters = {
  [authUserId]: (store, getters) => getters[authUser].id,
  [isAuth]: (store, getters) => getters[authUser].authenticated,
  [authUser]: store => store.user
}

export default {state, mutations, getters}
