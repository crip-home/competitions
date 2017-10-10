import http from 'axios'
import store from '@/Store'
import router from '@/Router'
import {login, home} from '@/Router/Routes'
import {Api} from '@/Helpers/Api'
import {setToken, hasToken, removeToken} from '@/Helpers/Settings'
import Middleware from './MiddlewareService'
import {
  User,
  UpdateUserDetailsPayload,
  AuthenticatePayload,
  LogoutPayload
} from './Store/Contracts'

export interface Credentials {
  email: string
  password: string
}

export class AuthService {
  /**
   * Determines user authenticated sate.
   * @returns {boolean}
   */
  public static isAuthenticated(): boolean {
    return Middleware.isAuthenticated()
  }

  public static async authorize(credentials: Credentials) {
    const url = Api.url({path: 'authenticate'})
    try {
      const {data} = await http.post(url, credentials)
      setToken(data.token)
      await AuthService.getAuthUserDetails()
    } catch (err) {
      Api.handle(err)
      // TODO: add translated error message
      throw 'Auth failed'
    }
  }

  public static checkAuth() {
    if (hasToken()) {
      AuthService.getAuthUserDetails()
    }
  }

  public static async getAuthUserDetails() {
    const url = Api.url({path: 'authenticate'})
    try {
      const {data} = await http.get(url)
      const payload: UpdateUserDetailsPayload = {
        type: 'updateAuthUserDetails',
        name: data.name,
        email: data.email,
        id: data.id,
        roles: data.roles,
      }

      // Update user data before authenticate state to make sure guard does
      // not redirect us as unauthorized users.
      store.commit<UpdateUserDetailsPayload>(payload)
      store.commit<AuthenticatePayload>({type: 'authenticate'})
    } catch (error) {
      if (error.status === 401) {
        removeToken()
        store.commit<LogoutPayload>({type: 'logout'})
        router.push({...login, params: {message: 'unauthorized'}})
        return
      }

      throw error
    }
  }

  public static logout() {
    removeToken()
    store.commit<LogoutPayload>({type: 'logout'})
    router.push({...home, params: {message: 'logout'}})
  }

  public static user(): User {
    return store.state.auth.user
  }
}