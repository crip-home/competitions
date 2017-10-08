import store from '@/Store'
import {User} from './Store/Contracts'

class AuthService {
  logout() {
    store.commit('logout')
  }

  user(): User {
    return store.state.auth.user
  }
}

export default new AuthService()