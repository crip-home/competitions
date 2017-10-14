import Vue from 'vue'
import http from 'axios'
import store from '@/Store'
import {i18n} from '@/Lang'
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

export interface SignUpDetails {
  name: string
  email: string
  password: string
  password_confirmation: string
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
      Vue.logger.log({err})

      throw i18n.t('auth.login.error')
    }
  }

  public static async signUp(details: SignUpDetails) {
    const url = Api.url({path: 'register'})
    try {
      const response = await http.post(url, details)
      console.log('AuthService.signUp', {response})
    } catch (error) {
      Api.handle(error)
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