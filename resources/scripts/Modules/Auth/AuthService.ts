import Vue from 'vue'
import http from 'axios'
import store from '@/Store'
import {i18n} from '@/Lang'
import router from '@/Router'
import {home} from '@/Router/Routes'
import {Api} from '@/Helpers/Api'
import {setToken, hasToken, removeToken} from '@/Helpers/Settings'
import Middleware from './MiddlewareService'
import {User, UpdateUserDetailsPayload, LogoutPayload} from './Store/Contracts'

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
  public static isAuthenticated() {
    return Middleware.isAuthenticated()
  }

  /**
   * Authorize user in system.
   * @param   {Credentials}   credentials
   * @returns {Promise<void>}
   */
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

  /**
   * Sign up user in to system.
   * @param   {SignUpDetails} details
   * @returns {Promise<void>}
   */
  public static async signUp(details: SignUpDetails) {
    const url = Api.url({path: 'register'})
    try {
      const {data} = await http.post(url, details)
      setToken(data.token)
      await AuthService.getAuthUserDetails()
    } catch (error) {
      Api.handle(error)
    }
  }

  /**
   * Check user auth state in system. If token exists, request server for user
   * details.
   */
  public static async checkAuth() {
    if (hasToken()) {
      await AuthService.getAuthUserDetails()
    }
  }

  /**
   * Request server for user details and set up them in store instance.
   * @returns {Promise<void>}
   */
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
    } catch (error) {
      Api.handle(error)
    }
  }

  /**
   * Logout user from system.
   */
  public static logout() {
    removeToken()
    store.commit<LogoutPayload>({type: 'logout'})
    router.push({...home, params: {message: 'logout'}})
  }

  /**
   * Gets authenticated user details.
   * @returns {User}
   */
  public static user(): User {
    return store.state.auth.user
  }
}
