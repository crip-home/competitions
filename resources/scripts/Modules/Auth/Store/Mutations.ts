import {removeToken} from '@/Helpers/Settings'
import {State, UpdateUserDetails} from './Contracts'

export default {
  authenticate(state: State) {
    state.user.authenticated = true
  },

  logout(state: State) {
    removeToken()
    state.user.authenticated = false
    state.user.details = false
  },

  updateAuthUserDetails(state: State, payload: UpdateUserDetails) {
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.id = payload.id
    state.roles = []
    payload.roles.forEach((role) => state.roles.push(role.key))

    // allow listeners to watch that user details has received
    state.user.details = true
  },
}
