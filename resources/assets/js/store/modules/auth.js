import * as types from '../types'
import settings from '../../settings'

const state = {

  user: {
    authenticated: false,
    details: false,
    name: '',
    email: ''
  },

  roles: []

}

const mutations = {
  [types.AUTH_LOGIN] (state) {
    state.user.authenticated = true
  },

  [types.AUTH_LOGOUT] (state) {
    settings.removeToken()
    state.user.authenticated = false
    state.details = false
  },

  [types.AUTH_DATA_UPD] (state, payload) {
    state.user.name = payload.name
    state.user.email = payload.email
    state.roles = []
    payload.roles.forEach((role) => state.roles.push(role.key))

    // allow listeners to watch that user has details received
    state.user.details = true
  }
}

export default {state, mutations}
