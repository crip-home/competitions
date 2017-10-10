import {
  State,
  UpdateUserDetailsPayload,
  AuthenticatePayload,
  LogoutPayload
} from './Contracts'

export default {
  authenticate(state: State, payload: AuthenticatePayload) {
    state.user.authenticated = true
  },

  logout(state: State, payload: LogoutPayload) {
    state.user.authenticated = false
    state.user.details = false
  },

  updateAuthUserDetails(state: State, payload: UpdateUserDetailsPayload) {
    state.user.name = payload.name
    state.user.email = payload.email
    state.user.id = payload.id
    state.roles = []
    payload.roles.forEach((role) => state.roles.push(role.key))

    // allow listeners to watch that user details has received
    state.user.details = true
  },
}
