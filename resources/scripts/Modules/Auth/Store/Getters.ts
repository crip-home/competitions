import {State, User} from './Contracts'

export default {
  authUser(state: State): User {
    return state.user
  },

  authUserId(state: State): number {
    return state.user.id
  },

  isAuthenticated(state: State): boolean {
    return state.user.authenticated
  },
}
